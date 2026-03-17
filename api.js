async function fetchSchedule(login, pass, group) {
    const response = await fetch('http://localhost:5000/get_schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password: pass, group })
    });
    const data = await response.json();
    return data;
}