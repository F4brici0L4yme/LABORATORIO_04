function crearArchivo(event) {
    event.preventDefault();
    const filename = document.getElementById('nombreArchivo').value;
    const content = document.getElementById('contenidoMarkdown').value;
    fetch('http://localhost:3000/api/file', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filename , content})
    })
    .then(rpta => rpta.json())
    .then(data => {
        console.log(data);
        alert("Archivo creado");
        listar();
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error al crear el archivo");
    });
}