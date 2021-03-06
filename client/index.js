module.exports = (config) => `<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible">
        <title>streetfighters seekrit santo</title>
        <meta name="description" content="come get u some present">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
        <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
        <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
        <link rel="stylesheet" href="/css/main.css?q=${Date.now()}">
    </head>
    <body>
    <div class="wreath"></div>
      <div class="container">
        <h1>SECRET STREET FIGHT <br/> gift exchange 2019</h1>
        <div class="flex-wrap donate center">
          <a target="_blank" class="button" href="https://www.paypal.com/pools/c/8jCPo9Cy0S">Click here to donate to Lonnie's shoebox</a>
        </div>
        ${!config.disableSignups ? `<form method="POST" action="/submit" autocomplete="on">
            <label for="name">the name you use on facebook</label>
            <input id="fbname" type="text" name="fbname" autocomplete="fbname" required/>

            <label for="email">your email (just for x-change updates)</label> 
            <input id="email" type="email" name="email" required autocomplete="email" style="margin-bottom:48px;"/>
            <label for="name">name</label>
            <input id="fullname" type="text" name="name" autocomplete="name" required/>
            <div class="flex-wrap">
              <div>
                <label for="street-address">street</label>
                <input id="address-line1" name="street-address" required autocomplete="address-line1"></input>
              </div>
              <div>
                <label for="address-line2">APT (optional, put a space if none)</label>
                <input id="address-line2" name="address-line2" required autocomplete="address-line2"></input>
              </div>
            </div>
            <div class="flex-wrap">
              <div>
                <label for="city">city</label>
                <input id="city" name="city" required autocomplete="address-level2"></input>
              </div>
              <div>
                <label for="state">state</label>
                <input id="state" name="state" required autocomplete="address-level1"></input>
              </div>
              <div>
                <label for="zip">zip</label>
                <input id="zip" name="zip" required autocomplete="postal-code"></input>
              </div>
            </div>
            <div class="flex-wrap">
              <div class="vert-middle">
                <label for="country">Country</label>
                <input type="text" maxlength="3" name="country">
              </div>
              <div class="vert-middle flex-wrap inline" style="padding-top: 20px;padding-left:20px;">
                <input id="international" style="width:20px;" type="checkbox" name="international"/>
                <label class="label-inline" for="international">i would be cool with <br/>shipping internationally</label>
              </div>
            </div>
            <div class="flex-wrap center">
              <button role="submit">send</button>
            </div>
        </form>` : `<h3>Sorry, signups are closed for this year</h3>`}
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
