const nodemailer = require('nodemailer')

export default function Contact(req, res) {
  const { name, email, message } = req.body
  const myEmail = process.env.MY_EMAIL
  const CLIENT_ID = process.env.MAILING_SERVICE_CLIENT_ID
  const CLIENT_SECRET = process.env.MAILING_SERVICE_CLIENT_SECRET
  const REFRESH_TOKEN = process.env.MAILING_SERVICE_REFRESH_TOKEN

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: myEmail,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    },
  })

  const mailOption = {
    from: `${email}`,
    to: `${myEmail}`,
    subject: `💥 PORTFOLIO SITE | New Message From: ${email}`,
    replyTo: `${email}`,
    text: `
    New Contact Form Submitted
    ----------
     - EMAIL ADDRESS: ${email}
     - NAME: ${name}
     - MESSAGE: 
     ${message}
    ----------
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
