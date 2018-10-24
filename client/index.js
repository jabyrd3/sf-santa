module.exports = () => `<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible">
        <title>streetfighters seekrit santo</title>
        <meta name="description" content="come get u some present">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
        <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
        <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
    </head>
    <body>
      <div class="container">
        <h1>streetfighters secret santa signup</h1>
        <form method="POST" action="/submit">

          <label for="name">your name</label>
          <input type="text" name="name"  value="" />

          <label for="email">your email (just for game updates)</label> 
          <input type="text" name="email" value=""/>

          <label for="address">your address</label>

          <input type="text" name="address" value=""/>
          <fieldset>
            <legend>how much do you post</legend>
            <div>
              <label for="norm">rarely</label>
              <input type="radio" id="norm" name="activity" value="norm" checked />
            </div>
            <div>
              <label for="activity">a lot</label>
              <input type="radio" id="activity" name="activity" value="a lot" />
            </div>
            <div>
              <label for="mod">i am a mod</label>
              <input type="radio" id="mod" name="activity" value="mod" />
            </div>
          </fieldset>
          <button role="submit">send</button>
        </form>

      </div>
    </body>
</html>`;
