<?php
/**
 * THERMO Co., Ltd. - PHP Mail Handler
 * Connects the website contact and quote forms to email.
 */

// Set response headers
header('Content-Type: application/json; charset=utf-8');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'ok' => false,
        'error' => 'Method not allowed'
    ]);
    exit;
}

// Read and decode JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
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

// Recipient email
$to = 'info@thermothailand.com';

// Subject encoding for Thai language support (base64 UTF-8)
$subjectText = 'ติดต่อจากเว็บไซต์ THERMO - คุณ ' . $name;
if (!empty($serviceType)) {
    $subjectText = 'ขอใบเสนอราคา (' . $serviceType . ') - คุณ ' . $name;
}
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

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

// Set email headers to ensure high deliverability and UTF-8 compliance
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/plain; charset=utf-8';
$headers[] = 'From: no-reply@thermothailand.com';
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $email;
}

// Attempt to send email
$success = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($success) {
    echo json_encode([
        'ok' => true
    ]);
} else {
    // Return a descriptive error if the PHP mail function fails
    echo json_encode([
        'ok' => false,
        'error' => 'ไม่สามารถส่งข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง หรือติดต่อเราโดยตรงผ่านเบอร์โทรศัพท์'
    ]);
}
?>
