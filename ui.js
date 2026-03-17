import { Store } from './store.js';

export const UI = {
    updateHeader() {
        const xpEl = document.getElementById('xp-val');
        const progressEl = document.getElementById('progress-bar');
        
        if (xpEl) xpEl.innerText = Store.state.xp;
        
        // Считаем прогресс только по квестам с XP 100
        const tasks = document.querySelectorAll('.task-checkbox[data-xp="100"]');
        if (tasks.length > 0 && progressEl) {
            const done = Array.from(tasks).filter(t => t.checked).length;
            const percent = (done / tasks.length) * 100;
            progressEl.style.width = `${percent}%`;
        }
    },

    renderPage(pageId) {
        const content = document.getElementById('content');
        if (!this.templates[pageId]) return;

        content.innerHTML = this.templates[pageId]();

        const checkboxes = content.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            if (Store.state.tasks[cb.id]) {
                cb.checked = true;
            }
        });

        this.updateHeader();
    },

    templates: {
        home: () => `
            <div class="card">
                <h2>Добро пожаловать! 👋</h2>
                <p>Ты в кампусе ЯГТУ. Начни с прохождения чек-листа, чтобы быстрее адаптироваться.</p>
            </div>
            <div class="card" style="background: var(--accent); color: white;">
                <b>Важное событие:</b><br>
                Студенческие билеты выдают в Дирекции (Г-437)
            </div>
        `,

        tasks: () => `
            <h2>Твой первый день</h2>
            <div class="card">
                <div class="task-row">
                    <input type="checkbox" id="task_office" class="task-checkbox" data-xp="100">
                    <div class="task-info">
                        <b>Студофис (Г-104)</b>
                        <small>Зайди в Г-корпус, налево от турникетов.</small>
                    </div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="task_wifi" class="task-checkbox" data-xp="100">
                    <div class="task-info">
                        <b>Wi-Fi ЯГТУ</b>
                        <small>Сеть называется Polytech connect</small>
                    </div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="task_food" class="task-checkbox" data-xp="100">
                    <div class="task-info">
                        <b>Студстоловая</b>
                        <small>ул. Гагарина, 9. Вкусно и недорого.</small>
                    </div>
                </div>
            </div>
        `,

        hostel: () => `
            <h2>Заселение в общагу</h2>
            <div class="card">
                <p><b>Чек-лист документов:</b></p>
                <div class="task-row">
                    <input type="checkbox" id="doc_pass" class="task-checkbox" data-xp="0">
                    <div class="task-info"><b>Паспорт</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="doc_photo" class="task-checkbox" data-xp="0">
                    <div class="task-info"><b>2 фото 3х4</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="doc_med" class="task-checkbox" data-xp="0">
                    <div class="task-info"><b>Справка 086-У</b></div>
                </div>
            </div>
        `,

        map: () => `
            <div class="search-container">
                <input type="text" class="search-box" id="buildSearch" placeholder="Поиск корпуса или института...">
            </div>
            
            <div id="map-container" style="height: 500px; width: 100%; border-radius: 12px; margin-bottom: 15px; border: 1px solid #ddd;"></div>

            <div id="buildList">
                <div class="card search-item" data-id="A" data-lat="57.588238" data-lng="39.856509" data-search="а приемная комиссия инженерия московский 84">
                    <b>Корпус А</b><br><small>Московский пр-т, 84 (напротив Политеха)</small>
                </div>

                <div class="card search-item" data-id="G" data-lat="57.586453" data-lng="39.855394" data-search="г главный ит it цифровые системы московский 88">
                    <b>Корпус Г</b><br><small>Главный корпус (высотка), Московский пр-т, 88</small>
                </div>

                <div class="card search-item" data-id="B" data-lat="57.587011" data-lng="39.854389" data-search="б химико технологический факультет химия московский 88а">
                    <b>Корпус Б</b><br><small>Химический факультет, Московский пр-т, 88А</small>
                </div>

                <div class="card search-item" data-id="V" data-lat="57.584278" data-lng="39.862322"" data-search="в строительство инженер транспорт кривова 40">
                    <b>Корпус В</b><br><small>Институт строительства, ул. Кривова, 40</small>
                </div>

                <div class="card search-item" data-id="E" data-lat="57.588380" data-lng="39.854393" data-search="е химия хим технологии московский 84">
                    <b>Корпус Е</b><br><small>Институт химии, Московский пр-т, 84</small>
                </div>

                <div class="card search-item" data-id="S" data-lat="57.589720" data-lng="39.852864" data-search="спорткорпус спортзал спорт гагарина 7">
                    <b>Спортивный корпус</b><br><small>ул. Гагарина, 7</small>
                </div>
                
                <div class="card search-item" data-id="FOOD" data-lat="57.588572" data-lng="39.851233" data-search="еда столовая хавчик гагарина 9">
                    <b>Студстоловая</b><br><small>ул. Гагарина, 9</small>
                </div>
            </div>
        `}
};