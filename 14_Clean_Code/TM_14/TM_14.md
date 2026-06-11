# Tugas Mandiri 14: Clean Code

**Nama**: Davis Arvaputra Dwiansyah  
**NIM**: 103122400034  
**Kelas**: SE-08-01  

## Pertanyaan

Dari dua kode di bawah ini, mana yang kamu ingin cari masalahnya dan perbaiki di tengah-tengah malam, katakanlah jam 1 malam? Mengapa?

### Kode Opsi 1:
```javascript
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        return doSomething(user)
      }
    }
  }
  return null
}
```

### Kode Opsi 2:
```javascript
function processUser(user) {
  if (!isValidCandidate(user)) return null;
  return doSomething(user);
}

function isValidCandidate(user) {
  return user && user.isActive && user.hasPermission;
}
```

---

## Jawaban

Untuk mencari masalah dan memperbaikinya di tengah malam (misalnya jam 1 malam ketika beban kognitif sangat tinggi), opsi yang lebih disukai adalah **Kode Opsi 2**. Berikut adalah alasan utamanya berdasarkan prinsip-prinsip kode bersih (Clean Code):

### 1. Penerapan Guard Clauses (Mencegah Pyramid of Doom)
- **Opsi 1** menggunakan pengkondisian bersarang (nested-if) yang berlapis-lapis. Semakin banyak tingkat bersarang, semakin tinggi pula beban mental yang dibutuhkan untuk melacak setiap kondisi kelayakan data.
- **Opsi 2** menggunakan teknik Guard Clauses (`if (!isValidCandidate(user)) return null;`). Skenario yang tidak valid langsung dieliminasi di baris pertama, sehingga logika utama di bawahnya berjalan pada tingkat kedalaman yang datar (flat). Ini secara signifikan mengurangi kompleksitas alur pembacaan kode.

### 2. Keterbacaan yang Deklaratif (Separation of Concerns)
- Pada **Opsi 2**, aturan kelayakan pengguna dipindahkan ke fungsi pembantu khusus yang diberi nama deskriptif: `isValidCandidate(user)`.
- Nama fungsi tersebut secara instan menjelaskan maksud bisnis dari kode tanpa memaksa pembaca menganalisis rangkaian operator logika di tingkat fungsi pemrosesan utama.

### 3. Kemudahan Debugging dan Isolasi Pengujian (Testability)
- Jika terjadi kesalahan dalam penentuan validitas pengguna, masalah tersebut terisolasi sepenuhnya di dalam fungsi `isValidCandidate`. Kita tidak perlu khawatir bahwa perubahan aturan validasi akan merusak alur kontrol fungsi utama `processUser`.
- Pengujian unit (unit testing) juga jauh lebih mudah dilakukan secara terpisah terhadap fungsi evaluasi boolean tersebut.
