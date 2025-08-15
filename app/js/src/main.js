document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-copy')) {
        const widgetBox = e.target.closest('.widget-box');
        if (!widgetBox) return;

        const template = widgetBox.querySelector('template');
        if (!template) return;

        const code = template.innerHTML.trim();

        navigator.clipboard.writeText(code).then(() => {
            const oldText = e.target.textContent;
            e.target.textContent = 'Код скопирован!';
            setTimeout(() => e.target.textContent = oldText, 5000);
        }).catch(err => {
            console.error('Ошибка копирования:', err);
        });
    }
});