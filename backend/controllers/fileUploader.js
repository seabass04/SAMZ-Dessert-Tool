const multer = require('multer');
const upload = multer();
const fs = require('fs');

var path;
var filename;
function uploadFile(request, response)
{
    console.log("width: " + request.body.width);
    console.log("legth: " + request.body.length);
    console.log("longiude: " + request.body.longitude);
    console.log("latitude: " + request.body.latitude);
    console.log(request.file.filename);
    path = request.file.path;
    fs.renameSync(path, path+".xlsx")
    const spawn = require("child_process").spawn;
    const pythonScript = spawn('python', ['./process.py', path+".xlsx", request.body.length, request.body.width, request.body.longitude, request.body.latitude]);
    var results = "";
    pythonScript.stdout.on('data', function(data) {
        results += data;
        return;
    });
    pythonScript.stderr.on('data', (data)=>
    {
        console.error('stderr: ' + data.toString())
        return;
    })
    pythonScript.on('close', (code)=>
    {
        console.error('exited with code:' + code.toString())
        fs.unlink(path+".xlsx", (err) => { //code to delete file from tmp
            if (err) {
                console.error(err)
                return
            }})
        response.send(results);
        return;
    })
}
module.exports = {
    uploadFile
};