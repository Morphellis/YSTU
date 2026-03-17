import { Store } from './store.js';

export const UI = {
    updateHeader() {
        const xpEl = document.getElementById('xp-val');
        const progressEl = document.getElementById('progress-bar');
        if (xpEl) xpEl.innerText = Store.state.xp;
        
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
            if (Store.state.tasks[cb.id]) cb.checked = true;
        });
        this.updateHeader();
    },

    templates: {
        home: () => `
            <div class="card">
                <h2>Добро пожаловать! 👋</h2>
                <p>Ты в кампусе ЯГТУ. Начни с прохождения чек-листа.</p>
            </div>
            <div class="card" style="background: var(--accent); color: white;">
                <b>Важное:</b> Студенческие билеты в Г-437.
            </div>
        `,
        tasks: () => `
            <h2>Твой первый день</h2>
            <div class="card">
                <div class="task-row">
                    <input type="checkbox" id="task_office" class="task-checkbox" data-xp="100">
                    <div class="task-info"><b>Найти студенческий офис - Г-104 (Слева от турникетов на входе в Г)</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="task_wifi" class="task-checkbox" data-xp="100">
                    <div class="task-info"><b>Подключиться к Wi-Fi ЯГТУ</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="task_office" class="task-checkbox" data-xp="100">
                    <div class="task-info"><b>Получить зачетку и студенческий билет в дирекции института (Г-437)</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="task_office" class="task-checkbox" data-xp="100">
                    <div class="task-info"><b>Посетить столовую</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="task_office" class="task-checkbox" data-xp="100">
                    <div class="task-info"><b>Получить пропуск-карту</b></div>
                </div>
            </div>
        `,
        hostel: () => `
            <h2>Заселение в общагу</h2>
            <div class="card">
                <div class="task-row">
                    <input type="checkbox" id="doc_pass" class="task-checkbox" data-xp="0">
                    <div class="task-info"><b>Паспорт</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="doc_pass" class="task-checkbox" data-xp="0">
                    <div class="task-info"><b>Две фотографии 3х4</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="doc_pass" class="task-checkbox" data-xp="0">
                    <div class="task-info"><b>Медицинская справка 086-у</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="doc_pass" class="task-checkbox" data-xp="0">
                    <div class="task-info"><b>Справка о флюорографии</b></div>
                </div>
                <div class="task-row">
                    <input type="checkbox" id="doc_pass" class="task-checkbox" data-xp="0">
                    <div class="task-info"><b>Договор найма</b></div>
                </div>
            </div>
        `,
        map: () => `
            <div class="search-container">
                <input type="text" class="search-box" id="buildSearch" placeholder="Поиск корпуса...">
            </div>
            <div id="map-container" style="height: 500px; width: 100%; border-radius: 12px; margin-bottom: 15px; border: 1px solid #ddd;"></div>
            <div id="buildList">
                <div class="card search-item" data-id="A" data-lat="57.588238" data-lng="39.856509" data-search="а приемная комиссия">
                    <b>Корпус А</b><br><small>Московский пр-т, 84</small>
                </div>
                <div class="card search-item" data-id="G" data-lat="57.586453" data-lng="39.855394" data-search="г главный ит">
                    <b>Корпус Г</b><br><small>Московский пр-т, 88</small>
                </div>
                <div class="card search-item" data-id="B" data-lat="57.587011" data-lng="39.854389" data-search="б химия">
                    <b>Корпус Б</b><br><small>Московский пр-т, 88А</small>
                </div>
                <div class="card search-item" data-id="V" data-lat="57.584278" data-lng="39.862322" data-search="в строительство">
                    <b>Корпус В</b><br><small>ул. Кривова, 40</small>
                </div>
                <div class="card search-item" data-id="E" data-lat="57.588380" data-lng="39.854393" data-search="е химия">
                    <b>Корпус Е</b><br><small>Московский пр-т, 84</small>
                </div>
                <div class="card search-item" data-id="S" data-lat="57.589720" data-lng="39.852864" data-search="спортзал">
                    <b>Спортивный корпус</b><br><small>ул. Гагарина, 7</small>
                </div>
                <div class="card search-item" data-id="FOOD" data-lat="57.588572" data-lng="39.851233" data-search="еда столовая">
                    <b>Студстоловая</b><br><small>ул. Гагарина, 9</small>
                </div>
            </div>
        `
    }
};