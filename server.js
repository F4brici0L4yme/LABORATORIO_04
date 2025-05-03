const fs = require('fs')
const path = require('path');
const express = require('express');
const bp = require('body-parser')
const MarkdownIt = require('markdown-it'),
	md = new MarkdownIt();
const app = express()

app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")
})

const mdC=path.join(__dirname, 'markdowns');
app.use(express.static(path.join(__dirname, 'pud')));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
