async function cargarArchivos() {
    const res = await fetch('/api/files');
    const data = await res.json();
    const lista = document.getElementById('file-list');
    lista.innerHTML = '';
    data.files.forEach(file => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="verArchivo('${file}')">${file}</a>`;
        lista.appendChild(li);
    });
}

async function verArchivo(nombre) {
    const res = await fetch('/api/file/' + nombre);
    const data = await res.json();
    document.getElementById('preview').innerHTML = data.html;
}

async function crearArchivo() {
    const filename = document.getElementById('filename').value;
    const content = document.getElementById('content').value;
    const res = await fetch('/api/file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, content })
    });
    const result = await res.json();
    alert(result.message || result.error);
    cargarArchivos();
}

cargarArchivos();