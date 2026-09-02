<?php
/**
 * THERMO Co., Ltd. - PHP Mail Handler
 * Connects the website contact and quote forms to email.
 *
 * ส่งผ่าน Google Workspace SMTP (PHPMailer) แทน mail() ของ server เดิม
 * เหตุผล: mail() ของ shared hosting ไม่มี SPF/DKIM รับรองว่าส่งแทนโดเมนนี้ได้
 * → Google Workspace มองเป็น spoofing แล้วทิ้งเงียบ (ไม่เข้า inbox ไม่เข้า spam)
 * การส่งผ่าน SMTP ของ Google ตรง ๆ ทำให้ SPF/DKIM/DMARC ผ่านอัตโนมัติ
 * และย้าย hosting ในอนาคตได้โดยไม่ต้องแก้ DNS ซ้ำ
 */

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

// Set response headers
header('Content-Type: application/json; charset=utf-8');

// โหลด credentials — ถ้ายังไม่ได้สร้างไฟล์จริงบน server ให้แจ้ง error ชัดเจน
// (กันเคสลืมสร้าง mail-config.php แล้วเข้าใจผิดว่าโค้ดพัง)
$configPath = __DIR__ . '/mail-config.php';
if (!file_exists($configPath)) {
    echo json_encode([
        'ok' => false,
        'error' => 'Mail not configured on server (missing mail-config.php)'
    ]);
    exit;
}
require $configPath;

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'ok' => false,
        'error' => 'Method not allowed'
    ]);
    exit;
}

// Read input: prefer standard form POST (x-www-form-urlencoded), fall back to JSON
$data = $_POST;
if (empty($data)) {
    $input = file_get_contents('php://input');
    $decoded = json_decode($input, true);
    if (is_array($decoded)) { $data = $decoded; }
}

if (empty($data)) {
    echo json_encode([
        'ok' => false,
        'error' => 'Invalid request data'
    ]);
    exit;
}

// Extract and sanitize fields
$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$company = isset($data['company']) ? strip_tags(trim($data['company'])) : '';
$phone = isset($data['phone']) ? strip_tags(trim($data['phone'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$serviceType = isset($data['serviceType']) ? strip_tags(trim($data['serviceType'])) : '';
$message = isset($data['message']) ? strip_tags(trim($data['message'])) : '';

// Validation
if (empty($name) || empty($phone)) {
    echo json_encode([
        'ok' => false,
        'error' => 'กรุณากรอกชื่อและเบอร์โทรศัพท์ (Name and Phone number are required)'
    ]);
    exit;
}

// Recipient email (จาก mail-config.php)
$to = MAIL_TO;

// Subject (เก็บเป็น plain text ธรรมดา — PHPMailer จัดการ UTF-8 encoding ให้เอง)
$subjectText = 'ติดต่อจากเว็บไซต์ THERMO - คุณ ' . $name;
if (!empty($serviceType)) {
    $subjectText = 'ขอใบเสนอราคา (' . $serviceType . ') - คุณ ' . $name;
}

// Build plain-text message body
$body = "==================================================\n";
$body .= " ข้อมูลการติดต่อ/ขอใบเสนอราคาจากหน้าเว็บไซต์ THERMO\n";
$body .= "==================================================\n\n";
$body .= "ชื่อผู้ติดต่อ: " . $name . "\n";
$body .= "บริษัท/หน่วยงาน: " . ($company ? $company : "-") . "\n";
$body .= "เบอร์โทรศัพท์: " . $phone . "\n";
$body .= "อีเมล: " . ($email ? $email : "-") . "\n";
$body .= "ประเภทงานที่สนใจ: " . ($serviceType ? $serviceType : "-") . "\n\n";
$body .= "รายละเอียดโครงการ / ข้อความเพิ่มเติม:\n";
$body .= "--------------------------------------------------\n";
$body .= ($message ? $message : "-") . "\n";
$body .= "--------------------------------------------------\n\n";
$body .= "วันที่ส่ง: " . date('Y-m-d H:i:s') . "\n";
$body .= "ส่งจากระบบอัตโนมัติของเว็บไซต์ www.thermothailand.com\n";

// ส่งอีเมลผ่าน Google Workspace SMTP (SPF/DKIM/DMARC ผ่านอัตโนมัติเพราะส่งจริงจาก Google)
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
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($email, $name);
    }

    $mail->isHTML(false);
    $mail->Subject = $subjectText;
    $mail->Body    = $body;

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (PHPMailerException $e) {
    // log error ไว้ฝั่ง server เพื่อ debug ภายหลัง (ไม่โชว์รายละเอียดให้ผู้ใช้เห็น)
    error_log('quote-submit.php mail error: ' . $mail->ErrorInfo);
    echo json_encode([
        'ok' => false,
        'error' => 'ไม่สามารถส่งข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง หรือติดต่อเราโดยตรงผ่านเบอร์โทรศัพท์'
    ]);
}
?>
