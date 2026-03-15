// Sebelum bisa mengontrol elemen di halaman, JavaScript perlu
// "memegang" elemen tersebut terlebih dahulu menggunakan
// document.getElementById() — fungsi bawaan browser yang mencari
// elemen berdasarkan id-nya di dalam HTML.
const editorElement = document.getElementById("editor-kecil");
// Mengambil elemen <textarea id="editor-kecil"> — kotak teks utama
// tempat pengguna mengetik. Semua operasi baca/tulis teks dilakukan lewat variabel ini.

const charCountElement = document.getElementById("hf");
// Mengambil elemen <span id="hf"> — tempat menampilkan angka TOTAL huruf.

const charLowerElement = document.getElementById("hk");
// Mengambil elemen <span id="hk"> — tempat menampilkan angka huruf kecil.

const charUpperElement = document.getElementById("hb");
// Mengambil elemen <span id="hb"> — tempat menampilkan angka huruf besar.

const btnBesar = document.getElementById("huruf-besar");
// Mengambil elemen <button id="huruf-besar"> — tombol "Besarkan".

const btnKecil = document.getElementById("huruf-kecil");
// Mengambil elemen <button id="huruf-kecil"> — tombol "Kecilkan".

const btnParagraf = document.getElementById("huruf-paragraf");
// Mengambil elemen <button id="huruf-paragraf"> — tombol "Paragrafkan".

btnBesar.addEventListener("click", () => {
  // addEventListener("click", ...) artinya: "Pantau tombol ini,
  // dan jalankan kode di dalam kurung kurawal setiap kali tombol diklik."

  const text = editorElement.value;
  // Membaca teks yang sedang ada di dalam textarea dan menyimpannya ke variabel "text".
  // .value digunakan untuk mengambil isi dari elemen input/textarea.

  editorElement.value = text.toUpperCase();
  // .toUpperCase() adalah fungsi bawaan JavaScript yang mengubah
  // semua huruf menjadi HURUF BESAR.
  // Hasilnya langsung ditulis kembali ke textarea menggantikan teks sebelumnya.
  // Contoh: "halo dunia" → "HALO DUNIA"
});

btnKecil.addEventListener("click", () => {
  const text = editorElement.value;
  // Sama seperti sebelumnya — membaca isi textarea.

  editorElement.value = text.toLowerCase();
  // .toLowerCase() adalah kebalikan dari .toUpperCase() —
  // mengubah semua huruf menjadi huruf kecil.
  // Contoh: "HALO DUNIA" → "halo dunia"
});

btnParagraf.addEventListener("click", () => {
  const text = editorElement.value;
  // Membaca isi textarea.

  const sentences = text.split(". ");
  // .split(". ") memotong teks menjadi array (daftar) kalimat-kalimat,
  // menggunakan ". " (titik + spasi) sebagai tanda pemisah.
  // Contoh: "halo dunia. apa kabar." → ["halo dunia", "apa kabar."]

  const formattedText = sentences
    .map((sentence) => {
      // .map() memproses setiap kalimat satu per satu.
      // Variabel "sentence" mewakili satu kalimat di setiap putaran.

      if (sentence.length > 0) {
        // Memastikan kalimat tidak kosong sebelum diproses,
        // agar tidak error saat mencoba mengakses karakter pertamanya.

        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        // sentence.charAt(0)  → mengambil karakter pertama kalimat
        // .toUpperCase()      → mengubah karakter pertama itu menjadi huruf besar
        // sentence.slice(1)   → mengambil sisa kalimat mulai dari karakter ke-2
        // Keduanya digabung dengan "+" menjadi kalimat yang sudah dikapitalkan.
        // Contoh: "halo dunia" → "H" + "alo dunia" → "Halo dunia"
      }

      return sentence;
      // Jika kalimat kosong, kembalikan apa adanya tanpa diubah.
    })
    .join(". ");
  // .join(". ") menyatukan kembali semua kalimat yang sudah diproses
  // dengan menambahkan ". " di antara mereka — kebalikan dari .split() tadi.
  // Contoh: ["Halo dunia", "Apa kabar."] → "Halo dunia. Apa kabar."

  editorElement.value = formattedText;
  // Menulis hasil teks yang sudah diformat kembali ke textarea.
});

