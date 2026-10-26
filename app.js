/* ====== DATA PRODUK ======
   Struct dalam C++:
     struct Katalog {
       string  sku;
       string  nama;
       string  merek;
       string  kategori;
       int     harga;
       int     stok;
       float   rating;
       string  ilustrasi;
     };
   Di JavaScript tidak ada struct, jadi diwujudkan dengan object.*/

const katalog = [
    {
        sku: "GTR-001",
        nama: "Gitar Akustik Dreadnought",
        merek: "Fendeh",
        kategori: "gitar",
        harga: 1250000,
        stok: 14,
        rating: 4.5,
        ilustrasi: "akustik"
    },
    {
        sku: "GTR-002",
        nama: "Gitar Elektrik Double Cutaway", 
        merek: "Gibon",
        kategori: "gitar",
        harga: 3200000,
        stok: 9,
        rating: 4.6,
        ilustrasi: "elektrik"
    },
    {
        sku: "GTR-003",
        nama: "Gitar Bass Elektrik 4 Senar",
        merek: "Ibnabez",
        kategori: "gitar",
        harga: 2750000,
        stok: 0,
        rating: 4.4,
        ilustrasi: "bass"
    },
    {
        sku: "KEY-001",
        nama: "Keyboard Arranger 61 Tuts",
        merek: "Kork",
        kategori: "keyboard",
        harga: 2400000,
        stok: 11,
        rating: 4.5,
        ilustrasi: "keyboard"
    },
    {
        sku: "KEY-002",
        nama: "Piano Digital 88 Tuts",
        merek: "Yahama",
        kategori: "keyboard",
        harga: 6500000,
        stok: 5,
        rating: 4.8,
        ilustrasi: "piano"
    },
    {
        sku: "KEY-003",
        nama: "MIDI Controller 25 Tuts",
        merek: "Yahama",
        kategori: "keyboard",
        harga: 1250000,
        stok: 18,
        rating: 4.3,
        ilustrasi: "midi"
    },
    {
        sku: "PRC-001",
        nama: "Cajon Kayu Birch",
        merek: "LP",
        kategori: "perkusi",
        harga: 650000,
        stok: 20,
        rating: 4.6,
        ilustrasi: "cajon"
    },
    {
        sku: "PRC-002",
        nama: "Drum Pad Elektrik 9 Pad",
        merek: "Lutwi",
        kategori: "perkusi",
        harga: 1850000,
        stok: 7,
        rating: 4.4,
        ilustrasi: "drumpad"
    },
    {
        sku: "PRC-003",
        nama: "Tamborin Jingle Kayu",
        merek: "Lutwi",
        kategori: "perkusi",
        harga: 85000,
        stok: 40,
        rating: 4.2,
        ilustrasi: "tamborin"
    },
    {
        sku: "ACC-001",
        nama: "Senar Gitar Akustik Set",
        merek: "Exilir",
        kategori: "aksesori",
        harga: 85000,
        stok: 60,
        rating: 4.5,
        ilustrasi: "senar"
    },
    {
        sku: "ACC-002",
        nama: "Tuner Gitar Clip-On",
        merek: "Fendeh",
        kategori: "aksesori",
        harga: 120000,
        stok: 35,
        rating: 4.6,
        ilustrasi: "tuner"
    },
    {
        sku: "ACC-003",
        nama: "Capo Gitar Aluminium",
        merek: "Koboi",
        kategori: "aksesori",
        harga: 65000,
        stok: 50,
        rating: 4.4,
        ilustrasi: "capo"
    },
];

let tampilan = [...katalog];

function renderKatalog() {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    for (const p of tampilan) {
        const card = document.getElementById("tplProduct").content.cloneNode(true);

        card.querySelector(".card-title").textContent = p.nama;
        card.querySelector(".card-sku").textContent = p.sku;
        card.querySelector(".card-brand").textContent = p.merek;
        card.querySelector(".rating-value").textContent = p.rating;
        card.querySelector(".card-price").textContent = "Rp" + p.harga.toLocaleString("id-ID");
        card.querySelector(".card-stock").textContent = "Stok: " + p.stok;
        card.querySelector("use").setAttribute("href", "#ill-" + p.ilustrasi);
        card.querySelector (".card").dataset.kategori = p.kategori;

        if (p.stok === 0) {
            card.querySelector(".card-badge").hidden = false;
            card.querySelector(".card").classList.add("is-soldout");
            card.querySelector(".btn-add").disabled = true;
        }

        card.querySelector(".btn-add").addEventListener("click", function () {
            tambahKeKeranjang(p);
        });

        grid.appendChild(card);    
    }

    document.getElementById("resultInfo").textContent = "Menampilkan " + tampilan.length + " produk";
}

renderKatalog();

/* ---------------------------------------
                  SORTING 
    -------------------------------------- */
const LABEL_KEY = { harga: "Harga", rating: "Rating", nama: "Nama" };
const LABEL_DIR = { asc: "naik", desc: "turun" };
 
function formatNilai(key, nilai) {
    if (key === "harga") {
        return "Rp " + nilai.toLocaleString("id-ID");
    }
    return nilai;
}
 
