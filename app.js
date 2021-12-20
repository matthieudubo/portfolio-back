const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require("cors");
require('dotenv').config();

const port = process.env.PORT || 8000;
app.use(express.json());

const corsOptions = {
  origin: "https://matthieudubo.github.io",
  credentials: true,
  optionSuccessStatus: 200,
  maxAge: 3600,
};
app.use(cors(corsOptions));

app.post('/', (req, res) => {
  const { name, subject, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  
  const mailOptions = {
    from: 'matthieu.dubo40@gmail.com',
    to: process.env.EMAIL,
    subject: subject,
    text: `Name: ${name}, email: ${email}
    Message: ${message}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(200).send()
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
