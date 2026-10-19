const menu = [
    { id: 1,
         nama: "Soto Ayam",
          harga: 12000, gambar: "🍛" 
    },
    { id: 2,
         nama: "Mie Kuah",
          harga: 10000, gambar: "🍜" 
    },
    { id: 4,
         nama: "Jeruk Segar",
          harga: 6000, gambar: "🍊" 
    },
    { id: 5,
         nama: "Susu Uht Dingin",
          harga: 5000, gambar: "🥛" 
    },
    { id: 6,
         nama: "Banana",
          harga: 4000, gambar: "🍌" 
    }
];

let keranjang = [];

function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function hitungTotalHarga() {
    return keranjang.reduce(
        (total, item) => total + item.harga * item.jumlah,
        0
    );
}

function tampilkanMenu() {
    const daftarMenu = document.getElementById("daftar-menu");

    daftarMenu.innerHTML = menu.map(item => `
        <article class="kartu">
            <div class="gambar-menu" aria-hidden="true">${item.gambar}</div>
            <p class="label-menu">Menu kantin</p>
            <h3>${item.nama}</h3>
            <div class="info-menu">
                <p class="harga">${rupiah(item.harga)}</p>
                <button class="tombol" onclick="tambahKeranjang(${item.id})">
                    + Tambah
                </button>
            </div>
        </article>
    `).join("");
}

function tampilkanKeranjang() {
    const isiKeranjang = document.getElementById("isi-keranjang");
    const jumlah = document.getElementById("jumlah");
    const totalElement = document.getElementById("total");

    if (keranjang.length === 0) {
        isiKeranjang.innerHTML = `
            <div class="keranjang-kosong">
                <span aria-hidden="true">🛍️</span>
                <p>Keranjang masih kosong.</p>
                <small>Yuk, Beli Makanan Mu!</small>
            </div>
        `;
    } else {
        isiKeranjang.innerHTML = keranjang.map(item => `
            <div class="item-keranjang">
                <div class="detail-item">
                    <span class="ikon-item" aria-hidden="true">${item.gambar}</span>
                    <div>
                        <strong>${item.nama}</strong>
                        <p>${rupiah(item.harga)} per item</p>
                    </div>
                </div>

                <div class="aksi-item">
                    <div class="pengatur-jumlah">
                        <button
                            aria-label="Kurangi ${item.nama}"
                            onclick="ubahJumlah(${item.id}, -1)"
                        >-</button>
                        <span>${item.jumlah}</span>
                        <button
                            aria-label="Tambah ${item.nama}"
                            onclick="ubahJumlah(${item.id}, 1)"
                        >+</button>
                    </div>
                    <button
                        class="tombol-hapus"
                        onclick="hapusItem(${item.id})"
                    >Hapus</button>
                </div>
            </div>
        `).join("");
    }

    const totalJumlah = keranjang.reduce((total, item) => total + item.jumlah, 0);

    jumlah.textContent = totalJumlah;
    totalElement.textContent = rupiah(hitungTotalHarga());
}

function tambahKeranjang(id) {
    const item = keranjang.find(barang => barang.id === id);

    if (item) {
        item.jumlah++;
    } else {
        const barang = menu.find(item => item.id === id);

        keranjang.push({
            ...barang,
            jumlah: 1
        });
    }

    tampilkanKeranjang();
}

function ubahJumlah(id, perubahan) {
    const item = keranjang.find(barang => barang.id === id);

    if (!item) return;

    item.jumlah += perubahan;

    if (item.jumlah <= 0) {
        hapusItem(id);
    } else {
        tampilkanKeranjang();
    }
}

function hapusItem(id) {
    keranjang = keranjang.filter(item => item.id !== id);
    tampilkanKeranjang();
}

function checkout() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    alert(
        "Pesanan berhasil dibuat!\n" +
        "Total pembayaran: " + rupiah(hitungTotalHarga()) +
        "\nSilakan lakukan pembayaran di kantin."
    );

    keranjang = [];
    tampilkanKeranjang();
}

tampilkanMenu();
tampilkanKeranjang();