import nodemailer from "nodemailer"

const sendEmail=async()=>{

    const transport=nodemailer.createTransport({

        service:"Gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })

    await transport.sendEmail({
        from: `"Your App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    })

    
}

export default sendEmail;