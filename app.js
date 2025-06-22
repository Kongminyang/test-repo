const tips = [
    'Start your day with clear intentions and a written plan.',
    'Take a five minute break each hour to refresh your focus.',
    'Write down one thing you appreciate about yourself today.',
    'Focus on completing one important task before noon.',
    'Reflect on your progress at the end of each day.'
];
let tipIndex = 0;

function showNextTip() {
    const tipText = document.getElementById('tip-text');
    tipText.textContent = tips[tipIndex];
    tipIndex = (tipIndex + 1) % tips.length;
}

document.getElementById('next-btn').addEventListener('click', showNextTip);

// initial tip
showNextTip();

document.getElementById('subscribe-btn').addEventListener('click', () => {
    alert('Subscription placeholder - integrate payment provider here.');
});
