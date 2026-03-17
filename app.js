import { Store } from './store.js';
import { UI } from './ui.js';

const App = {
    yMap: null,

    init() {
        this.bindEvents();
        UI.renderPage('home');
        if (localStorage.getItem('welcome_closed') === 'true') {
            const welcome = document.getElementById('welcome');
            if (welcome) welcome.style.display = 'none';
        }
    },

    initMap() {
        const container = document.getElementById('map-container');
        if (!container) return;

        ymaps.ready(() => {
            if (this.yMap) this.yMap.destroy();

            this.yMap = new ymaps.Map("map-container", {
                center: [57.587433, 39.856204],
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl']
            });

            const myCollection = new ymaps.GeoObjectCollection();

            document.querySelectorAll('.search-item').forEach(item => {
                const { lat, lng } = item.dataset;
                if (lat && lng) {
                    const placemark = new ymaps.Placemark([lat, lng], {
                        balloonContent: `<b>${item.querySelector('b').innerText}</b>`
                    }, {
                        preset: 'islands#orangeDotIcon'
                    });

                    myCollection.add(placemark);

                    item.onclick = () => {
                        // 1. Скроллим страницу наверх к карте
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });

                        // 2. Центрируем карту на корпусе
                        this.yMap.setCenter([lat, lng], 17, {
                            checkZoomRange: true,
                            duration: 500
                        });
                        placemark.balloon.open();
                    };
                }
            });

            this.yMap.geoObjects.add(myCollection);

            // Автоматически показываем ВСЕ маркеры при загрузке
            if (myCollection.getLength() > 0) {
                this.yMap.setBounds(myCollection.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 40
                });
            }
        });
    },

    showAchievementPopup(message) {
        const popup = document.getElementById('achievement-popup');
        const msgEl = document.getElementById('popup-message');
        msgEl.textContent = message;
        popup.classList.add('show');

        // Автоматически скрываем через 3 секунды с анимацией
        setTimeout(() => {
            popup.classList.add('hide');
            setTimeout(() => popup.classList.remove('show', 'hide'), 500);
        }, 3000);
    },

    bindEvents() {
        document.getElementById('main-nav').addEventListener('click', (e) => {
            const btn = e.target.closest('.nav-item');
            if (btn) {
                document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                const page = btn.dataset.page;
                UI.renderPage(page);
                if (page === 'map') setTimeout(() => this.initMap(), 200);
            }
        });

        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.onclick = () => {
                localStorage.setItem('welcome_closed', 'true');
                document.getElementById('welcome').style.display = 'none';
            };
        }

        document.getElementById('content').addEventListener('change', (e) => {
            if (e.target.classList.contains('task-checkbox')) {
                const isChecked = e.target.checked;
                const xp = parseInt(e.target.dataset.xp || 0);
                Store.toggleTask(e.target.id, isChecked);
                Store.updateXP(isChecked ? xp : -xp);
                UI.updateHeader();

                // Проверка на достижение
                if (Store.getOverallProgress() === 100 && !Store.state.achievements.includes('Первый день')) {
                    Store.addAchievement('Первый день');
                    this.showAchievementPopup('Вы получили достижение "Первый день"!');
                }
            }
        });

        document.getElementById('content').addEventListener('input', (e) => {
            if (e.target.id === 'buildSearch') {
                const query = e.target.value.toLowerCase();
                document.querySelectorAll('.search-item').forEach(item => {
                    const text = item.innerText.toLowerCase() + (item.dataset.search || "").toLowerCase();
                    item.style.display = text.includes(query) ? 'block' : 'none';
                });
            }
        });
    }
};

App.init();