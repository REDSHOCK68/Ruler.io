const authContainer = document.getElementById('auth-container');
const gameUI = document.getElementById('game-ui');
const usernameInput = document.getElementById('username-input');
const startBtn = document.getElementById('start-btn');
const playerNameDisplay = document.getElementById('player-name-display');

// Sayfa yüklendiğinde kontrol et
window.onload = () => {
    const savedName = localStorage.getItem('ruler_player_name');
    if (savedName) {
        startGame(savedName);
    }
};

// Başlat butonuna tıklandığında
startBtn.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    if (name.length >= 3) {
        localStorage.setItem('ruler_player_name', name); // Yerel kaydet
        startGame(name);
    } else {
        alert("İsim en az 3 karakter olmalı!");
    }
});

function startGame(name) {
    // Giriş ekranını kaldır, oyun ekranını aç
    authContainer.classList.add('hidden');
    gameUI.classList.remove('hidden');
    
    // İsmi ekrana yazdır
    playerNameDisplay.innerText = name;
    
    console.log(`${name} oyuna katıldı. Ülke sınırları hazırlanıyor...`);
    // Burada ileride harita oluşturma fonksiyonlarını çağıracağız
}
