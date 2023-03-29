const nodemailer = require('nodemailer')

async function main(email, username) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.ADMIN_EMAIL,
            pass: process.env.PASSWORD_EMAIl,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.SECRET_ID,
            refreshToken: process.env.REFRESH_TOKEN
        }
    })

    let mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: 'Hola 😁',
        html: `<h1>Bienvenido ${username || 'Pepe'} a la mejor Librería 🎉</h1>`
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.error(err.message)
        } else {
            console.log('Email sent successfully')
        }
    })
}

module.exports = main