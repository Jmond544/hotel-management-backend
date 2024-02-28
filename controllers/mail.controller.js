import nodemailer from 'nodemailer';

const enviarMail = async() => {
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'hoteldolphin30@gmail.com',
            pass: 'B^sk7g99dD3ixIBA',
        }
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hoteldolphin30@gmail.com',
            pass: 'B^sk7g99dD3ixIBA',
        },
    });

    let mailOptions = {
        from: 'hoteldolphin30@gmail.com',
        to: 'jmondalgotapia@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

