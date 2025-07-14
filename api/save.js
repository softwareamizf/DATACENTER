import { Client } from "pg";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: parseInt(process.env.DB_PORT, 10),
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();
      await client.query("INSERT INTO simulacro_logins(email, password) VALUES($1, $2)", [email, password]);
      await client.end();
      res.status(200).json({ message: "Guardado correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error guardando los datos" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
