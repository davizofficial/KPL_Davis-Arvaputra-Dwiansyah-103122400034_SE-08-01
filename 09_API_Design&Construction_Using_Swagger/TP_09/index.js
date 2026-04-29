const express = require("express");
const app = express();
const PORT = 3000;

const { specs, swaggerUi } = require("./swagger.js");

// Swagger endpoint
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Data menu
const menuData = {
  naspad: {
    "naspad padang telor": 25000,
    "naspad padang rendang": 28000,
    "naspad padang ayam + telur": 35000,
  },
  nasgor: {
    "nasgor goreng biasa": 15000,
    "nasgor goreng spesial": 20000,
    "nasgor goreng komplit": 25000,
  },
};

// Endpoint utama
app.get("/", (req, res) => {
  res.json({
    pesan: "Cek /docs untuk melihat rincian API",
  });
});

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Menampilkan semua kategori menu
 *     responses:
 *       200:
 *         description: Berhasil menampilkan daftar kategori menu
 */
app.get("/menu", (req, res) => {
  const categories = Object.keys(menuData);
  res.status(200).json(categories);
});

/**
 * @swagger
 * /menu/{category}:
 *   get:
 *     summary: Menampilkan menu berdasarkan kategori
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: "Nama kategori menu (contoh: naspad, nasgor)"
 *     responses:
 *       200:
 *         description: Menu berhasil ditampilkan
 *       404:
 *         description: Menu tidak ditemukan
 */
app.get("/menu/:category", (req, res) => {
  const category = req.params.category;
  const menu = menuData[category];

  if (menu) {
    res.json(menu);
  } else {
    res.status(404).json({ error: "Menu tidak ditemukan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
