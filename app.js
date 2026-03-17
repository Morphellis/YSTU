import { Store } from './store.js';
import { UI } from './ui.js';

const App = {
    yMap: null, // Объект карты Яндекса

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

        // Ждем, пока API Яндекса загрузится
        ymaps.ready(() => {
            // Если карта уже создана, не пересоздаем
            if (this.yMap) {
                this.yMap.destroy(); 
            }

            this.yMap = new ymaps.Map("map-container", {
                center: [57.587433, 39.856204], // Центр ЯГТУ
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl']
            });

            // Добавляем маркеры для всех карточек
            document.querySelectorAll('.search-item').forEach(item => {
                const { lat, lng, id } = item.dataset;
                if (lat && lng) {
                    const placemark = new ymaps.Placemark([lat, lng], {
                        balloonContent: `<b>${item.querySelector('b').innerText}</b>`
                    }, {
                        preset: 'islands#orangeDotIcon'
                    });

                    this.yMap.geoObjects.add(placemark);

                    // Клик по карточке в списке
                    item.onclick = () => {
                        this.yMap.setCenter([lat, lng], 18, {
                            checkZoomRange: true,
                            duration: 500 // Плавный полет
                        });
                        placemark.balloon.open();
                    };
                }
            });
        });
    },

    bindEvents() {
        // Навигация
        document.getElementById('main-nav').addEventListener('click', (e) => {
            const btn = e.target.closest('.nav-item');
            if (btn) {
                document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                const page = btn.dataset.page;
                UI.renderPage(page);
                
                if (page === 'map') {
                    // Даем 200мс, чтобы HTML отрисовался, прежде чем вставлять карту
                    setTimeout(() => this.initMap(), 200);
                }
            }
        });

        // Кнопка старта
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.onclick = () => {
                localStorage.setItem('welcome_closed', 'true');
                document.getElementById('welcome').style.display = 'none';
            };
        }

        // Чекбоксы (делегирование)
        document.getElementById('content').addEventListener('change', (e) => {
            if (e.target.classList.contains('task-checkbox')) {
                const isChecked = e.target.checked;
                const xp = parseInt(e.target.dataset.xp || 0);
                Store.toggleTask(e.target.id, isChecked);
                Store.updateXP(isChecked ? xp : -xp);
                UI.updateHeader();
            }
        });

        // Поиск (делегирование)
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