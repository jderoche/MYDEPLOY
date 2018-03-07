var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/todo', function(req,res) {
    // On Windows Only ...
    const { spawn } = require('child_process');
    const bat = spawn('cmd.exe', ['/c', 'my.bat']);

    bat.stdout.on('data', (data) => {
    console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
    console.log(data.toString());
    });

    bat.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
    var data = {
      firstName: 'John User : Build Task Complete at : 70%',
      progress: 70,
      welcome:"salue"
    };

    res.send(data);
    });

})

app.listen(8080);
