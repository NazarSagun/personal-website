const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Account activation on " + process.env.HOST_URL,
      text: "",
      html:
      `
        <div>
          <h1>Click the link to activate your email</h1>
          <a href=${link}>Activation link</a>
        </div>
  
      `
    })
  }
}

module.exports = new MailService();