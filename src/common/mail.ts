import * as nodemailer from 'nodemailer';

export class Mail {
  async sendGmail(param): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 메일 보내는 곳
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL, // 보내는 메일의 주소
        pass: process.env.NODEMAILER_PASSWORD, // 보내는 메일의 비밀번호
      },
    });
    // 메일 옵션
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL, // 보내는 메일의 주소
      to: param.toEmail, // 수신할 이메일
      subject: param.subject, // 메일 제목
      text: param.text, // 메일 내용
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
