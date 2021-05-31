<?php
require '../vendor/autoload.php';

if (
    $_SERVER["REQUEST_METHOD"] == "POST" 
    && !empty($_POST["email"])
    && !empty($_POST["name"])
)
{
    $pool = $size = "";
    $email = $_POST["email"];
    $name = $_POST["name"];

    if ( !empty($_POST["pool"]) )
        $pool = "Si";

    if (!empty($_POST["size"]))
        $size = $_POST["size"];

    $text = "Se pre-inscribio.\n";
    $text .= "$name\n";
    $text .= "$email\n";
    $text .= "$pool\n";
    $text .= "$size\n";

    $html = "Se pre-inscribio.<br/>";
    $html .= "$name<br/>";
    $html .= "$email<br/>";
    $html .= "$pool<br/>";
    $html .= "$size<br/>";

    $email = new \SendGrid\Mail\Mail();
    $email->setFrom($_ENV["MAIL_FROM_MAIL"], $_ENV["MAIL_FROM_NAME"]);
    $email->setSubject("[chia-latam] - Nuevo Usuario Registrado");
    $email->addTo($_ENV["MAIL_TO"]);
    $email->addContent("text/plain", $text);
    $email->addContent("text/html", $html);
    $sendgrid = new \SendGrid($_ENV['SENDGRID_API_KEY']);

    try {
        $response = $sendgrid->send($email);
        http_response_code($response->statusCode());

        echo json_encode(array(
            "status" => "success"
        ));
        die($output);

    } catch (Exception $e) {
        
        http_response_code(404);

        echo json_encode(array(
            "status" => "error",
        ));
    }
}else{
    header('HTTP/1.1 403 Forbidden');
    header('Status: 403 Forbidden');
}