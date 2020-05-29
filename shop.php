<!DOCTYPE html>
<html lang="fr">

<head>
    <title>La boutique</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="La boutique">
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
    <?php include("header.html") ?>
    <div class="welcome-intro">
        <h1 class="text-center welcome-intro-text">La boutique</h1>
    </div>
    <div class="section-location">
        <h2 class="title-location">Nous trouver</h2>
        <h3 class="adress-location">6 place Arnold, Strasbourg 67000</h3>
        <h3 class="adress-location">Notre boutique est située plus précisement à côté du <br>3 rue St Maurice, Strasbourg 67000</h3>
    </div>
    <div id="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.2822236938578!2d7.768746915560937!3d48.585294827850696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796eaca904b3c67%3A0x6b0dcbbea440f66c!2sElise+Retouches!5e0!3m2!1sfr!2sfr!4v1563458344207!5m2!1sfr!2sfr" width="500" height="300" class="map-display" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
    <div id="myCarousel" class="carousel slide pictures-carousel" data-ride="carousel" style="width: 500px; margin: 2rem auto 6rem auto">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner">
            <div class="item active">
                <img src="/media/entrance.jpg" alt="Devant de la boutique" />
            </div>

            <div class="item">
                <img src="/media/brand_sign.jpg" alt="Enseigne de la boutique" />
            </div>

            <div class="item">
                <img src="/media/reception_one" alt="Réception de la boutique" />
            </div>

            <div class="item">
                <img src="/media/reception_two" alt="Réception de la boutique" />
            </div>
        </div>

        <!-- Left and right controls -->
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <?php include("footer.html") ?>
</body>