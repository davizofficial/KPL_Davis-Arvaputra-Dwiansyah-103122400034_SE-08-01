# Tugas Mandiri 13: Design Pattern Implementation

  **Nama** : Davis Arvaputra Dwiansyah  
  **NIM** : 103122400034  
  **Kelas** : SE-08-01  

## Tugas

Jelaskan dengan kemampuanmu apa itu event delegation dalam design pattern JavaScript. Tidak ada batas bobot kata dalam menjawab tugas ini, tetapi penilaian akan bergantung dari sepaham apa dan sebagus apa kamu menyajikan jawabanmu.

## Jawaban 

Event delegation adalah teknik dalam JavaScript yang memanfaatkan mekanisme propagasi event (khususnya event bubbling) untuk menangani event dari banyak elemen melalui satu event listener yang ditempatkan pada elemen induknya (parent element). Dengan cara ini, kita tidak perlu memasang event listener pada setiap elemen anak secara terpisah. Ketika sebuah event terjadi pada elemen anak, event tersebut akan "naik" ke elemen induk sehingga induk dapat mendeteksi dan menangani event tersebut.

Konsep ini bekerja karena hampir semua event di JavaScript memiliki proses yang disebut bubbling. Misalnya, ketika pengguna mengklik sebuah tombol yang berada di dalam sebuah <div>, event klik pertama kali terjadi pada tombol tersebut, kemudian diteruskan ke elemen induknya, lalu ke induk berikutnya hingga mencapai objek document. Event delegation memanfaatkan alur ini dengan menempatkan event listener pada elemen yang lebih tinggi dalam struktur DOM dan menentukan elemen mana yang sebenarnya memicu event menggunakan properti seperti event.target.

Tujuan utama event delegation adalah meningkatkan efisiensi pengelolaan event pada aplikasi web. Jika sebuah halaman memiliki ratusan atau bahkan ribuan elemen yang memerlukan perilaku yang sama, memasang event listener pada setiap elemen akan mengonsumsi lebih banyak memori dan membuat kode menjadi lebih sulit dikelola. Dengan event delegation, cukup satu event listener pada elemen induk untuk menangani seluruh elemen anak yang relevan.

Sebagai contoh, bayangkan sebuah daftar tugas (to-do list) yang berisi banyak item. Jika setiap item daftar memiliki tombol hapus, pendekatan biasa adalah menambahkan event listener ke setiap tombol. Namun, dengan event delegation, event listener cukup ditempatkan pada elemen daftar (<ul>), lalu ketika terjadi klik, program memeriksa apakah target yang diklik adalah tombol hapus. Jika benar, maka tindakan penghapusan dapat dilakukan. Pendekatan ini membuat kode lebih ringkas dan mudah dipelihara.

Keunggulan lain dari event delegation adalah kemampuannya menangani elemen yang ditambahkan secara dinamis setelah halaman dimuat. Pada aplikasi modern, elemen sering dibuat menggunakan JavaScript tanpa melakukan reload halaman. Jika event listener dipasang langsung pada elemen yang ada saat halaman pertama kali dimuat, elemen baru tidak akan memiliki event listener tersebut. Dengan event delegation, elemen baru tetap dapat merespons event karena event listener berada pada elemen induk yang sudah ada sebelumnya.

Dari sudut pandang design pattern, event delegation dapat dianggap sebagai pola yang memusatkan pengelolaan interaksi pengguna pada satu titik kontrol. Pola ini mengurangi duplikasi kode, meningkatkan skalabilitas aplikasi, dan mempermudah proses pemeliharaan karena logika penanganan event tidak tersebar di banyak elemen. Oleh karena itu, event delegation sering digunakan dalam pengembangan antarmuka pengguna yang kompleks, terutama pada aplikasi berbasis DOM yang memiliki banyak elemen interaktif.

Meskipun memiliki banyak keuntungan, event delegation juga memiliki keterbatasan. Tidak semua event mendukung mekanisme bubbling. Beberapa event seperti focus dan blur secara default tidak melakukan bubbling sehingga memerlukan pendekatan khusus. Selain itu, ketika struktur DOM sangat kompleks, pengembang perlu berhati-hati dalam menentukan elemen target agar event yang ditangani benar-benar berasal dari elemen yang diinginkan.

Secara keseluruhan, event delegation adalah teknik yang memanfaatkan sifat bubbling pada sistem event JavaScript untuk menangani banyak elemen melalui satu event listener pada elemen induk. Teknik ini membuat aplikasi lebih efisien, hemat memori, mudah dikembangkan, dan sangat cocok digunakan pada halaman web yang memiliki banyak elemen dinamis. Karena manfaat tersebut, event delegation menjadi salah satu praktik penting yang sering diterapkan dalam pengembangan JavaScript modern.
