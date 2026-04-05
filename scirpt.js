// OYUN DEĞİŞKENLERİ
let gameState = {
    playerName: "",
    gold: 200,
    cityPrice: 50,
    cities: [] // Maksimum 5 şehir saklar
};

const possibleCityNames = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya", "Sivas", "Trabzon"];

// SAYFA YÜKLENDİĞİNDE KONTROLLER
window.onload = () => {
    const localName = localStorage.getItem('ruler_name');
    const localData = localStorage.getItem('ruler_save_data');

    if (localName) {
        gameState.playerName = localName;
        // Eğer daha önce kaydedilmiş bir oyun verisi varsa yükle
        if (localData) {
            gameState = JSON.parse(localData);
        }
        startGame();
    }
};

// GİRİŞ İŞLEMİ
function handleLogin() {
    const input = document.getElementById('username-input').value.trim();
    if (input.length >= 2) {
        gameState.playerName = input;
        localStorage.setItem('ruler_name', input);
        startGame();
    } else {
        alert("Hükümdar, isminiz en az 2 karakter olmalı!");
    }
}

// OYUNU BAŞLAT VE EKRANI DEĞİŞTİR
function startGame() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('game-ui').classList.remove('hidden');
    document.getElementById('display-name').innerText = "👑 " + gameState.playerName;
    updateUI();
}

// ŞEHİR SATIN ALMA (YATIRIM)
function createCity() {
    if (gameState.cities.length >= 5) {
        alert("Maksimum vilayet sayısına (5) ulaştınız!");
        return;
    }

    if (gameState.gold >= gameState.cityPrice) {
        gameState.gold -= gameState.cityPrice;
        
        // Rastgele isim ve kazanç değeri (+10 ile +40 arası)
        const randomName = possibleCityNames[Math.floor(Math.random() * possibleCityNames.length)];
        const randomIncome = Math.floor(Math.random() * 31) + 10;

        const newCity = {
            name: randomName,
            income: randomIncome
        };

        gameState.cities.push(newCity);
        gameState.cityPrice += 50; // Her alımda fiyat 50 artar
        
        updateUI();
    } else {
        alert("Yetersiz altın!");
    }
}

// ARAYÜZÜ VERİLERE GÖRE GÜNCELLE
function updateUI() {
    document.getElementById('gold-count').innerText = gameState.gold;
    document.getElementById('city-price').innerText = gameState.cityPrice;

    const slotsDiv = document.getElementById('city-slots');
    slotsDiv.innerHTML = ""; // İçeriği temizle

    // Her zaman 5 slot göster
    for (let i = 0; i < 5; i++) {
        const city = gameState.cities[i];
        
        if (city) {
            // Dolu Slot
            slotsDiv.innerHTML += `
                <div class="city-slot occupied">
                    <h3>${city.name}</h3>
                    <p>Kazanç: +${city.income} 💰</p>
                    <button class="invest-btn" onclick="alert('Yatırım seçenekleri yakında!')">Yatırım Yap</button>
                </div>
            `;
        } else {
            // Boş Slot
            slotsDiv.innerHTML += `
                <div class="city-slot">
                    <p style="color:#533483">Boş Vilayet Slotu</p>
                </div>
            `;
        }
    }
}

// MENÜLER ARASI GEÇİŞ
function switchMenu(menuId) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById(menuId).classList.remove('hidden');
}

// ESC TUŞU DİNLEYİCİSİ
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        // Eğer bir alt menüdeysek ana menüye dön
        const invMenu = document.getElementById('investments-menu');
        if (!invMenu.classList.contains('hidden')) {
            invMenu.classList.add('hidden');
            document.getElementById('main-menu').classList.remove('hidden');
        }
    }
});

// YEREL KAYIT (SAVE PROGRESS)
function saveToCloud() {
    localStorage.setItem('ruler_save_data', JSON.stringify(gameState));
    alert("İlerlemeniz başarıyla kaydedildi!");
}
