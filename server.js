const fs = require('fs');
const path = require('path');
const express = require('express');
const bp = require('body-parser');
const MarkdownIt = require('markdown-it'),
md = new MarkdownIt();
const app = express();
const PORT = 3000;
const mdDir = path.join(__dirname, 'markdowns');

if (!fs.existsSync(mdDir)) fs.mkdirSync(mdDir);
app.use(express.static(path.join(__dirname, 'pub')));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/api/files', (req, res) => {
    fs.readdir(mdDir, (err, files) => {
        if (err) return res.status(500).json({ error: 'Error al leer archivos' });
        const mdFiles = files.filter(f => f.endsWith('.md'));
        res.json({ files: mdFiles });
    });
});

app.get('/api/file/:name', (req, res) => {
    const file = req.params.name;
    if (!file.endsWith('.md')) return res.status(400).json({ error: 'Solo archivos .md permitidos' });
    const filePath = path.join(mdDir, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'Archivo no encontrado' });
        const html = md.render(data);
        res.json({ html });
    });
});

app.post('/api/file', (req, res) => {
    const { filename, content } = req.body;
    if (!filename.endsWith('.md')) return res.status(400).json({ error: 'Debe terminar en .md' });
    const filePath = path.join(mdDir, filename);
    fs.writeFile(filePath, content, err => {
        if (err) return res.status(500).json({ error: 'Error al guardar el archivo' });
        res.json({ message: 'Archivo guardado correctamente' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor activo en: http://localhost:${PORT}`);
});
