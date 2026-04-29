require("dotenv").config({ quiet: true });

const axios = require("axios");

// SIMULASI API
async function getData() {
  if (process.env.BASE_API === "local") {
    return require("./data.json"); // buat ambil dari file json local beserta datanya
  } else {
    const res = await axios.get(process.env.BASE_API);
    return res.data;
  }
}

async function getKurs(rupiah) {
  const data = await getData();

  const rateCNH = data.idr.cnh;
  const rateEUR = data.idr.eur;

  const hasilCNH = rupiah * rateCNH;
  const hasilEUR = rupiah * rateEUR;

  const formatRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(rupiah);

  const formatCNH = new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(hasilCNH);

  const formatEUR = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(hasilEUR);

  const tanggal = new Date(data.date);
  const formatTanggal = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(tanggal);

  console.log(
    `Kurs ${formatRupiah} pada ${formatTanggal} adalah CNH ${formatCNH} dan ${formatEUR}`
  );
}

// buat test dgn 25000 rupiah
getKurs(25000);
