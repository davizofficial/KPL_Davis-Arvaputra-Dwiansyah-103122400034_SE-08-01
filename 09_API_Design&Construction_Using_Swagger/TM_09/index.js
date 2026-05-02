const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

app.use(express.json());

function generateStableNumber(nama) {
  // Hash nama, case-sensitive
  const hash = crypto.createHash("md5").update(nama).digest("hex");

  // Ambil 8 karakter awal, ubah ke angka
  const number = parseInt(hash.substring(0, 8), 16);

  // Ubah ke range 1-100
  return (number % 100) + 1;
}

app.post("/", (req, res) => {
  const { nama, tebakan } = req.body;

  if (typeof nama !== "string" || nama.trim() === "") {
    return res.status(400).json({
      jawaban: "Field 'nama' wajib diisi dan harus berupa string.",
    });
  }

  if (!Number.isInteger(tebakan) || tebakan < 1 || tebakan > 100) {
    return res.status(400).json({
      jawaban: "Field 'tebakan' wajib berupa integer antara 1 sampai 100.",
    });
  }

  const angkaRahasia = generateStableNumber(nama);

  if (tebakan === angkaRahasia) {
    return res.json({
      jawaban: `Benar sekali! Tebakanmu adalah ${angkaRahasia}.`,
    });
  }

  if (tebakan > angkaRahasia) {
    return res.json({
      jawaban: "Tebakanmu terlalu tinggi!",
    });
  }

  return res.json({
    jawaban: "Tebakanmu terlalu rendah!",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
