<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS":
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case "POST":
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: text/plain");

        $json = file_get_contents('php://input');
        $params = json_decode($json);

        if (!$params) {
            http_response_code(400);
            echo "Invalid JSON";
            exit;
        }

        $email = $params->email;
        $name = $params->name;
        $messageText = $params->message;

        $recipient = 'oliverplit2005@gmail.com';
        $subject = "Contact From <$email>";
        $message = "From: " . htmlspecialchars($name) . "<br>" . nl2br(htmlspecialchars($messageText));

        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=utf-8',
            'From: https://oliver-plit.com/' ,
            'Reply-To: ' . $email
        ];

        $success = mail($recipient, $subject, $message, implode("\r\n", $headers));

        if ($success) {
            echo "Mail sent successfully";
        } else {
            http_response_code(500);
            echo "Mail function failed";
        }
        exit;

    default:
        header("Allow: POST", true, 405);
        exit;
}
