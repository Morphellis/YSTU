export const Store = {
    state: {
        // Добавили Number() и дефолтное значение
        xp: Number(localStorage.getItem('xp')) || 0,
        tasks: JSON.parse(localStorage.getItem('tasks')) || {},
        welcomeClosed: localStorage.getItem('welcome_closed') === 'true'
    },

    updateXP(amount) {
        this.state.xp = Math.max(0, this.state.xp + amount);
        this.save();
    },

    toggleTask(id, status) {
        this.state.tasks[id] = status;
        this.save();
    },

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        localStorage.setItem('xp', this.state.xp.toString());
    },

    // Новый метод для получения общего прогресса независимо от текущей страницы
    getOverallProgress() {
        const totalQuests = 3; // Общее кол-во задач с XP (office, wifi, food)
        const completedQuests = ['task_office', 'task_wifi', 'task_food']
            .filter(id => this.state.tasks[id]).length;
        return (completedQuests / totalQuests) * 100;
    }
};