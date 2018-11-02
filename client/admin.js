const _ = require('lodash');

module.exports = (rows) => `<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible">
        <title>sf-santa admin</title>
        <meta name="description" content="come get u some present">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/css/main.css">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
        <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
        <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
    </head>
    <body>
      <div class="container">
        <h1>secret santa admin – ${rows.length} signups</h1>
        <table>
            <thead>
                <th>name</th>
                <th>email</th>
                <th>country</th>
                <th>recipient</th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
            ${_.sortBy(rows, 'email').map(row =>
                `<tr>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.country}</td>
                    <td>${(()=>{
                        const target = rows.find(r => r.uuid === row.recipient)
                        return target ? target.name : null
                    })()}</td>
                    <td><a href="/admin/delete/${row.uuid}">delete</a></td>
                    <td><a href="/admin/edit/${row.uuid}">edit</a></td>
                </tr>`).join(' ')}
            </tbody>            
        </table>
        <div class="flex-wrap center">
            <a href="/admin/randomize">Randomize!</a>
        </div>
      </div>
    </body>
</html>`;
