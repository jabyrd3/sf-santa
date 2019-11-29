const _ = require('lodash');

module.exports = (id, gifs) => `<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible">
        <title>successful sign upfor streetfighters secret santa</title>
        <meta name="description" content="come get u some present">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
        <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
        <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
        <link rel="stylesheet" href="/css/main.css?q=${Date.now()}">
    </head>
    <body>
      <div class="container">
        <div class="success">
            <h1>ALL DONE!</h1>
            <p>when we've done the selection, your secret santa partner will be visible <a href="https://santa.dev.host/user/${id}">at this link.</a></p>
            <p>we will also send an email with a link to the page when it's ready</p>
            <div class="img-wrap">
              <img src="/gifs/${_.sample(gifs)}" />
            </div>
        </div>
      </div>
              <div class="snow-container">
          <div class="snow foreground"></div>
          <div class="snow foreground layered"></div>
          <div class="snow middleground"></div>
          <div class="snow middleground layered"></div>
          <div class="snow background"></div>
          <div class="snow background layered">
        </div>

    </body>
</html>`;
