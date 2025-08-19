document.addEventListener('click', function (e) {
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

// выделение
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll('.header__container a');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // убираем активность у всех ссылок
            navLinks.forEach(link => link.classList.remove("active"));

            // находим ссылку по href
            const id = entry.target.getAttribute("id");
            const activeLink = document.querySelector(`.header__container a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
}, {
    threshold: 0.6 // срабатывает, если 60% секции видно
});

// подключаем наблюдатель к секциям
sections.forEach(section => {
    observer.observe(section);
});