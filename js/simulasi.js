// =========================================
// DATA HARGA MOBIL
// =========================================

const hargaMobil = {
    agya: 173800000,
    calya: 170200000,
    avanza: 244200000,
    veloz: 297200000,
    raize: 243500000,
    rush: 290100000,
    yariscross: 359700000,
    zenix: 437700000,
    reborn: 417800000,
    fortuner: 583700000,
    hiace: 575400000,
    alphard: 1288000000,
    vellfire: 1873000000,
    hiluxrangga: 194300000
};

// =========================================
// FORMAT RUPIAH
// =========================================

function rupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// =========================================
// UPDATE HARGA
// =========================================

const mobil = document.getElementById("mobil");
const harga = document.getElementById("harga");

if (mobil && harga) {

    mobil.addEventListener("change", function () {

        const nilai = hargaMobil[this.value] || 0;

        harga.value = rupiah(nilai);

        harga.dataset.nilai = nilai;

    });

}

// =========================================
// HITUNG CICILAN
// =========================================

const form = document.getElementById("simulasiForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const hargaMobilDipilih = Number(harga.dataset.nilai);

        const dp = Number(document.getElementById("dp").value);

        const tenor = Number(document.getElementById("tenor").value);

        if (!hargaMobilDipilih) {
            alert("Pilih mobil terlebih dahulu.");
            return;
        }

        if (dp <= 0) {
            alert("Masukkan DP.");
            return;
        }

        if (dp >= hargaMobilDipilih) {
            alert("DP tidak boleh melebihi harga mobil.");
            return;
        }

        const bunga = 0.05;

        const pinjaman = hargaMobilDipilih - dp;

        const total = pinjaman + (pinjaman * bunga * tenor);

        const cicilan = total / (tenor * 12);

        document.getElementById("hasilHarga").innerHTML = rupiah(hargaMobilDipilih);

        document.getElementById("hasilDP").innerHTML = rupiah(dp);

        document.getElementById("hasilTenor").innerHTML = tenor + " Tahun";

        document.getElementById("hasilCicilan").innerHTML = rupiah(cicilan);

        document.getElementById("hasilSimulasi").style.display = "block";

    });

}

// =========================================
// WHATSAPP
// =========================================

function kirimWhatsApp() {

    const mobilDipilih = mobil.options[mobil.selectedIndex].text;

    const hargaText = document.getElementById("hasilHarga").innerText;

    const dpText = document.getElementById("hasilDP").innerText;

    const tenorText = document.getElementById("hasilTenor").innerText;

    const cicilanText = document.getElementById("hasilCicilan").innerText;

    const pesan =
`Halo Toyota Pamulang,

Saya ingin konsultasi kredit.

Mobil : ${mobilDipilih}
Harga : ${hargaText}
DP : ${dpText}
Tenor : ${tenorText}
Estimasi Cicilan : ${cicilanText}

Mohon informasi promo terbaik.`;

    window.open(
        "https://wa.me/628151818979?text=" + encodeURIComponent(pesan),
        "_blank"
    );

}
