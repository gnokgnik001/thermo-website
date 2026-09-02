<?php
/**
 * THERMO Co., Ltd. — ค่าตั้งต้นสำหรับส่งอีเมลผ่าน Google Workspace SMTP
 *
 * ⚠️ ไฟล์นี้เป็นแค่ "ตัวอย่าง" (.example.php) — ห้ามใส่รหัสผ่านจริงในไฟล์นี้
 *    และห้ามอัปโหลดไฟล์นี้ทับไฟล์ mail-config.php ตัวจริงบน server เด็ดขาด
 *
 * วิธีใช้ (ทำครั้งเดียวบน server ผ่าน cPanel File Manager):
 *   1. คัดลอกไฟล์นี้ แล้วเปลี่ยนชื่อเป็น "mail-config.php" (ตัดคำว่า .example ออก)
 *   2. แก้ค่า SMTP_PASSWORD ด้านล่างเป็น "App Password" 16 หลักที่ได้จาก
 *      Google Account ของ info@thermothailand.com (ดูขั้นตอนการสร้างแยกต่างหาก)
 *   3. เก็บไฟล์ mail-config.php ไว้ที่ /public_html/ (ระดับเดียวกับ quote-submit.php)
 *      *** ไฟล์นี้จะไม่ถูกทับทุกครั้งที่อัปโหลด dist.zip ใหม่ในอนาคต
 *          เพราะ dist.zip จะไม่มีไฟล์ชื่อ mail-config.php อยู่ในนั้นเลย
 *          (มีแต่ mail-config.example.php ซึ่งเป็นคนละไฟล์กัน) ***
 */

// อีเมล Google Workspace ที่จะใช้เป็นผู้ส่ง (ต้องเปิด 2-Step Verification ไว้แล้ว)
define('SMTP_USERNAME', 'info@thermothailand.com');

// App Password 16 หลักจาก Google (ไม่ใช่รหัสผ่าน login ปกติ) — ใส่แบบไม่มีเว้นวรรค
define('SMTP_PASSWORD', 'PASTE_16_DIGIT_APP_PASSWORD_HERE');

// อีเมลปลายทางที่จะรับฟอร์มติดต่อ/ใบสมัครงาน (ปกติเป็นอันเดียวกับ SMTP_USERNAME)
define('MAIL_TO', 'info@thermothailand.com');
