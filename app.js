var express = require('express');
var userModel = require('./models/user');
var bodyParser = require('body-parser');
var QRCode = require('qrcode');
var PassThrough = require('stream').PassThrough;
const fileUpload = require('express-fileupload');
var Jimp = require("jimp");
var qrCode = require('qrcode-reader');
const { isUndefined } = require('util');

//init app
var app = express();

//fetch data from the reuqest
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true
}));

app.post('/create', async (req, res) => {
    let data = {
        name: req.body.name,
        phno: req.body.phno,
        rollno: req.body.rollno
    }
    // Converting into String data
    let stringdata = JSON.stringify(data);
    const qrStream = new PassThrough();
    const result = await QRCode.toFileStream(qrStream, stringdata,
        {
            type: 'png',
            width: 200,
            errorCorrectionLevel: 'H'
        }
    );

    qrStream.pipe(res);
});

app.post('/validate', async (req, res) => {
    // Converting into String data
    try {
        Jimp.read(req.files.file.data, function (err, image) {
            if (err) {
                console.error(err);
            }
            // Creating an instance of qrcode-reader module
            let qrcode = new qrCode();
            qrcode.callback = function (err, value) {
                if (err) {
                    console.error(err);
                }
                // Printing the decrypted value
                if (value != null) {
                    console.log(value.result);
                    res.setHeader('content-type', 'text/json')
                    return res.status(200).send(value.result);
                }
                else {
                    res.status(404).send('bad Request');
                }
            };
            // Decoding the QR code
            qrcode.decode(image.bitmap);
        });
    }
    catch {
        res.status(404).send('bad Request');
    }
});

//assign port
var port = process.env.PORT || 3001;
app.listen(port, () => console.log('server run at ' + port));