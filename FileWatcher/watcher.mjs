//File Watcher - Monitor File Changes
import fs from 'fs';
import EventEmitter from 'events';
 
const eventEmitter = new EventEmitter();
 
const logToFile = (message) => {
    fs.appendFile('./log.txt', message + '\n', (err) => {
        if (err) {
            console.error('Błąd przy zapisie do pliku:', err);
        } else {
            console.log('Zapisano wiadomość do log.txt');
        }
    });
};
eventEmitter.on('fileEvent', (eventType, filename) => {
    const message = filename 
        ? `Wykryto zdarzenie: ${eventType} w pliku ${filename}`
        : `Wykryto zdarzenie: ${eventType}`;
    console.log(message);
    logToFile(message);
});
 
const watcher = fs.watch('./', (eventType, filename) => {
    eventEmitter.emit('fileEvent', eventType, filename);
});
 
setTimeout(() => {
    watcher.close();
    console.log('Monitorowanie zakończone.');
}, 5000);

//działa