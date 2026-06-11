# Tugas Pendahuluan 14: Clean Code

  **Nama** : Davis Arvaputra Dwiansyah  
  **NIM** : 103122400034  
  **Kelas** : SE-08-01  

## Tugas

Kode ini tampak baik dan bagus, tetapi menyalahi beberapa prinsip kode bersih. Bisakah kamu melakukan refaktorisasi? Dimodifikasi dari amrrwael/Delivery-website-Hits.

```
function fetchOrderDetails(orderId, token) {
    fetch(`https://example.com/api/order/${orderId}`, {
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch order details');
        }
        return response.json();
    })
    .then(order => {
        // Display order info
        const modal = document.getElementById('orderModal');
        const detailsDiv = modal.querySelector('#orderDetails');
        detailsDiv.innerHTML = '';

        const header = document.createElement('h3');
        header.textContent = `Order ID: ${order.id}`;
        detailsDiv.appendChild(header);

        const status = document.createElement('p');
        status.textContent = `Status: ${order.status}`;
        detailsDiv.appendChild(status);

        // Show modal
        modal.style.display = 'block';

        // Setup close button
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Setup confirm button
        const confirmBtn = modal.querySelector('#confirmOrderBtn');
        if (order.status === 'Delivered') {
            confirmBtn.style.display = 'none';
        } else {
            confirmBtn.addEventListener('click', () => {
                confirmOrder(order.id, token);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
```

## Jawaban

### 1. Sistem/Fungsi yang Menyimpan/Mengonfirmasi Pesanan
Ketika tombol konfirmasi diklik pada modal rincian pesanan, fungsi yang menangani penyimpanan status konfirmasi tersebut ke server/sistem adalah **`confirmOrder(orderId, token)`**. Fungsi ini mengirimkan request `POST` ke endpoint API `/api/order/${orderId}/status`.

### 2. Analisis Pelanggaran Clean Code pada Fungsi Awal
Fungsi `fetchOrderDetails` semula melanggar beberapa prinsip kode bersih (*Clean Code*):
*   **Single Responsibility Principle (SRP)**: Fungsi tersebut memiliki terlalu banyak tanggung jawab: melakukan pengambilan data (*fetching*), memanipulasi DOM untuk membangun antarmuka pengguna, dan menangani event (*event listeners*).
*   **Deep Nesting / Callback Hell**: Logika pembuatan elemen UI berada jauh di dalam blok penanganan janji (`.then`), sehingga menyulitkan pembacaan dan pemeliharaan kode.
*   **Hardcoded API URL**: URL API ditulis langsung (*hardcoded*) di dalam fungsi, mengurangi fleksibilitas dan reusabilitas.

### 3. Kode Hasil Refaktorisasi (Clean Code)
Untuk memperbaikinya, fungsi tersebut dipecah menjadi fungsi-fungsi kecil yang lebih modular dan terfokus:

```javascript
// 1. Fungsi Utama: Mengambil detail pesanan dan membuka modal
function fetchOrderDetails(orderId, token) {
    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    fetch(`https://food-delivery.int.kreosoft.space/api/order/${orderId}`, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch order details');
        }
        return response.json();
    })
    .then(order => {
        const modal = document.getElementById('orderModal');
        const modalContent = modal.querySelector('.modal-content');
        const orderDetailsDiv = modalContent.querySelector('#orderDetails');
        const confirmButton = modalContent.querySelector('#confirmOrderBtn');

        // Bersihkan konten modal sebelumnya
        orderDetailsDiv.innerHTML = '';

        // Bangun konten modal
        buildModalContent(order, orderDetailsDiv);

        // Pasang event listener
        setupModalEvents(modal, modalContent, confirmButton, order, token);

        // Tampilkan modal
        modal.style.display = 'block';
    })
    .catch(error => {
        console.error('Error fetching order details:', error);
    });
}

// 2. Helper: Membuat elemen HTML konten modal (Single Responsibility)
function buildModalContent(order, container) {
    const header = document.createElement('h3');
    header.textContent = `Order ID: ${order.id}`;
    container.appendChild(header);

    const details = document.createElement('div');
    details.classList.add('additional-details');
    details.innerHTML = `
        <p>Delivery Time: <strong>${order.deliveryTime}</strong></p>
        <p>Order Time: <strong>${order.orderTime}</strong></p>
        <p class="order-status">Status: <strong>${order.status}</strong></p>
    `;
    container.appendChild(details);

    order.dishes.forEach(dish => {
        const dishElement = buildDishElement(dish);
        container.appendChild(dishElement);
    });

    const total = document.createElement('p');
    total.textContent = `Total Price: ${order.price} EGP`;
    total.classList.add('total-price');
    container.appendChild(total);
}

// 3. Helper: Membuat elemen hidangan secara dinamis
function buildDishElement(dish) {
    const dishContainer = document.createElement('div');
    dishContainer.classList.add('dish-container');

    const image = document.createElement('img');
    image.src = dish.image;
    image.alt = dish.name;
    image.classList.add('dish-image');
    dishContainer.appendChild(image);

    const info = document.createElement('div');
    info.classList.add('dish-info');

    const name = document.createElement('p');
    name.textContent = dish.name;
    name.classList.add('dish-name');
    info.appendChild(name);

    const price = document.createElement('p');
    price.innerHTML = `Price: <strong>${dish.price}</strong> EGP/Dish`;
    price.classList.add('dish-price');
    info.appendChild(price);

    const amount = document.createElement('p');
    amount.textContent = `Amount: ${dish.amount}`;
    info.appendChild(amount);

    const total = document.createElement('p');
    total.textContent = `Price: ${dish.totalPrice}`;
    info.appendChild(total);

    dishContainer.appendChild(info);
    return dishContainer;
}

// 4. Helper: Mengatur Event Listener untuk tombol Tutup dan Konfirmasi
function setupModalEvents(modal, modalContent, confirmButton, order, token) {
    const closeButton = modalContent.querySelector('.close');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    if (order.status === 'Delivered') {
        confirmButton.style.display = 'none';
    } else {
        confirmButton.style.display = 'block';
        confirmButton.addEventListener('click', () => {
            confirmOrder(order.id, token);
        });
    }
}

// 5. Fungsi Konfirmasi Pesanan (Berinteraksi dengan API)
function confirmOrder(orderId, token) {
    const requestOptions = {
        method: 'POST' ,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    fetch(`https://food-delivery.int.kreosoft.space/api/order/${orderId}/status`, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to confirm order');
        }
        console.log('Order status updated successfully.');
        location.reload();
    })
    .catch(error => {
        console.log('Error confirming order:', error);
    });
}
```
