import nodemailer from "nodemailer";

class EmailService {
  constructor() {
    // @ts-ignore
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "maxbackend22@gmail.com",
        pass: "kdccomlcszisohlb",
      },
    });
  }

  async sendActivationEmail(to: any, link: any) {
    // @ts-ignore
    await this.transporter.sendMail({
      from: "maxbackend22@gmail.com",
      to,
      subject: "Activate you profile in http://localhost:4000/",
      text: "",
      html: `<div>
                <h1>
                    For activation go to 
                </h1>
                <a href="${link}">${link}</a>
            </div>`,
    });
  }
}

export default new EmailService();
