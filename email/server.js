const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// {
//   "from":"pandamanishwork@gmail.com",
//   "to": "pandamanish49@gmail.com",
//   "subject": "Hello to world",
//   "message": "message from pandamanishwork stay live..."
// }


//for email
app.post("/api/v1/send", (req, res) => {
    try {
        const {from, to, subject, message} = req.body;
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: message
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Internal Server Error" });
            } else {
                console.log("Email sent: " + info.response);
                res.json({ message: "Email sent" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/api/v1/recieve", (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        res.json({ message: "Data received" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//result=====

//{
//   "from":"pandamanishwork@gmail.com",
//   "to": "pandamanish49@gmail.com",
//   "subject": "Hello to world",
//   "message": "message from pandamanishwork stay live..."
// }
