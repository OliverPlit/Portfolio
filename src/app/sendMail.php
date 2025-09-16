<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS":
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case "POST":
        header("Access-Control-Allow-Origin: *");

        // Payload von Angular
        $json = file_get_contents('php://input');
        $params = json_decode($json, true); // als Array

        // Alle Daten vorbereiten
        $logData = print_r($params, true); // komplette Arrays als String
        $logFile = __DIR__ . "/mail_test_log.txt";

        // In Datei speichern
        file_put_contents($logFile, "=== Neue Nachricht ===\n$logData\n\n", FILE_APPEND);

        // Zurück an Angular senden
        echo json_encode(["status" => "ok", "msg" => "Mail lokal gespeichert!", "data" => $params]);
        exit;

    default:
        header("Allow: POST", true, 405);
        exit;
}
