import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
        user: 'artyfacets@gmail.com',
        pass: process.env.GMAIL
    },
    secure: true,
});

export async function SendMail(mailOptions: { from: string, to: string[], text: string, html: string, subject: string }) {
    try {
        await transporter.sendMail(mailOptions);
        return
    } catch (err) {
        console.log(err)
    }
}