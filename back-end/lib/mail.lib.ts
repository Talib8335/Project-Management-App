import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

const SendEmail = async (to: string, subject: string, message: string)=>{
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: to,
        subject:subject,
        text: message
    };
    
    try {
        await transporter.sendMail(mailOptions)
        return true
    }
    catch(err)
    {
        return false
    }
}

export default SendEmail

