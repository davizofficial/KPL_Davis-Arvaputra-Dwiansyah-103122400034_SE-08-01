# Tugas Pendahuluan 06: 


  **Nama** : Davis Arvaputra Dwiansyah  
  **NIM** : 103122400034  
  **Kelas** : SE-08-01  
  

**Soal**

Diberikan dua kode yang sama-sama melakukan operasi pembagian. Pertama menggunakan asersi, kedua menggunakan eksepsi.

```
const assert = require('assert');

function divide(a, b) {
  assert(typeof a === 'number' && typeof b === 'number', 'Nilai harus bilangan bulat');

  assert(b !== 0, 'Tidak bisa pembagian dengan nol');

  return a / b;
}
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Nilai harus bilangan bulat");
  }

  if (b === 0) {
    throw new Error("Tidak bisa pembagian dengan nol");
  }

  return a / b;
}

try {
  const result = divide(10, 2);
  console.log("Hasilnya adalah:", result);
} catch (error) {
  console.error("Error:", error);
}
```


Menurutmu, kapankah kita saatnya menggunakan asersi atau eksepsi untuk fungsi seperti ini di atas? Apakah kita harus sepenuhnya asersi, atau sepenuhnya eksepsi? Lakukan riset dan berikan jawabannya dalam bentuk esai minimal 300 kata.


**Jawaban**

Menurutku, untuk fungsi kayak `divide(a, b)`, kita **nggak perlu milih salah satu secara mutlak**. Jadi bukan “harus full asersi” dan bukan juga “harus full eksepsi”. Yang lebih masuk akal justru **pakai dua-duanya, tapi beda peran**.

Asersi cocok dipakai waktu kita lagi ngecek hal-hal yang secara logika **harusnya selalu benar** kalau program kita ditulis dengan benar. Node.js sendiri menjelaskan kalau modul `assert` dipakai buat **verifying invariants**, alias memverifikasi kondisi internal yang seharusnya tidak pernah gagal kecuali ada bug di kode kita. Jadi, kalau `assert` gagal, biasanya itu sinyal buat developer: “ada yang salah di logika program”, bukan “user masukin input aneh”. ([Node.js][1])

Sementara itu, eksepsi (`throw`) lebih pas buat kondisi yang memang **realistis terjadi saat fungsi dipakai orang lain**. MDN menjelaskan bahwa `throw` akan menghentikan eksekusi fungsi saat itu juga, lalu error-nya bisa ditangkap oleh `catch` di atasnya. Mekanisme ini memang dibuat untuk penanganan error yang perlu diketahui dan direspons oleh pemanggil fungsi. ([MDN Web Docs][2])

Kalau dilihat dari contoh `divide(a, b)`, ada dua validasi utama. Pertama, `a` dan `b` harus angka. Ini jelas lebih cocok jadi `TypeError`, karena MDN mendefinisikan `TypeError` sebagai error ketika argumen atau operand tidak sesuai dengan tipe yang diharapkan. ([MDN Web Docs][3]) Kedua, `b` tidak boleh nol. Nah, ini bisa dilempar sebagai `Error` biasa, tapi kalau mau lebih rapi juga bisa pakai `RangeError`, karena MDN menjelaskan `RangeError` dipakai saat nilai berada di luar himpunan atau rentang nilai yang diizinkan. ([MDN Web Docs][4])

Makanya, buat fungsi yang sifatnya dipanggil dari luar—entah oleh user input, API request, atau modul lain—aku lebih condong bilang: **validasi argumen pakai eksepsi**. Soalnya itu bagian dari “kontrak” fungsi. Kalau caller ngirim nilai salah, fungsi harus kasih respons yang jelas dan bisa ditangani. Misalnya:

```js
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("a dan b harus berupa number");
  }

  if (b === 0) {
    throw new RangeError("b tidak boleh 0");
  }

  return a / b;
}
```

Lalu asersi dipakai kapan? Menurutku asersi enak dipakai **di dalam implementasi**, buat ngecek asumsi internal. Misalnya sesudah beberapa proses rumit, kita pengin memastikan hasilnya tetap finite, atau ada state tertentu yang wajib terpenuhi. Jadi asersi itu lebih mirip alarm internal buat developer.

Intinya, kalau pertanyaannya “harus sepenuhnya asersi atau sepenuhnya eksepsi?”, jawabanku: **nggak usah ekstrem**. Untuk fungsi seperti ini, **eksepsi jadi alat utama buat validasi input**, sedangkan **asersi dipakai secukupnya buat ngecek logika internal**. Dengan cara itu, kode jadi lebih enak dipakai, lebih jelas maknanya, dan juga lebih gampang di-debug. Menurutku itu pendekatan yang paling waras: bukan milih kubu, tapi pakai alat yang tepat untuk masalah yang tepat.
