// const {google} = require('googleapis');
// const fs = require('fs');
// const path = require('path');
// const buffer = require('buffer');
// const stream = require("stream"); // Added
// const https = require('https');
// const { file } = require('googleapis/build/src/apis/file');

// const oauth2Client = new google.auth.OAuth2(
//   "202264815644.apps.googleusercontent.com",
//   "X4Z3ca8xfWDb1Voo-F9a7ZxJ",
//   "urn:ietf:wg:oauth:2.0:oob"
// );



// const refresh_token = "1//0ckhlUNfg-fwdCgYIARAAGAwSNwF-L9IrNTD-QaQHtRZgNTBtSIGohxl2NhrQ1O2eGYHRZr86HxNs7WQDUolGnfkW8eLGvnB38QQ";
// const access_token = "ya29.a0AfH6SMA3LqQFQaAQodYqfLn7ICcF7pNG2WO8EXxXhZIugjYHeXAbnXWGXSxUMdNYmNxQTInGpUE1mFozhSv3yw3WG6jF82IJgz-qOdJdfRDcMRNvvU77OGQCTotjJTzrz1AqkFyvFemvrksiTiEBmwmwyGc9";

// oauth2Client.setCredentials({refresh_token: refresh_token})

// const drive = google.drive({
//     version: "v3",
//     auth: oauth2Client
// })


// const file_path = path.join(__dirname, "image.jpg");

// const contents = fs.readFileSync(file_path, {encoding: 'base64'});


// // const buf = new Buffer.from(contents, "base64"); // Added
// const bs = new stream.PassThrough(); // Added
// // bs.end(buf); // Added
// // console.log(contents);
// // console.log(buf);

// const uploadFile = async () => {
//     try {
        
//         const response = await drive.files.create({
//             requestBody: {
//                 name: "MyImage.png",
//                 mimeType: "image/png",
//             },
//             // resource: {
//             //     name: 'MyImage.jpg',
//             //     // if you want to store the file in the root, remove this parents
//             //     parents: ['1klrbphw1hrHVhOMdCQobNJKq9GPk3gV0'] 
//             // },
//             media:{
//                 mimeType: 'image/png',
//                 body: bs
//             }
//         })
//         console.log(response.data);

//     } catch (error) {
//         console.log(error.message); // Rate Limit Exceeded

//     }
// } 

  
// // uploadFile()



// https.get('https://files.catbox.moe/mub8zj.png', (resp) => {
//   let data;

//   // A chunk of data has been received.
//   resp.on('data', (chunk) => {
//     bs.push(chunk)
// //    console.log(data)
// });
//   resp.on("end" , () =>{
//     bs.end()

//   })

//   // The whole response has been received. Print out the result.
// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });

// uploadFile()
// const fs = require('fs')
// const path = require('path')

// let p = path.join('token.json')
// let data = fs.readFileSync('token.json');
// console.log(JSON.parse(data).refresh_token)