function labelProduk(p, key) {
    if (key === "nama") {
        return p.nama;
    }
    return `${p.nama} (${formatNilai(key, p[key])})`;
}

function bubbleSort(data, key, dir) {
    const log = [];
    let compareCount = 0;
    let swapCount = 0;
    let passCount = 0;
 
    log.push({ tipe: "info", teks: `Mulai Bubble Sort | ${LABEL_KEY[key]} ${LABEL_DIR[dir]} | ${data.length} data` });

    for (let p = 0; p < data.length - 1; p++) {
        let swapped = false;

        passCount++;
        log.push({ tipe: "info", teks: `Pass ${passCount}` });

        for (let i = 0; i < data.length - 1 - p; i++) {
            let needSwap;

            if (dir === "asc") {
                needSwap = data[i][key] > data[i + 1][key];
            } else {
                needSwap = data[i][key] < data[i + 1][key];
            }

            compareCount++;
            log.push({
                tipe: needSwap ? "swap" : "compare",
                teks: `[${i}] ${labelProduk(data[i], key)} vs ` +
                      `[${i + 1}] ${labelProduk(data[i + 1], key)} ` +
                      `→ ${needSwap ? "tukar" : "tidak tukar"}`
            });

            if (needSwap) {
                let temp = data[i];
                data[i] = data[i + 1];
                data[i + 1] = temp;
                swapped = true;
                swapCount++;
            }
        }
        if (!swapped) {
            log.push({ tipe: "info", teks: `Pass ${passCount} selesai: tidak ada penukaran, data sudah terurut, berhenti` });
            break;
        }
        log.push({ tipe: "info", teks: `Pass ${passCount} selesai: ada penukaran` });
    }
    log.push({ tipe: "found", teks: `Selesai: ${compareCount} perbandingan, ${swapCount} penukaran, ${passCount} pass` });

    return {
        log: log,
        compareCount: compareCount,
        swapCount: swapCount,
        passCount: passCount
    };
}

function tampilkanLogSort(hasil, key, dir) {
    const sortLog = document.getElementById("sortLog");
    sortLog.innerHTML = "";
 
    for (let n = 0; n < hasil.log.length; n++) {
        const baris = hasil.log[n];
        const item = document.getElementById("tplLogLine").content.cloneNode(true);
 
        item.querySelector(".log-line").classList.add("is-" + baris.tipe);
        item.querySelector(".log-no").textContent = n + 1;
        item.querySelector(".log-text").textContent = baris.teks;
 
        sortLog.appendChild(item);
    }
    sortLog.scrollTop = 0;
 
    document.getElementById("sumSortKey").textContent = LABEL_KEY[key] + ", " + LABEL_DIR[dir];
    document.getElementById("sumSortCompare").textContent = hasil.compareCount;
    document.getElementById("sumSortSwap").textContent = hasil.swapCount;
}
 
function kosongkanLogSort() {
    document.getElementById("sortLog").innerHTML = '<li class="log-empty">Belum ada proses sorting. Pilih opsi di menu “Urutkan”.</li>';
    document.getElementById("sumSortKey").textContent = "–";
    document.getElementById("sumSortCompare").textContent = "0";
    document.getElementById("sumSortSwap").textContent = "0";
}

//listener dropdown
const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function () {
    const selected = sortSelect.value;
    const splitValue = selected.split("-");
    const sortKey = splitValue[0];
    const sortDir = splitValue[1];

    const hasil = bubbleSort(tampilan, sortKey, sortDir);
    renderKatalog();
    tampilkanLogSort(hasil, sortKey, sortDir);

    document.getElementById("tabSort").checked = true;
});

/* --------------------------------------
                 SEARCHING
   -------------------------------------*/
function linearSearch(data, keyword) {
    let searchResult = [];
    const lowerKey = keyword.toLowerCase();

    const log = [];
    let checkCount = 0;
    log.push({ tipe: "info", teks: `Mulai Linear Search | kata kunci: "${keyword}" | ${data.length} data` });

    for (let i = 0 ; i < data.length ; i++ ) {

        const cocok = data[i].nama.toLowerCase().includes(lowerKey);
        checkCount++;
        log.push({
            tipe: cocok ? "found" : "compare",
            teks: `[${i}] ${data[i].nama} → ${cocok ? "cocok" : "tidak cocok"}`
        });

        if (cocok) searchResult.push(data[i]);
    }
    log.push({
        tipe: searchResult.length > 0 ? "found" : "miss",
        teks: `Selesai: ${checkCount} pengecekan, ${searchResult.length} produk cocok`
    });

    return {
        result: searchResult,
        log: log,
        checkCount: checkCount
    };
}

