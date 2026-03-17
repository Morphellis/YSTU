export const Store = {
    state: {
        // Добавили Number() и дефолтное значение
        xp: Number(localStorage.getItem('xp')) || 0,
        tasks: JSON.parse(localStorage.getItem('tasks')) || {},
        achievements: JSON.parse(localStorage.getItem('achievements')) || [],
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

    addAchievement(title) {
        if (!this.state.achievements.includes(title)) {
            this.state.achievements.push(title);
            this.save();
        }
    },

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        localStorage.setItem('xp', this.state.xp.toString());
        localStorage.setItem('achievements', JSON.stringify(this.state.achievements));
    },

    // Новый метод для получения общего прогресса независимо от текущей страницы
    getOverallProgress() {
        const totalQuests = 5; // Общее кол-во задач с XP
        const completedQuests = ['task_office', 'task_wifi', 'task_ticket', 'task_food', 'task_card']
            .filter(id => this.state.tasks[id]).length;
        return (completedQuests / totalQuests) * 100;
    }
};