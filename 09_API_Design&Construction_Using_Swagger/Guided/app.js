import express from "express";
import { specs, swaggerUi } from "./swagger.js";

const app = express();

// Middleware
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home API
 *     responses:
 *       200:
 *         description: Server is running
 */

// Route
app.get("/", (req, res) => {
  return res.status(200).send("Daviz Ganteng Banget");
});

// Config
const PORT = process.env.PORT || 8000;
const HOSTNAME = "localhost";

const dataFilm = [];

/**
 * @swagger
 * /film:
 *   get:
 *     summary: Ambil semua data film
 *     responses:
 *       200:
 *         description: Berhasil mengambil data film
 */
app.get("/film", (req, res) => {
  return res.status(200).json(dataFilm);
});

/**
 * @swagger
 * /film:
 *   post:
 *     summary: Tambah data film baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Film berhasil ditambahkan
 */
app.post("/film", (req, res) => {
  const filmBaru = {
    id: dataFilm.length + 1,
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year,
  };

  dataFilm.push(filmBaru);
  return res.status(201).json(filmBaru);
});

// Start server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
