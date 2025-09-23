<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

// Nur POST akzeptieren
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "msg" => "Nur POST erlaubt"]);
    exit;
}

// JSON Payload aus Angular
$json = file_get_contents('php://input');
$params = json_decode($json, true); // true = Array

$name = htmlspecialchars($params['name']);
$email = filter_var($params['email'], FILTER_VALIDATE_EMAIL);
$messageContent = htmlspecialchars($params['message']);

if (!$email) {
    echo json_encode(["status" => "error", "msg" => "Ungültige Email"]);
    exit;
}

$to = "oliverplit2005@gmail.com";
$subject = "Kontaktformular Nachricht von $name";
$message = "Name: $name<br>Email: $email<br>Nachricht: $messageContent";

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=utf-8";
$headers[] = "From: kontakt@oliver-plit.com";
$headers[] = "Reply-To: $email";

$sent = mail($to, $subject, $message, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(["status" => "ok", "msg" => "Mail erfolgreich gesendet!"]);
} else {
    echo json_encode(["status" => "error", "msg" => "Mail konnte nicht gesendet werden."]);
}
?>
