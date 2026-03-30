function hitung(str, tipe) {
  let count = 0;

  for (const c of str) {
    if (tipe === "semua" || (tipe === "huruf" && c !== " ")) {
      count++;
    }
  }

  return count;
}

// testing
const str = "Bar bar bar";

console.log(hitung(str, "semua")); // 11
console.log(hitung(str, "huruf")); // 9
