import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import http from 'http';
const PORT = 3001;

http.createServer((req, res) => {
    const fileName = new URL(req.url, `http://${req.headers.host}`).searchParams.get('file');

    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Brak nazwy pliku w zapytaniu.');
    }

    const filePath = path.join(process.cwd(), fileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('Plik nie został znaleziony.');
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        fs.createReadStream(filePath).pipe(res);
    });
}).listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
