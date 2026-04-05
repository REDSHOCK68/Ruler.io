// OYUN VERİLERİ (DEĞİŞKENLER)
let gameState = {
    playerName: "",
    gold: 200,
    cityPrice: 50,
    cities: [] // Maksimum 5 adet nesne alacak
};

const possibleCityNames = ["Konya", "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Sivas", "Trabzon"];

// SAYFA YÜKLENDİĞİNDE
window.onload = () => {
    const localName = localStorage.getItem('ruler_name');
    const localData = localStorage.getItem('ruler_save_data');

    if (localName) {
        gameState.playerName = localName;
        if (localData) {
            gameState = JSON.parse(localData);
        }
        startGame();
    }
};

// GİRİŞ YAPMA
function handleLogin() {
    const input = document.getElementById('username-input').value.trim();
    if (input.length >= 2) {
        gameState.playerName = input;
        localStorage.setItem('ruler_name', input);
        startGame();
    } else {
        alert("Lütfen geçerli bir isim girin!");
    }
}

// OYUNU BAŞLAT
function startGame() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('game-ui').classList.remove('hidden');
    document.getElementById('display-name').innerText = "👑 " + gameState.playerName;
    updateUI();
}

// ŞEHİR OLUŞTURMA (YATIRIM)
function createCity() {
    if (gameState.cities.length >= 5) {
        alert("Daha fazla vilayet kuramazsınız! (Maks 5 Slot)");
        return;
    }

    if (gameState.gold >= gameState.cityPrice) {
        gameState.gold -= gameState.cityPrice;
        
        // Rastgele şehir ismi ve kazanç (10-40 arası)
        const newCity = {
            name: possibleCityNames[Math.floor(Math.random() * possibleCityNames.length)],
            income: Math.floor(Math.random() * 31) + 10
        };

        gameState.cities.push(newCity);
        gameState.cityPrice += 50; // Fiyat artışı
        
        updateUI();
    } else {
        alert("Yetersiz altın, Hükümdar!");
    }
}

// ARAYÜZÜ GÜNCELLE
function updateUI() {
    document.getElementById('gold-count').innerText = gameState.gold;
    document.getElementById('city-price').innerText = gameState.cityPrice;

    const slotsDiv = document.getElementById('city-slots');
    slotsDiv.innerHTML = ""; // Önce temizle

    // 5 Slotu her zaman göster (Dolu veya Boş)
    for (let i = 0; i < 5; i++) {
        const city = gameState.cities[i];
        if (city) {
            slotsDiv.innerHTML += `
                <div class="city-slot occupied">
                    <h3>${city.name}</h3>
                    <p>Kazanç: +${city.income}/sn</p>
                    <button class="invest-btn" onclick="alert('Hangi yatırımı yapmak istersiniz?')">Yatırım Yap</button>
                </div>
            `;
        } else {
            slotsDiv.innerHTML += `
                <div class="city-slot">
                    <p style="color:#533483">Boş Slot</p>
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

// ESC TUŞU İLE GERİ DÖNME
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById('investments-menu').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
    }
});

// BULUTA KAYDETME (LOCALSTORAGE)
function saveToCloud() {
    localStorage.setItem('ruler_save_data', JSON.stringify(gameState));
    alert("İlerlemeniz bu bilgisayar için kaydedildi!");
}
