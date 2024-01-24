/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import { createWriteStream, writeFile } from 'fs';

inquirer
    .prompt([{
        "name": "URL",
        "message": "Type in your URL : "
    }])
    .then((answers) => {
        const qr_svg = qr.image(answers.URL);
        qr_svg.pipe(createWriteStream('qr_img.png'));
        writeFile('./url.txt',answers.URL, err => {
            if(err){
                console.log(err);
            }
        })
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });
