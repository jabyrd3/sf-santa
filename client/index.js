module.exports = () => `<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible">
        <title>streetfighters seekrit santo</title>
        <meta name="description" content="come get u some present">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/css/main.css">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
        <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
        <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
    </head>
    <body>
    <div class="wreath"></div>
      <div class="container">
        <h1>streetfighters secret santa signup</h1>
        <form method="POST" action="/submit">

          <label for="name">your name</label>
          <input type="text" name="name"  value="" required/>

          <label for="email">your email (just for game updates)</label> 
          <input type="email" name="email" value="" required/>

          <label for="address">your address</label>

          <textarea name="address" value="" required></textarea>
          <button role="submit">send</button>
        </form>
        <div class="gritty"></div>
        <div class="snow-container">
          <div class="snow foreground"></div>
          <div class="snow foreground layered"></div>
          <div class="snow middleground"></div>
          <div class="snow middleground layered"></div>
          <div class="snow background"></div>
          <div class="snow background layered">
        </div>
      </div>
    </body>
</html>`;
