<?php

if (isset($_POST["submit_button"])) {
    $user_name = $_POST['user_name'];
    $message_subject = $_POST['message_subject'];
    $user_email = $_POST['user_email'];
    $message_body = $_POST['message_body'];

    $mail_to = "m.ilin.fr@gmail.com";
    $headers = "From: ".$user_email;
    $txt = $user_name." used your contact form.\n\n".$message_body;

    mail($mail_to, $message_subject, $txt, $headers);
    header("Location: index.php?mailsend");
}