<?php

declare(strict_types=1);

$isJsonRequest = (
    isset($_SERVER['HTTP_ACCEPT']) && str_contains($_SERVER['HTTP_ACCEPT'], 'application/json')
) || (
    isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest'
);

$respond = static function (array $payload, int $statusCode = 200) use ($isJsonRequest): void {
    http_response_code($statusCode);

    if ($isJsonRequest) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (($payload['ok'] ?? false) === true) {
        header('Location: ./thank-you.html');
        exit;
    }

    $query = http_build_query(['message' => $payload['message'] ?? '']);
    header('Location: ./index.html?' . $query . '#contact');
    exit;
};

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $respond([
        'ok' => false,
        'message' => 'Invalid request method.',
    ], 405);
}

$company = trim((string) ($_POST['company'] ?? ''));

if ($company !== '') {
    $respond([
        'ok' => false,
        'message' => 'Spam submission rejected.',
    ], 422);
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$projectType = trim((string) ($_POST['project_type'] ?? ''));
$budgetRange = trim((string) ($_POST['budget_range'] ?? ''));
$preferredTime = trim((string) ($_POST['preferred_time'] ?? ''));
$notes = trim((string) ($_POST['notes'] ?? ''));

if (
    $name === '' ||
    $email === '' ||
    $notes === ''
) {
    $respond([
        'ok' => false,
        'message' => 'Please provide your name, email, and a short project note.',
    ], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $respond([
        'ok' => false,
        'message' => 'Please provide a valid email address.',
    ], 422);
}

$storageDir = __DIR__ . DIRECTORY_SEPARATOR . 'storage';
$storageFile = $storageDir . DIRECTORY_SEPARATOR . 'inquiries.json';

if (!is_dir($storageDir) && !mkdir($storageDir, 0777, true) && !is_dir($storageDir)) {
    $respond([
        'ok' => false,
        'message' => 'Unable to prepare local storage.',
    ], 500);
}

$existing = [];

if (file_exists($storageFile)) {
    $raw = file_get_contents($storageFile);

    if ($raw !== false && trim($raw) !== '') {
        $decoded = json_decode($raw, true);

        if (is_array($decoded)) {
            $existing = $decoded;
        }
    }
}

$existing[] = [
    'submitted_at' => date(DATE_ATOM),
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'project_type' => $projectType,
    'budget_range' => $budgetRange,
    'preferred_time' => $preferredTime,
    'notes' => $notes,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
];

$saved = file_put_contents(
    $storageFile,
    json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
);

if ($saved === false) {
    $respond([
        'ok' => false,
        'message' => 'Unable to save inquiry.',
    ], 500);
}

$respond([
    'ok' => true,
    'message' => 'Inquiry saved successfully.',
]);
