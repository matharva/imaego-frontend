<?php
  $to = 'tanay@imaego.com';
  $subject = $_POST['full_name']." - wants to connect";
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= "From: imaego <do-not-reply@imaego.com>" . "\r\n";
  $headers .= "Reply-To: <" . $_POST['email'] . ">" . "\r\n";
  $txt = "<html>
          <head>
          <title>HTML email</title>
          </head>
          <body>
          <p>Name: ".$_POST['full_name']."</p>
          <p>Email: ".$_POST['email']."</p>
          <p>Comment:<br>".$_POST['comment']."</p>
          </body>
          </html>";
  $mailSuccess = mail($to,$subject,$txt,$headers);
  if ($mailSuccess) {
    echo '[{"success": true, "message": "Message sent successfully!"}]';
  } else {
    echo '[{"success": false, "message": "Unexpected error occured. Please try again later!"}]';
  }
?>
