<?php
/**
 * NexaCore - Contact Form Mailer
 * Uses PHPMailer for SMTP email delivery
 */

// Allow CORS for same-origin AJAX
header('Content-Type: application/json');

// === CONFIGURATION ===
define('SMTP_HOST',     'smtp.gmail.com');
define('SMTP_PORT',     587);
define('SMTP_USERNAME', 'your-email@gmail.com');     // Change to your SMTP email
define('SMTP_PASSWORD', 'your-app-password');         // Use an App Password (Gmail)
define('MAIL_FROM',     'noreply@nexacore.com');
define('MAIL_FROM_NAME','NexaCore Contact Form');
define('MAIL_TO',       'admin@nexacore.com');        // Where to receive emails
define('MAIL_SUBJECT',  'New Contact Form Submission - NexaCore');

// === INPUT VALIDATION ===
$name    = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(strip_tags($_POST['email']   ?? ''));
$phone   = trim(strip_tags($_POST['phone']   ?? ''));
$service = trim(strip_tags($_POST['service'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Name, email and message are required.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
    exit;
}

// === LOAD PHPMAILER ===
// Require PHPMailer via Composer autoload OR manual includes
$phpmailerPath = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($phpmailerPath)) {
    // Fallback: use PHP mail() function
    $subject = MAIL_SUBJECT;
    $body    = "Name: $name\nEmail: $email\nPhone: $phone\nService: $service\n\nMessage:\n$message";
    $headers = "From: $name <$email>\r\nReply-To: $email\r\n";
    $sent = mail(MAIL_TO, $subject, $body, $headers);
    echo json_encode(['success' => $sent]);
    exit;
}

require $phpmailerPath;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// === SEND MAIL ===
$mail = new PHPMailer(true);
try {
    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;

    // From / To
    $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_TO);
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = MAIL_SUBJECT;
    $mail->Body    = "
    <html><body style='font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;'>
      <div style='max-width:600px;margin:0 auto;background:#fff;border-radius:10px;padding:30px;'>
        <h2 style='color:#0077ff;'>New Contact Form Submission</h2>
        <hr>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Service Interest:</strong> {$service}</p>
        <p><strong>Message:</strong><br>{$message}</p>
        <hr>
        <small style='color:#999;'>Sent from NexaCore Contact Form</small>
      </div>
    </body></html>";
    $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\nService: $service\n\nMessage:\n$message";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}
