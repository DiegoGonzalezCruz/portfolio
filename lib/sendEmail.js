import axios from "axios"

const api = axios.create()

export const sendEmail = async ({ name, email, date }) => api.post('/api/sendEmail', {
  email,
  msg: `Hi ${name},
  Thanks for reaching out.
  This is a super cheap email (Simple Email Service - AWS SES) sent with NodeJS on ${date}.
  I hope we can talk business soon.
  
  All the best,

  Diego 🚀
  diego@thinkey.cl
  +569 7791 7078
  `,
  subject: "Thanks",
})