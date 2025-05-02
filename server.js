const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const MARKDOWN_DIR = path.join(__dirname, 'markdowns');

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/api/files', (req, res) => {
    fs.readdir(MARKDOWN_DIR, (err, files) => {
        if (err) return res.status(500).json({ error: 'Error al leer archivos' });
        const mdFiles = files.filter(f => f.endsWith('.md'));
        res.json({ files: mdFiles });
    });
});

app.post('/api/file', (req, res) => {
    const { filename } = req.body;
    const filePath = path.join(MARKDOWN_DIR, filename);
    if (!filename.endsWith('.md')) return res.status(400).json({ error: 'Archivo inválido' });

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'Archivo no encontrado' });
        const html = marked.parse(data);
        res.json({ html });
    });
});

app.post('/api/create', (req, res) => {
    const { filename, content } = req.body;
    if (!filename.endsWith('.md')) return res.status(400).json({ error: 'Nombre debe terminar en .md' });

    const filePath = path.join(MARKDOWN_DIR, filename);
    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).json({ error: 'Error al guardar archivo' });
        res.json({ success: true });
    });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
