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
    subject: `New mail from ${email}`,
    text: `
    ${name} wrote:
    ${message}
    `,
  }

  transporter.sendMail(mailOption, (err, data) => {
    if (err) {
      console.log(err)
      res.send('error' + JSON.stringify(err))
    } else {
      console.log('mail send')
      res.send('success')
    }
  })
}
