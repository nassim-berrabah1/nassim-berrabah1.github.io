<?php
/**
 * PORTFOLIO — NASSIM BERRABAH
 * contact.php — Traitement du formulaire de contact
 *
 * ⚠️  Remplace $destinataire par ton vrai email avant de déployer.
 */

header('Content-Type: application/json; charset=utf-8');

// Autorise uniquement les requêtes POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée.']);
    exit;
}

// ---- Configuration ----
$destinataire = 'ton.email@example.com'; // ← REMPLACE PAR TON VRAI EMAIL
$sujet_prefix = '[Portfolio] ';

// ---- Récupération & nettoyage des données ----
function clean(string $s): string {
    return htmlspecialchars(trim(stripslashes($s)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$email   = clean($_POST['email']   ?? '');
$message = clean($_POST['message'] ?? '');

// ---- Validation serveur ----
$errors = [];

if (empty($name)) {
    $errors[] = 'Le nom est requis.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Adresse email invalide.';
}
if (empty($message) || mb_strlen($message) < 10) {
    $errors[] = 'Le message est trop court (10 caractères minimum).';
}
if (mb_strlen($message) > 5000) {
    $errors[] = 'Le message est trop long (5 000 caractères maximum).';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// ---- Construction de l'email ----
$sujet = $sujet_prefix . 'Message de ' . $name;

$corps  = "Nouveau message reçu depuis le portfolio.\n\n";
$corps .= "Nom    : {$name}\n";
$corps .= "Email  : {$email}\n";
$corps .= "Message:\n{$message}\n";

$headers  = "From: Portfolio <noreply@nassim-berrabah.fr>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . PHP_VERSION . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ---- Envoi ----
$sent = mail($destinataire, $sujet, $corps, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'L\'email n\'a pas pu être envoyé. Réessaie plus tard.']);
}
