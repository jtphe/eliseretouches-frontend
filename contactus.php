<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Contact</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Contact">
    <meta name="author" content="Jean-Thavorak Phe">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/page_content.css" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="57x57" href="media/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="media/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="media/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="media/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="media/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="media/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="media/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="media/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="media/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="media/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="media/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="media/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="media/favicon/favicon-16x16.png">
    <link rel="manifest" href="media/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/921fec88a5.js" crossorigin="anonymous"></script>
    <!-- Matomo -->
    <script type="text/javascript">
        var _paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
            var u = "//jtphe.ddns.net/analytics/";
            _paq.push(['setTrackerUrl', u + 'matomo.php']);
            _paq.push(['setSiteId', '2']);
            var d = document,
                g = d.createElement('script'),
                s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = u + 'matomo.js';
            s.parentNode.insertBefore(g, s);
        })();
    </script>
    <!-- End Matomo Code -->
</head>
<?php

if (isset($_POST['mailform'])) {
    if (!empty($_POST['name']) and !empty($_POST['email']) and !empty($_POST['message'])) {
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
        $from = $_POST['name'];
        $email = $_POST['email'];
        $elise = "contact@eliseretouches.com";
        $subject = "CONTACT - Eliseretouches.com";

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

        $message = '<h2>Nouveau message de ' . $from . "</h2><br/>";
        $message .= $_POST['message'] . "<br/>";
        $message .= "<h4>Recontactez : " . $email . "</h4>";

        mail($elise, $subject, $message, $headers);
    } else {
        $message = "Tous les champs doivent être complétés !";
    }
}
?>

<body class="body-erh">
    <?php include("header.html") ?>
    <div class="welcome-intro">
        <h1 class="text-center welcome-intro-text">Contact</h1>
    </div>
    <div class="container contact-us">
        <div class="row section-contact">
            <!-- <div class="col-md-6 col-md-offset-3 contact-form">
                <div class="well well-sm">
                    <form class="form-horizontal" action="" method="post">
                        <fieldset>
                            <legend class="text-center contact-form--title">Envoyez moi un message !</legend>

                            <!-- Name input-->
                            <!-- <div class="form-group">
                                <label class="col-md-3 control-label" for="name">Nom</label>
                                <div class="col-md-9">
                                    <input id="name" name="name" type="text" placeholder="Votre nom" class="form-control">
                                </div>
                            </div> -->

                            <!-- Email input-->
                            <!-- <div class="form-group">
                                <label class="col-md-3 control-label" for="email">Votre e-mail</label>
                                <div class="col-md-9">
                                    <input id="email" name="email" type="text" placeholder="Votre email" class="form-control">
                                </div>
                            </div> -->

                            <!-- Message body -->
                            <!-- <div class="form-group">
                                <label class="col-md-3 control-label" for="message">Votre message</label>
                                <div class="col-md-9">
                                    <textarea class="form-control" id="message" name="message" placeholder="Écrivez votre message ici..." rows="5"></textarea>
                                </div>
                            </div> -->

                            <!-- Form actions -->
                            <!-- <div class="form-group">
                                <div class="col-md-12 text-right">
                                    <button type="submit" name="mailform" class="btn btn-primary btn-lg">Envoyez</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div> -->
            <!-- </div>  -->
            <div class="contact-info">
                <h3 style="color: rgb(255, 255, 255);">Me contacter</h3>
                <h4 style="color: rgb(255, 255, 255);">Téléphone 📞</h4>
                <a href="tel:+33615567047" target="_blank" rel="noopener noreferrer" style="color: rgb(211, 211, 211);">+33 6 15 56 70 47</a>
                <h4 style="color: rgb(255, 255, 255);">Mail 📧</h4>
                <a href="mailto:contact@eliseretouches.com" style="color: rgb(255, 255, 255);">Cliquez ici pour envoyer un e-mail </a>
            </div>
        </div>
    </div>
    <?php include("footer.html") ?>
</body>