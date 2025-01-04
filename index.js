const sgMail = require("@sendgrid/mail");
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el formulario
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben completarse" });
  }

  const msg = {
    to: "mango.itech@gmail.com",
    from: "em2642@mangoit.com.ar",
    subject: `Nuevo mensaje de: ${name} - ${subject || "Sin asunto"}`,
    text: `Mensaje:\n${message}\n\nDe: ${name} (${email})`,
    html: `<p>Mensaje:</p><p>${message}</p><p>De: ${name} (${email})</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: "Correo enviado exitosamente." });
  } catch (error) {
    console.error("Error completo al enviar el correo:", error.response?.body || error);
    res.status(500).json({ error: "Error al enviar el correo. Inténtalo nuevamente más tarde." });
  }
});

// Ruta para la raíz del servidor
app.get("/", (req, res) => {
  res.send("Servidor funcionando. Usa /send-email para enviar datos.");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});