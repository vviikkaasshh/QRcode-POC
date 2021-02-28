# QRcode-POC

Install Packages

-- npm install

Start Application

-- node app.js


# Route POST
# http://localhost:3001/create
Request: {
	"name": "Gajendra manjari",
	"phno": 345435435,
	"rollno": 23
}
Returns: response.png (QR code)

# http://localhost:3001/validate
Add key as "file" and image as value in Postman, then it returns json response with student details
