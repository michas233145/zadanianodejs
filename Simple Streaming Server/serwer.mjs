import fs from 'fs';
import http from 'http';
import path from 'path';

http.createServer((req, res) => {
    const fileName = new URL(req.url, `http://localhost:3001`).searchParams.get('file');

    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Brak nazwy pliku w zapytaniu.');
    }

    const filePath = path.resolve(fileName);
    const stream = fs.createReadStream(filePath);

    stream.on('error', () => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Plik nie został znaleziony.');
    });

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    stream.pipe(res);
}).listen(3001, () => {
    console.log(`Serwer działa na http://localhost:3001`);
});