function tampilkanLogSearch(hasil, keyword) {
    const daftar = document.getElementById("searchLog");
    daftar.innerHTML = "";
 
    for (let n = 0; n < hasil.log.length; n++) {
        const baris = hasil.log[n];
        const item = document.getElementById("tplLogLine").content.cloneNode(true);
 
        item.querySelector(".log-line").classList.add("is-" + baris.tipe);
        item.querySelector(".log-no").textContent = n + 1;
        item.querySelector(".log-text").textContent = baris.teks;
 
        daftar.appendChild(item);
    }
    daftar.scrollTop = 0;
 
    document.getElementById("sumSearchKeyword").textContent = '"' + keyword + '"';
    document.getElementById("sumSearchSteps").textContent = hasil.checkCount;
    document.getElementById("sumSearchResult").textContent =
    hasil.result.length > 0 ? hasil.result.length + " produk ditemukan" : "Tidak ditemukan";
}
 
function kosongkanLogSearch() {
    document.getElementById("searchLog").innerHTML = '<li class="log-empty">Belum ada proses pencarian. Ketik di kotak cari lalu tekan Enter.</li>';
    document.getElementById("sumSearchKeyword").textContent = "–";
    document.getElementById("sumSearchSteps").textContent = "0";
    document.getElementById("sumSearchResult").textContent = "–";
}
 
// listener search bar
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
 
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
 
    const keyword = searchInput.value.trim();
    if (keyword === "") return;
 
    const hasil = linearSearch(katalog, keyword);
    tampilan = hasil.result;
    renderKatalog();
 
    document.getElementById("sectionTitle").textContent = `Hasil untuk "${keyword}"`;
    document.getElementById("emptyState").hidden = hasil.result.length > 0;
    sortSelect.value = "";
 
    tampilkanLogSearch(hasil, keyword);
    document.getElementById("tabSearch").checked = true;
});

// listener reset
const btnReset = document.getElementById("btnReset");

btnReset.addEventListener("click", function () {
    tampilan = [...katalog];
    sortSelect.value = "";
    kosongkanLogSort();
    
    searchInput.value = "";
    document.getElementById("sectionTitle").textContent = "Semua Produk";
    document.getElementById("emptyState").hidden = true;
    kosongkanLogSearch();
    
    renderKatalog();
});

let keranjang = [];
let toastTimer;
 
function umpanBalik(teks) {
    const toast = document.getElementById("toast");
    toast.textContent = teks;
    toast.classList.add("is-show");
 
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.classList.remove("is-show");
    }, 2000);
 
    document.getElementById("cartCount").animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.5)" }, { transform: "scale(1)" }],
        { duration: 300 }
    );
}
 
function tambahKeKeranjang(produk) {
    for (const item of keranjang) {
        if (item.produk === produk) {
            if (item.jumlah < produk.stok) {
                item.jumlah++;
                renderKeranjang();
                umpanBalik(`${produk.nama} · jumlah ${item.jumlah}`);
            } else {
                umpanBalik(`Stok ${produk.nama} hanya ${produk.stok}, tidak bisa ditambah lagi`);
            }
            return;
        }
    }
 
    keranjang.push({ produk: produk, jumlah: 1 });
    renderKeranjang();
    umpanBalik(`✓ ${produk.nama} masuk keranjang`);
}
  
function ubahJumlah(item, selisih) {
    const baru = item.jumlah + selisih;
    if (baru < 1 || baru > item.produk.stok) return;
    item.jumlah = baru;
    renderKeranjang();
}
 
function hapusItem(item) {
    keranjang.splice(keranjang.indexOf(item), 1);
    renderKeranjang();
}

function renderKeranjang() {
    const daftar = document.getElementById("cartItems");
    daftar.innerHTML = "";
 
    let total = 0;
    let jumlahBarang = 0;
 
    for (const item of keranjang) {
        const p = item.produk;     // p MENUNJUK ke objek di katalog. Nama, harga, dll dibaca dari sana.   <<< INTI POINTER
        const baris = document.getElementById("tplCartItem").content.cloneNode(true);
 
        baris.querySelector(".cart-item-name").textContent = p.nama;
        baris.querySelector(".cart-item-price").textContent = "Rp" + p.harga.toLocaleString("id-ID");
        baris.querySelector(".qty-value").textContent = item.jumlah;
        baris.querySelector(".cart-item-thumb").dataset.kategori = p.kategori;
        baris.querySelector("use").setAttribute("href", "#ill-" + p.ilustrasi);
 
        baris.querySelector(".btn-inc").addEventListener("click", function () {
            ubahJumlah(item, 1);
        });
        baris.querySelector(".btn-dec").addEventListener("click", function () {
            ubahJumlah(item, -1);
        });
        baris.querySelector(".cart-item-remove").addEventListener("click", function () {
            hapusItem(item);
        });
 
        daftar.appendChild(baris);
 
        total += p.harga * item.jumlah;
        jumlahBarang += item.jumlah;
    }
 
    document.getElementById("cartTotal").textContent = "Rp" + total.toLocaleString("id-ID");
    document.getElementById("cartCount").textContent = jumlahBarang;
    document.getElementById("cartEmpty").hidden = keranjang.length > 0;   // pesan "kosong" hanya tampil kalau keranjang kosong
}

document.getElementById("btnClearCart").addEventListener("click", function () {
    keranjang = [];
    renderKeranjang();
});