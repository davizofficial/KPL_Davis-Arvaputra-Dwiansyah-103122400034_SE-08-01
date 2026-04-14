function divide(a, b) {
  // Prakondisi
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Tipe data harus number");
  }

  if (b === 0) {
    throw new Error("b tidak boleh nol");
  }

  const hasil = a / b;

  // Pascakondisi
  if (hasil * b !== a) {
    throw new Error("Hasil tidak valid");
  }

  return hasil;
}

try {
  console.log(divide(10, 0));
} catch (error) {
  console.error(error.message);
}
