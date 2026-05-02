export function hitungHuruf(teks) {
  const huruf = teks.match(/[A-Za-z]/g);
  return huruf ? huruf.length : 0;
}

export function hitungKata(teks) {
  const kata = teks.trim().match(/\b[A-Za-z]+\b/g);
  return kata ? kata.length : 0;
}
