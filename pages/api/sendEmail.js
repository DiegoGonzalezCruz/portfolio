const nodemailer = require("nodemailer")
const aws = require("@aws-sdk/client-ses")

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
})
// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: { ses, aws },
})

const sendEmail = async (req, res) => {

  const { email, msg, subject } = req.body

  if (req.method === 'POST') {

    try {
      console.log('*** Sending Email ***')
      console.log(req.body)

      await transporter.sendMail({
        from: 'diego@thinkey.cl',
        to: email,
        subject: subject,
        text: msg
      })

      await transporter.sendMail({
        to: 'diego@thinkey.cl',
        from: email,
        subject: subject,
        text: msg
      })


      res.status(200)


    } catch (e) {
      console.log(e)
      console.log('error Email api')
      return res.status(400).end()
    }
  }
}

export default sendEmail