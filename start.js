const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
let gd = require('./gd_API');
let fs = require('fs');

app.use(fileUpload());
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/view/index.html')
});


app.post('/upload', async function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  fileObject = req.files.fileToUpload;


// console.log(req.files.fileToUpload)
  // console.log(fileObject)
  let obj = new gd.GD_Api;
  let path = '1igbLq9i6qv6E6hSlPDezMYb1L4biHStB';

  
  
  // fun()
  await setTimeout(async () => {await obj.uploadFile(fileObject = fileObject , 
  path = path )}, 1000);

  // console.log(req);
  // req.files.fileToUpload.mv(__dirname + '/i.jpg');
  
  // Use the mv() method to place the file somewhere on your server
    res.send('File uploaded!');

});


app.listen(8000)

