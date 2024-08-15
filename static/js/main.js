document.addEventListener('DOMContentLoaded', () => {
    // Theme toggler function
    // Function to toggle the theme
    let themeToggler = document.querySelector('#themeToggler');
    let currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.setAttribute('data-bs-theme', currentTheme);
    }
    else {
        // Change theme based on current time
        const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour < 18) {
            document.body.setAttribute('data-bs-theme', 'light');
        } else {
            document.body.setAttribute('data-bs-theme', 'dark');
        }
    }
    themeToggler.addEventListener('click', () => {
        if (document.body.getAttribute('data-bs-theme') == 'light') {
            document.body.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        else {
            document.body.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});