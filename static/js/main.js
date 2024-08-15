document.addEventListener('DOMContentLoaded', () => {
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

// Function to flash message
function flash(message, type) {
    let flash = document.createElement('div');
    flash.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="position:fixed; top:0; left:0;right:0;z-index:100000;border-radius:0;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.body.appendChild(flash);
}


// Function to check Task
function check_task(button, task_id) {
    let text = document.querySelector(`#task-text-${task_id}`);
    fetch('/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task_id: task_id })
    })
    .then(response => response.json())
    .then(data => {
        if (data['message'] === 'checked') {
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');
            text.classList.add('text-decoration-line-through');
        } 
        else if (data['message'] === 'unchecked') {
            button.classList.remove('btn-primary');
            button.classList.add('btn-outline-primary');
            text.classList.remove('text-decoration-line-through');
        }
        else {
            flash(data['message'], 'info');
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

// Function to romove task
function remove_task(task_id) {
    fetch('/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task_id: task_id })
    })
    .then(response => response.json())
    .then(data => {
        if (data['message'] === 'removed') {
            document.querySelector(`#task-${task_id}`).classList.add('d-none');
        } 
        else {
            flash(data['message'], 'info');
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}