"use server"
import { marked } from "marked";
import { SendMail } from "../utils/nodemailer";
import { GetMailIds } from "./data";
import { redirect } from "next/navigation";
import { IsAdmin } from "./auth/auth";

var mailOptions = {
    from: 'artyfacets@gmail.com',
    text: 'A mail from Arty Facets',
    to: ["artyfacets@gmail.com"],
    html: "",
    subject: ""
};

export async function ContactMail(form: FormData) {
    const data = {
        message: form.get('message'),
        phone: form.get('phone'),
        email: form.get('email'),
        name: form.get('name')
    }
    const names = ["Kathak", "Bollywood", "Dance", "Bharathnatayam", "Vocal", "Music", "Carnatic", "Vocal Music", "Hindusthani", "Fine", "Arts", "Guitar", "Keyboard", "Tabla", "Flute", "Yoga"]
    for (let i = 0; i < names.length; i++) {
        if (data.message?.toString().includes(names[i])) { 
            var html = `
                <!doctype html>
                    <html>
                        <head>
                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        </head>
                        <body style="font-family: sans-serif;">
                            <div style="display: block; margin: auto; max-width:600px;" class="main">
                                <h1 style="font-size: 20px; margin-top: 20px;">Arty Facets | Enquiry</h1>
                                <h1 style="font-size: 16px; font-weight: bold; margin-top:20px;">You have an Enquiry from ${data.name} (email: ${data.email}, Phone: ${data.phone}) </h1>
                                <p style="font-size: 14px; font-weight: bold; margin-top: 10px">${data.message}</p>
                                <hr style=" color: black; margin-top: 25px;"/>
                                <p style="marginTop: 25px; color: #686969;">Do not reply to this automated email.</p>
        
                            </div>
                            <style>
                            .main { background-color: white; }
                            a:hover { border-left-width: 1em; min-height: 2em; }
                            </style>
                        </body>
                    </html>
                `
            mailOptions.html = html
            mailOptions.subject = "Enquiry"
            await SendMail(mailOptions)
            break;
        }
    }
}

export async function SendMailsToUsers(data: { subject: string, message: string, image: string }) {

    var html = `
        <!doctype html>
            <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <style type="text/css">
                        h1,h2,h3 { text-underline-offset: 2px; margin-top: 4rem; color: black; text-decoration: underline;}
                        li { font-size: 1.125rem; }
                        ul { list-style-type: disc; }
                        img { border-radius: 0.5rem; width: 50%; }
                        p { text-indent: 5px; color: black; font-size: 1.125rem;}
                        a { color: #2563EB; }
                    </style>
                </head>
                <body style="font-family: sans-serif;">
                    <div style="display: block; margin: auto; max-width:600px;" class="main">
                        <h1 style="font-size: 20px; margin-top: 20px;">Arty Facets | ${data.subject}</h1>
                        <div style="margin-top: 10px;">
                            ${data.image != "" ? `<img src=${data.image} alt="Image" style="margin-top: 10px;">` : null}
                            <article dangerouslySetInnerHTML={{__html: ${marked(data.message, { breaks: true })}</article>
                        </div>
                        <hr style="color: black; margin-top: 25px;">
                        <p style="marginTop: 25px; color: #686969;">Do not reply to this automated email.</p>

                    </div>
                </body>
            </html>
        `
    mailOptions.html = html
    mailOptions.subject = data.subject
    const emails = await GetMailIds()
    var emailList: string[] = [] // Convert emailList to string array
    emails.pop()

    if (await IsAdmin()) {
        for (var i = 0; i < Math.ceil(emails.length / 10); i++) {
            for (var j = 0; j < 10; j++) {
                if (emails[i * 10 + j] == undefined) break
                emailList.push(emails[i * 10 + j].email) // Convert Document to string
            }
            mailOptions.to = emailList
            await SendMail(mailOptions)
        }
    }
    redirect('/dashboard')
}