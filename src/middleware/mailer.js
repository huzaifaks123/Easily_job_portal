// import nodemailer module to work with mailing
import nodemailer from 'nodemailer'

// create midddleware to send mail taking applicant's email
const sendMail = (req, res, next ) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codingninjas2k16@gmail.com',
            pass: 'slwvvlczduktvhdj'
        }
    })

    const mailOptions = {
        from : 'codingninjas2k16@gmail.com',
        to : req.body.email,
        subject : "Contratulations!! Job Applied Successfully",
        text: `Hello ${req.body.name}, \n\n This email is to confirm that your job application has been received successfully. Thank you for applying , we will reach you soon!`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log("Email Sent", info.response);
        }
    })

    next()
}

// export sendmail middleware
export default sendMail