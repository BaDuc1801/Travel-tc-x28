const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "phamngoclam1310@gmail.com",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });