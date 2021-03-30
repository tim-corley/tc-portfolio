const nodemailer = require('nodemailer')

export default function Contact(req, res) {
  const { name, email, message } = req.body
  const myEmail = process.env.MY_EMAIL

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: myEmail,
      serviceClient: process.env.GOOGLE_CLIENT_ID,
      privateKey: process.env.GOOGLE_PRIVATE_KEY,
    },
  })

  const mailOption = {
    from: `${email}`,
    to: `${process.env.MY_EMAIL}`,
    subject: `[PORTFOLIO SITE CONTACT] | New Message From: ${email}`,
    replyTo: `${email}`,
    text: `
    New Contact Form Submitted
    -------
     - EMAIL ADDRESS: ${email}
     - NAME: ${name}
     - MESSAGE: 
     ${message}
    `,
  }

  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (err, data) => {
      if (err) {
        console.log(err)
        res.send('error' + JSON.stringify(err))
        reject(err)
      } else {
        console.log('email successfully sent')
        res.send('success')
        resolve(data)
      }
    })
  })
}
