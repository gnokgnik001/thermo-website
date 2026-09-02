<?php
/**
 * THERMO Co., Ltd. - PHP Resume/Job Application Handler
 * รับฟอร์มสมัครงาน (multipart/form-data) พร้อมไฟล์ resume (PDF)
 * แล้วส่งเป็นอีเมลพร้อมไฟล์แนบ ไปที่ info@thermothailand.com
 *
 * ส่งผ่าน Google Workspace SMTP (PHPMailer) แทน mail() ของ server เดิม
 * เหตุผล: mail() ของ shared hosting ไม่มี SPF/DKIM รับรองว่าส่งแทนโดเมนนี้ได้
 * → Google Workspace มองเป็น spoofing แล้วทิ้งเงียบ (ไม่เข้า inbox ไม่เข้า spam)
 *
 * ความปลอดภัย:
 *  - รับเฉพาะไฟล์ PDF (เช็คนามสกุล + magic bytes "%PDF")
 *  - จำกัดขนาดไม่เกิน 5MB
 *  - ไม่บันทึกไฟล์ลงเซิร์ฟเวอร์ อ่านจาก tmp แล้วแนบเมลตรงๆ (ไฟล์ไม่ค้างบนเว็บ)
 */

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

header('Content-Type: application/json; charset=utf-8');

function fail($msg) {
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

// โหลด credentials — ถ้ายังไม่ได้สร้างไฟล์จริงบน server ให้แจ้ง error ชัดเจน
$configPath = __DIR__ . '/mail-config.php';
if (!file_exists($configPath)) {
    fail('Mail not configured on server (missing mail-config.php)');
}
require $configPath;

// อนุญาตเฉพาะ POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail('Method not allowed');
}

// กรณีไฟล์ใหญ่เกิน post_max_size ของเซิร์ฟเวอร์ → $_POST จะว่างทั้งที่มีการส่งข้อมูลมา
if (empty($_POST) && isset($_SERVER['CONTENT_LENGTH']) && (int)$_SERVER['CONTENT_LENGTH'] > 0) {
    fail('ไฟล์มีขนาดใหญ่เกินไป กรุณาแนบไฟล์ PDF ที่มีขนาดไม่เกิน 5MB');
}

// ===== ดึงและทำความสะอาดข้อมูล =====
$name     = isset($_POST['name'])     ? strip_tags(trim($_POST['name']))     : '';
$phone    = isset($_POST['phone'])    ? strip_tags(trim($_POST['phone']))    : '';
$email    = isset($_POST['email'])    ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$line     = isset($_POST['line'])     ? strip_tags(trim($_POST['line']))     : '';
$position = isset($_POST['position']) ? strip_tags(trim($_POST['position'])) : '';

// ===== ตรวจสอบข้อมูล =====
if (empty($name) || empty($phone) || empty($email)) {
    fail('กรุณากรอกชื่อ-นามสกุล เบอร์โทรศัพท์ และอีเมลให้ครบ');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('รูปแบบอีเมลไม่ถูกต้อง');
}

// ===== ตรวจสอบไฟล์ resume =====
if (!isset($_FILES['resume']) || $_FILES['resume']['error'] === UPLOAD_ERR_NO_FILE) {
    fail('กรุณาแนบไฟล์ Resume (PDF)');
}

$file = $_FILES['resume'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE) {
        fail('ไฟล์มีขนาดใหญ่เกินไป กรุณาแนบไฟล์ที่ไม่เกิน 5MB');
    }
    fail('อัปโหลดไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
}

// ขนาดไม่เกิน 5MB และต้องมากกว่า 0
$maxBytes = 5 * 1024 * 1024;
if ($file['size'] <= 0 || $file['size'] > $maxBytes) {
    fail('ไฟล์ต้องมีขนาดไม่เกิน 5MB');
}

// ต้องเป็นไฟล์ที่อัปโหลดมาจริง (กัน path injection)
if (!is_uploaded_file($file['tmp_name'])) {
    fail('ไฟล์ไม่ถูกต้อง');
}

// เช็คนามสกุลต้องเป็น .pdf
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if ($ext !== 'pdf') {
    fail('กรุณาแนบไฟล์นามสกุล .pdf เท่านั้น');
}

// อ่านเนื้อไฟล์ แล้วเช็ค magic bytes ว่าเป็น PDF จริง (กันเปลี่ยนนามสกุลหลอก)
$fileContent = file_get_contents($file['tmp_name']);
if ($fileContent === false || substr($fileContent, 0, 5) !== '%PDF-') {
    fail('ไฟล์ที่แนบไม่ใช่ไฟล์ PDF ที่ถูกต้อง');
}

// เช็ค MIME ด้วย finfo เพิ่มอีกชั้น (ถ้ามี)
if (function_exists('finfo_open')) {
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    if ($mime !== 'application/pdf') {
        fail('ไฟล์ที่แนบไม่ใช่ไฟล์ PDF ที่ถูกต้อง');
    }
}

// ===== ตั้งชื่อไฟล์แนบให้ปลอดภัยและอ่านง่าย =====
// เช่น "Resume-สมชาย-ช่างเทคนิค.pdf" แต่กรองอักขระอันตรายออก
$safeName = preg_replace('/[^\p{L}\p{N}\-_ ]/u', '', $name);
$safeName = trim(preg_replace('/\s+/u', '-', $safeName));
if ($safeName === '') { $safeName = 'applicant'; }
$attachmentName = 'Resume-' . $safeName . '.pdf';

// ===== สร้างอีเมล =====
$to = MAIL_TO;

$subjectText = 'สมัครงาน';
if (!empty($position)) {
    $subjectText .= ' ตำแหน่ง ' . $position;
}
$subjectText .= ' - ' . $name;

// เนื้อหาอีเมล (ข้อความ)
$textBody  = "==================================================\n";
$textBody .= " ใบสมัครงานจากหน้าเว็บไซต์ THERMO\n";
$textBody .= "==================================================\n\n";
$textBody .= "ตำแหน่งที่สมัคร: " . ($position ? $position : "-") . "\n";
$textBody .= "ชื่อ-นามสกุล: " . $name . "\n";
$textBody .= "เบอร์โทรศัพท์: " . $phone . "\n";
$textBody .= "อีเมล: " . $email . "\n";
$textBody .= "LINE ID: " . ($line ? $line : "-") . "\n\n";
$textBody .= "ไฟล์ Resume แนบมาพร้อมอีเมลนี้ (" . $attachmentName . ")\n\n";
$textBody .= "วันที่ส่ง: " . date('Y-m-d H:i:s') . "\n";
$textBody .= "ส่งจากระบบสมัครงานอัตโนมัติ www.thermothailand.com\n";

// ===== ส่งอีเมลผ่าน Google Workspace SMTP (SPF/DKIM/DMARC ผ่านอัตโนมัติ) =====
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom(SMTP_USERNAME, 'THERMO Website');
    $mail->addAddress($to);
    $mail->addReplyTo($email, $name);

    // แนบไฟล์ PDF ตรงจาก memory ($fileContent ที่อ่านและตรวจสอบแล้วด้านบน)
    // ไม่เขียนไฟล์ลงดิสก์ก่อน — ตรงตามหลักการเดิมของไฟล์นี้ (ไฟล์ไม่ค้างบนเว็บ)
    $mail->addStringAttachment($fileContent, $attachmentName, 'base64', 'application/pdf');

    $mail->isHTML(false);
    $mail->Subject = $subjectText;
    $mail->Body    = $textBody;

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (PHPMailerException $e) {
    error_log('sendresume.php mail error: ' . $mail->ErrorInfo);
    fail('ไม่สามารถส่งใบสมัครได้ในขณะนี้ กรุณาลองใหม่ หรือส่งอีเมลมาที่ info@thermothailand.com');
}
?>
