// // Because we want to access DOM nodes,
// // we initialize our script at page load.
// window.addEventListener( 'load', function () {

//   // These variables are used to store the form data
//   const file = {
//         dom    : document.getElementById( "fileToUpload" ),
//         binary : null
//       };

//   // Use the FileReader API to access file content
//   const reader = new FileReader();

//   // Because FileReader is asynchronous, store its
//   // result when it finishes to read the file
//   reader.addEventListener( "load", function () {
//     file.binary = reader.result;
//   } );

//   // At page load, if a file is already selected, read it.
//   if( file.dom.files[0] ) {
//     reader.readAsBinaryString( file.dom.files[0] );
//     // console.log(reader.readAsArrayBuffer( file.dom.files[0] ))
//   }

//   // If not, read the file once the user selects it.
//   file.dom.addEventListener( "change", function () {
//     if( reader.readyState === FileReader.LOADING ) {
//       reader.abort();
//     }

//     reader.readAsBinaryString( file.dom.files[0] );


//   } );

//   // sendData is our main function
//   function sendData() {
//     // If there is a selected file, wait it is read
//     // If there is not, delay the execution of the function
//     if( !file.binary && file.dom.files.length > 0 ) {
//       setTimeout( sendData, 10 );
//       return;
//     }

//     // To construct our multipart form data request,
//     // We need an XMLHttpRequest instance
    // const XHR = new XMLHttpRequest();


//     // We need a separator to define each part of the request
//     const boundary = "blob";

//     // Store our body request in a string.
//     let data = "";

//     // So, if the user has selected a file
//     if ( file.dom.files[0] ) {
//       // Start a new part in our body's request
//       data += "--" + boundary + "\r\n";

//       // Describe it as form data
//       data += 'content-disposition: form-data; '
//       // Define the name of the form data
//             + 'name="'         + file.dom.name          + '"; '
//       // Provide the real name of the file
//             + 'filename="'     + file.dom.files[0].name + '"\r\n';
//       // And the MIME type of the file
//       data += 'Content-Type: ' + file.dom.files[0].type + '\r\n';

//       // There's a blank line between the metadata and the data
//       data += '\r\n';

//       // Append the binary data to our body's request
//     //   data += file.binary + '\r\n';

//       data += '\r\n';


//     }
//     let text = {name: 'ahmed', value: 'ahmed'}
//     // Text data is simpler
//     // Start a new part in our body's request
//     data += "--" + boundary + "\r\n";

//     // Say it's form data, and name it
//     data += 'content-disposition: form-data; name="' + text.name + '"\r\n';
//     // There's a blank line between the metadata and the data
//     data += '\r\n';

//     // Append the text data to our body's request
//     data += file.binary  + "\r\n";

//     // Once we are done, "close" the body's request
//     data += "--" + boundary + "--";

    // let progress = document.getElementById('Progress-bar');
    // console.log(progress)
// XHR.upload.onprogress = function(event) {
//   console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
//   console.log(`Uploaded ${Math.floor(event.loaded / event.total *100)} of 100%`);
//   console.log(`Uploaded ${Math.floor(event.loaded)} of 100%`);
//   progress.style.width = Math.floor(event.loaded / event.total *100).toString() + '%';
//   progress.innerText = Math.floor(event.loaded / event.total *100).toString() + '%';
  
// };    // Define what happens on successful data submission
//     XHR.addEventListener( 'load', function( event ) {
//     //   alert( 'Yeah! Data sent and response loaded.' );
//     console.log('Yeah! Data sent and response loaded.')
//     } );

//     // Define what happens in case of error
//     XHR.addEventListener( 'error', function( event ) {
//       alert( 'Oops! Something went wrong.' );
//     } );

//     // Set up our request
//     XHR.open( 'POST', 'http://localhost:8000/profile' );

//     // Add the required HTTP header to handle a multipart form data POST request
//     XHR.setRequestHeader( 'Content-Type','multipart/form-data; boundary=' +  boundary);
//     // XHR.setRequestHeader( 'Access-Control-Allow-Origin','*' );

//     // And finally, send our data.
//     XHR.send( data );
//   }

//   // Access our form...
//   const form = document.getElementById( "uploadForm" );

//   // ...to take over the submit event
//   form.addEventListener( 'submit', function ( event ) {
//     event.preventDefault();
//     sendData();
//   } );
// } );

const fun = ()=> {
    let progress = document.getElementById('Progress-bar');
 const XHR = new XMLHttpRequest();
    XHR.upload.onprogress = function(event) {
//   console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
  console.log(`Uploaded ${Math.floor(event.loaded / event.total *100)} of 100%`);
//   console.log(`Uploaded ${Math.floor(event.loaded)} of 100%`);
  progress.style.width = Math.floor(event.loaded / event.total *100).toString() + '%';
  progress.innerText = Math.floor(event.loaded / event.total *100).toString() + '%';}
  
    XHR.open( 'POST', '/upload' );
    XHR.send( new FormData(uploadForm) );



}
   
  uploadForm.onsubmit = async (e) => {
    e.preventDefault();
    await fun();
    }



