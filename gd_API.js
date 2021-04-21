const fs = require('fs');
const Path = require('path');
const {google} = require('googleapis');
const https = require('https');
const stream = require('stream');
const { equal } = require('assert');
// const buffer = require('buffer');


// read tokens.json and parse it
let Credentials = fs.readFileSync('token.json');
Credentials = JSON.parse(Credentials);

class GD_Api{

    constructor(){
        // oauth information
        this.client_id = Credentials.oauth.client_id
        this.client_secret = Credentials.oauth.client_secret
        this.redirect_uri = Credentials.oauth.redirect_uri

        // tokens information
        this.refresh_token = Credentials.tokens.refresh_token;
        this.access_token = Credentials.tokens.access_token;
        
        // oauth2Client information
        this.oauth2Client = new google.auth.OAuth2(
            this.client_id,
            this.client_secret,
            this.redirect_uri
            );
        this.oauth2Client.setCredentials({refresh_token: this.refresh_token})

        // drive object
        this.drive = google.drive({
            version: "v3",
            auth: this.oauth2Client
        });
    
    };


    // Simple function to upload Files to google drive from url without storing file in Disk
    async uploadFileURL(url, path) {
        // create an object from url to simple access
        let urlObject = new URL(url);

        // create writeStream in memory without fs.createWritestream
        let uploadStream = stream.PassThrough();
        
        // check that path is not empty
        (path == '' || path == undefined) ? path = '' : path = [path];

        console.log(path);

        try {

            // check from hostname of the file provider
            if(urlObject.hostname != 'files.catbox.moe'){
                throw {message: `The hostname {${urlObject.hostname}} is unsupported`};
            } 
            let fileName = urlObject.pathname.replace('/', '');

            // https call 
            await https.get(url, (res) => {
                // save chunks in the writeStream
                res.on('data', (chunk) =>{
                    uploadStream.push(chunk)
                })
                
                // send data to google drive 
                res.on('end', async () => {
                    uploadStream.end() // close stream
                    let mimeType = res.headers['content-type'] // get the mimeType of the file

                    const response = await this.drive.files.create({
                        // requestBody: {
                        //     name: "MyImage.png",
                        //     mimeType: "image/png",
                        //  },
                        resource: {
                            name: fileName ,
                            // if you want to store the file in the root, remove this parents
                            parents: path // dataType must be array
                        },
                        media: {
                            mimeType: mimeType,
                            body: uploadStream
                        }
                    })
                    console.log(response.data);
                })
            })
        }
         catch (error) {
            console.log(error.message);
        }
    }// End of the function

    async uploadFile(fileObject , path , buffer) {
        (path == '' || path == undefined) ? path = '' : path = [path];
        let uploadStream = new stream.PassThrough();
        // await uploadStream.push(fileObject.data);
        uploadStream.end(fileObject.data)

        let fileName = fileObject.name;
        let mimetype = fileObject.mimetype;
        // console.log(fileName);
        // console.log(mimeType);
         try {
                const response = await this.drive.files.create({
                        // requestBody: {
                        //     name: fileName,
                        //     mimeType: mimeType
                        //  },
                        resource: {
                            name: fileName,
                            // if you want to store the file in the root, remove this parents
                            parents: path // dataType must be array
                        },
                        media: {
                            mimeType: mimetype,
                            body: uploadStream
                        }
                    })
                    console.log(response.data);
                    // console.log(response);
                }
         catch (error) {
            console.log(error.message);
        }
    } // End of the function


}

// let obj = new GD_Api()
// console.log(obj.uploadFile)
// obj.uploadFileURL(
//     url = 'https://files.catbox.moe/mub8zj.png',
//     path = '1igbLq9i6qv6E6hSlPDezMYb1L4biHStB' 
//     )

// switch(Url.hostname){
//     case 'files.catbox.moe':
//         console.log('catbox');
//         break
//     case 'anonfiles.com':
//         console.log('anonfiles');
//         break

// }


module.exports = { GD_Api }