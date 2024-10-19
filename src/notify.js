const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendNotifications = async (projects, categoryTitle) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let htmlContent = `<h1>${categoryTitle}</h1><ul>`;
    projects.forEach((project) => {
        htmlContent += `
            <li>
                <h2>${project.title}</h2>
                <p>${project.summary}</p>
                <img src="${project.image}" alt="${project.title}" style="max-width:200px;"/>
                <p><a href="${project.link}" target="_blank">Voir le projet</a></p>
            </li>
        `;
    });
    htmlContent += "</ul>";

    const recipients = process.env.EMAIL_RECIPIENTS.split(",");
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipients,
        subject: `${categoryTitle} - Nouveaux Projets Gamefound Disponibles`,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email envoyé avec succès.");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
    }
};

module.exports = { sendNotifications };
