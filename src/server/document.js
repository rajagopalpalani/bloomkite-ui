export default ({ appString, js, prodMeta, googleTracking, styles, helmet, preloadedState }) => `
    <!doctype html>
    <html lang="en">
        <head>
            ${helmet.title ? helmet.title.toString() : ''}
            ${helmet.meta ? helmet.meta.toString() : ''}
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            ${prodMeta}
            <meta name="msapplication-TileImage" content="images/favicon.png" />
            <link rel="icon" href="images/favicon.png" sizes="32x32" />
            <link rel="icon" href="images/favicon.png" sizes="192x192" />
            <link rel="apple-touch-icon-precomposed" href="images/favicon.png" />

            <link rel="preload" href="images/fonts/Gilroy-Regular.woff" as="font" type="font/woff" crossorigin>
            <link rel="preload" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" as="style" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" as="style">
            <link rel="preload" href="https://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.min.css" as="style" >

            <link rel="preload" href="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js" as="script">
            <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" as="script">
            <link rel="preload" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" as="script">
            <link rel="preload" href="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js" as="script">

            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
            <link href="https://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="/app.client.css">
            ${styles}
            ${googleTracking}
        </head>
        <body>
            <div id="react-root">${appString}</div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
            <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
            <script src='https://checkout.razorpay.com/v1/checkout.js'></script>
            <script>
                window.__PRELOADED_STATE__ = ${preloadedState || '{}'};
            </script>
            <script  type="text/javascript" src="/app.client.js"></script>
            ${js}
        </body>
    </html>
`;
