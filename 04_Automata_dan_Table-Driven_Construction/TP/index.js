const editorElement = document.getElementById("editor-kecil");
const charCountElement = document.getElementById("hf");
const charLowerElement = document.getElementById("hk");
const charUpperElement = document.getElementById("hb");
const btnBesar = document.getElementById("huruf-besar");
const btnKecil = document.getElementById("huruf-kecil");

btnBesar.addEventListener("click", () => {
  const text = editorElement.value;
  editorElement.value = text.toUpperCase();
});

btnKecil.addEventListener("click", () => {
  const text = editorElement.value;
  editorElement.value = text.toLowerCase();
});

function hitungHuruf(event) {
  const text = event.target.value;
  const chr = text.split("");

  let jmlHurufSejati = 0;
  let jmlHurufBesar = 0;
  let jmlHurufKecil = 0;

  const spasi = /\s+/;
  const besar = /[A-Z]/;
  const kecil = /[a-z]/;

  chr.forEach((char) => {
    if (spasi.test(char)) {
      return;
    }

    if (besar.test(char)) {
      jmlHurufBesar++;
    }

    if (kecil.test(char)) {
      jmlHurufKecil++;
    }

    jmlHurufSejati++;

    charLowerElement.textContent = jmlHurufKecil;
    charUpperElement.textContent = jmlHurufBesar;
    charCountElement.textContent = jmlHurufSejati;
  });
}

editorElement.addEventListener("input", (event) => {
  hitungHuruf(event);
});

const btnModeTerang = document.getElementById("light-mode");
const btnModeGelap = document.getElementById("dark-mode");

btnModeGelap.addEventListener("click", () => {
  document.body.classList.add("dark-mode");
});

btnModeTerang.addEventListener("click", () => {
  document.body.classList.remove("dark-mode");
});
