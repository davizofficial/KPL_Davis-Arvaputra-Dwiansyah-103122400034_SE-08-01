/**
 * persamaan linear satu variabel dan dua suku
 * @param {string} x
 * @param {number} a
 */
export function plsv_dua(x, a) {
  // 3x = 12
  const coeff = parseInt(x);
  const hasil = a / coeff;

  return {
    x: x,
    dengan: "=",
    hasil,
  };
}

/**
 * persamaan linear satu variabel dan tiga suku
 * @param {string} x
 * @param {number} a
 * @param {number} b
 */
export function plsv_tiga(x, a, b) {
  // y - 8 = 10
  let hasil = 0;

  if (x.length === 1) {
    hasil = b - a;
  } else if (x.length >= 2) {
    const coeff = parseInt(x);
    hasil = (b - a) / coeff;
  }

  return {
    x: x,
    dengan: "=",
    hasil,
  };
}

/**
 * pertidaksamaan linear satu variabel
 * @param {string} x
 * @param {number} a
 * @param {string} op
 * @param {number} b
 */
export function ptlsv_dua(x, a, op, b) {
  let hasil = 0;
  let coeff = 1;

  const balikkan_op = {
    ">": "<",
    "<": ">",
    ">=": "<=",
    "<=": ">=",
  };

  if (x.length === 1) {
    hasil = b - a;
  } else if (x.length >= 2) {
    coeff = parseInt(x);
    hasil = (b - a) / coeff;
  }

  const op_baru = coeff <= -1 ? balikkan_op[op] : op;

  return {
    x: x,
    dengan: op_baru,
    hasil,
  };
}
