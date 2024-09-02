document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/user')
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').textContent = data.username;
        });
});
