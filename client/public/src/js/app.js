document.getElementById('fetchData').addEventListener('click', function () {
    fetch('/api/hello')
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = data.message;
        })
        .catch(error => console.error('Error fetching data:', error));
});
