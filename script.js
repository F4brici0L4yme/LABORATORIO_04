function verHTML() {
    fetch(`/api/file/archivo.md`)
    .then(res => res.json())
    .then(({ html }) => {
        document.getElementById(`id`).innerHTML= html;
    })
    .catch(err => {
        console.error(err);
        document.getElementById().textContent = 'Error al cargar';
    });
}  