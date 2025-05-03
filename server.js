app.get('/api/file/:name', (req, res) => {
    const file = req.params.name;
    if (!file.endsWith('.md')) {
        return res.status(400).json({error: 'Solo archivos .md permitidos'})
    }
    const filePath = path.join(mdDir, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).json({error: 'Archivo no enocntrado'});
        const html = md.render(data);
        res.json({html});
    });
});

app.post('/api/file',(req,res) =>{
    const {filename,content}=req.body;
    const filePath=path.join(mdC,filename);
    fs.writeFile(filePath, content => {
        res.json({mensaje: 'Archivo guardado'});
    })
})