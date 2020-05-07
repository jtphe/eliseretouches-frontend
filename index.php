<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Elise Retouches</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Page d'accueil">
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

<body class="body-erh">
    <?php include("header.html"); ?>
    <div class="welcome-intro">
        <h1 class="text-center welcome-intro-text">Bienvenue sur<br> <span class="text-center welcome-intro-company">Elise
                Retouches</span></h1>
    </div>
    <div class="section-presentation">
        <div class="test">
            <div class="pdp-img">
                <img src="media/pdp.png" alt="Elise Phe" class="img-thumbnail" id="elise-pdp">
            </div>
            <div class="welcome-presentation">
                <p class="who-am-i">Qui suis-je ?</p>
                <p class="who-am-i-text">Passionnée par la couture et la retouche, j'ai ouvert mon atelier en 2014. Dans
                    un
                    premier
                    temps à Haguenau, ensuite à <a href='https://goo.gl/maps/JbKNVeBHYQgdzscU8' target='_blank' style="text-decoration: none">Strasbourg</a>.
                    Je serai ravie de vous accueillir dans ma boutique <a href='https://goo.gl/maps/JbKNVeBHYQgdzscU8' target='_blank' style="text-decoration: none">Elise Retouches à Strasbourg</a> pour réaliser vos retouches ! ☺︎
                </p>
            </div>
        </div>
    </div>
    <div class="section-testimonial">
        <blockquote class="blockquote elina-testi">
            <p class="mb-0 testi-text">"Depuis ma tendre enfance, j’ai toujours vu ma mère faire de la couture. Elle
                nous
                réparait les petits trous,
                accrocs dans nos habits et de temps à autres, nous confectionnait des vêtements.
                Je suis fière qu’elle en fasse son métier car je suis convaincue que c’est sa passion.
                Aujourd’hui, ma mère est heureuse de vous accueillir dans son atelier et assure à ses clients un travail
                soigné de qualité qu’elle fait de tout son cœur."</p>
            <footer class="blockquote-footer testimonial-author">Elina, sa fille</footer>
        </blockquote>
    </div>
    <?php include("footer.html") ?>

</body>

</html>