function hitungHuruf(event) {
  // "event" adalah objek yang otomatis dikirim browser berisi informasi
  // tentang kejadian yang terjadi (dalam hal ini: pengguna mengetik).

  const text = event.target.value;
  // event.target → elemen yang memicu kejadian (textarea)
  // .value       → isi teks di dalam textarea tersebut

  const chr = text.split("");
  // .split("") memotong teks menjadi array karakter satu per satu.
  // Contoh: "Hi!" → ["H", "i", "!"]
  // Ini agar kita bisa memeriksa setiap karakter secara individual.

  let jmlHurufSejati = 0;
  let jmlHurufBesar = 0;
  let jmlHurufKecil = 0;
  // Tiga variabel penghitung, dimulai dari 0.
  // Akan bertambah setiap kali ditemukan karakter yang sesuai.
  // Menggunakan "let" karena nilainya akan berubah-ubah (bukan "const").

  const spasi = /\s+/;
  // Regex (Regular Expression) untuk mendeteksi karakter spasi/whitespace.
  // \s mencocokkan spasi, tab, enter, dll. Tanda "+" artinya satu atau lebih.
  // Spasi tidak dihitung sebagai huruf.

  const besar = /[A-Z]/;
  // Regex untuk mendeteksi huruf besar A sampai Z.
  // [A-Z] artinya karakter apapun dalam rentang A hingga Z.

  const kecil = /[a-z]/;
  // Regex untuk mendeteksi huruf kecil a sampai z.

  chr.forEach((char) => {
    // .forEach() mengulang setiap karakter dalam array "chr" satu per satu.
    // Variabel "char" mewakili satu karakter di setiap putaran.

    if (spasi.test(char)) {
      return;
      // .test(char) memeriksa apakah karakter cocok dengan pola regex.
      // Jika karakter adalah spasi/whitespace, hentikan putaran ini (return)
      // dan langsung lanjut ke karakter berikutnya — spasi tidak dihitung.
    }

    if (besar.test(char)) {
      jmlHurufBesar++;
      // Jika karakter adalah huruf besar, tambahkan penghitung huruf besar.
      // "++" adalah singkatan dari "tambah 1".
    }

    if (kecil.test(char)) {
      jmlHurufKecil++;
      // Jika karakter adalah huruf kecil, tambahkan penghitung huruf kecil.
    }

    jmlHurufSejati++;
    // Setiap karakter yang bukan spasi akan dihitung sebagai huruf sejati,
    // termasuk angka, tanda baca, simbol, dll.

    charLowerElement.textContent = jmlHurufKecil;
    charUpperElement.textContent = jmlHurufBesar;
    charCountElement.textContent = jmlHurufSejati;
    // .textContent digunakan untuk mengubah teks yang tampil di dalam elemen HTML.
    // Ketiga baris ini memperbarui angka di <span> pada halaman secara langsung
    // setiap kali ada perubahan karakter — sehingga angka selalu up-to-date.
  });
}

editorElement.addEventListener("input", (event) => {
  // Event "input" akan terpicu SETIAP KALI isi textarea berubah —
  // baik karena mengetik huruf baru, menghapus, maupun paste teks.
  // Berbeda dengan "keypress" yang hanya terpicu saat tombol keyboard ditekan.

  hitungHuruf(event);
  // Memanggil fungsi hitungHuruf() dan meneruskan objek "event" ke dalamnya,
  // agar fungsi tersebut bisa mengakses isi textarea terbaru lewat event.target.value.
});
