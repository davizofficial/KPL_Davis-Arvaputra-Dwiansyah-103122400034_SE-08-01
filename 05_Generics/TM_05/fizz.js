/**
 * Mengembalikan "Fizz" jika nilai habis dibagi 3, "Buzz" jika habis dibagi 5,
 * "FizzBuzz" jika habis dibagi 3 dan 5, atau angka itu sendiri jika tidak memenuhi.
 *
 * @param {number} value Bilangan bulat yang akan diperiksa.
 * @returns {number | string} Hasil konversi FizzBuzz atau nilai aslinya.
 * @throws {TypeError} Jika value bukan bilangan bulat.
 */
function zzzzOrNum(value) {
  if (!Number.isInteger(value)) {
    throw new TypeError("value harus berupa bilangan bulat");
  }

  if (value % 15 === 0) {
    return "FizzBuzz";
  }

  if (value % 3 === 0) {
    return "Fizz";
  }

  if (value % 5 === 0) {
    return "Buzz";
  }

  return value;
}

/**
 * Menerima larik bilangan bulat dan mengembalikan larik baru
 * berisi hasil konversi setiap elemen dengan aturan FizzBuzz.
 *
 * @param {number[]} sequence Larik yang semua elemennya harus bilangan bulat.
 * @returns {(number | string)[]} Larik hasil konversi FizzBuzz.
 * @throws {TypeError} Jika sequence bukan array atau ada elemen yang bukan bilangan bulat.
 */
function fizzBuzz(sequence) {
  if (!Array.isArray(sequence)) {
    throw new TypeError("sequence harus berupa array");
  }

  sequence.forEach((value) => {
    if (!Number.isInteger(value)) {
      throw new TypeError("semua elemen sequence harus bilangan bulat");
    }
  });

  const newSequence = sequence.map((e) => zzzzOrNum(e));

  return newSequence;
}

module.exports = {
  fizzBuzz: fizzBuzz,
  zzzzOrNum: zzzzOrNum,
};
