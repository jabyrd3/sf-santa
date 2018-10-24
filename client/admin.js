module.exports = (rows) => `<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible">
        <title>sf-santa admin</title>
        <meta name="description" content="come get u some present">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
        <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
        <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
    </head>
    <body>
      <div class="container">
        <h1>secret santa admin</h1>
        <table>
            <thead>
                <th>name</th>
                <th>email</th>
                <th>uuid</th>
            </thead>
            <tbody>
            ${rows.map(row =>
                `<tr>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.uuid}</td>
                    <td><a href="/delete/${row.uuid}">delete</a></td>
                </tr>`).join(' ')}
            </tbody>            
        </table>
      </div>
    </body>
</html>`;
