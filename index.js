var express = require('express');
var app = express();
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();

global.FileData = "aerar";


//Assign the event handler to an event:
eventEmitter.on('scream', function (msg,res) {
        console.log("No ERROR");
        
        var data = {
        firstName: 'deroche '+Date()+': Build Done, Test Report :\n'+msg,
        progress: 70,
        welcome:"All done Ok"
        };
        res.send(data);
      
});

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
    var directoryPath = 'CCodeParser\\TestResults';
    console.log(directoryPath);

    
    fs.readdir(directoryPath, function (err, files) 
    {
        //handling error
        if (err) {
            console.error( "Error stating file.", err );
            return;
        }
        else
        {
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            var patt = new RegExp("(trx)+");
            var fileextvalid = patt.test(file);
            if (fileextvalid)
            {
              console.log('./CCodeParser/TestResults/'+file);
              fs.readFile( './CCodeParser/TestResults/'+file,'utf8', function(err, datafile) {
                if (err)
                {
                  eventEmitter.emit('scream',"-Error-",res);
                  return;
                }
                else
                {
                  global.FileData = datafile.substr(datafile.indexOf("<Counters")+9);
                  global.FileData = global.FileData.substr(1,global.FileData.indexOf("/>")-1).split(" ");
                  fLen = global.FileData.length;
                  var datatext = "";
                  for (i = 0; i < fLen; i++) {
                      datatext += global.FileData[i] + "\n";
                  }
                  console.log(datatext); 
                  //Fire the 'scream' event:
                  eventEmitter.emit('scream',datatext,res);
                }

              });
            }

        });
        }
    });
    


    });

})

app.listen(8080);
