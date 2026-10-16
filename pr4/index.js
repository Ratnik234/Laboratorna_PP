import express from 'express';
import { EventEmitter } from 'events';
import chalk from 'chalk';
import logger from './logger.js';

const app = express();
const emitter = new EventEmitter();
const PORT = 3000;


emitter.on('newRequest', (url) => {
    console.log(chalk.blue(`[Event] New request received: ${url}`));
});


app.get('/', (req, res) => {
    emitter.emit('newRequest', req.url);
    logger.emit('log', { level: 'info', message: 'GET / accessed' });
    res.send('Chalk + EventEmitter + Express = ❤');
});


app.get('/info', (req, res) => {
    emitter.emit('newRequest', req.url);
    console.log(chalk.green('Info endpoint accessed!'));
    logger.emit('log', { level: 'info', message: 'Info endpoint accessed' });
    res.send('Information page logged in green color!');
});


app.use((req, res) => {
    logger.emit('log', { level: 'warning', message: `Unknown route requested: ${req.url}` });
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(chalk.yellowBright(`Server running at http://localhost:${PORT}`));
    logger.emit('log', { level: 'info', message: 'Server started successfully' });
});