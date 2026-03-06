/*tuliskan sebuah fungsi yang menerima N bilangan dan 
mengembalikan nilai penjumlahan dari 1 sampai n */

/*contoh: Inpan 1 berarti menghasilkan output 1.
Inputan 2 berarti menghasilkan output 3.
Inputan 5 berarti menghasilkan output 15.
Inputan 50 berarti menghasilkan output 1275*/

function penjumlahan(n) {
    let sum = 0; //kenapa 0, karena kita bakalan ngejumlahin angka yang kita  mulai dari 0
    for (let i = 1; i <= n; i++) { // terus disini i itu kita dimulai dari 1, karena kita ingin menjumlahkan dari 1 sampai n, jadi kita mulai dengan 1, dan terus sampai n, jadi i <= n, dan setiap kali i bertambah 1, jadi i++
        sum += i; // ini kita bakalan ngejumlahin si i dari 1 sampai n, jadi setiap kali i bertambah
    }       
    return sum; // nah disini harus di return karena kita bakalan ngembaliin nilai penjumlahan dari 1 sampai n, jadi kita return sum yang sudah kita hitung tadi
}

console.log(penjumlahan(1));
console.log(penjumlahan(2));
console.log(penjumlahan(5));
console.log(penjumlahan(50));