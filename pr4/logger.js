import { EventEmitter } from 'events';
import chalk from 'chalk';

const logger = new EventEmitter();

logger.on('log', ({ level, message }) => {
    const time = new Date().toLocaleString();
    const timestamp = `[${time}]`;

    switch (level) {
        let logMessage;
        case 'info':
            logMessage = `${timestamp} ${chalk.green('INFO: ' + message)}`;
            console.log(logMessage);
            break;
        case 'warning':
            logMessage = `${timestamp} ${chalk.yellow('WARNING: ' + message)}`;
            console.log(logMessage);
            break;
        case 'error':
            logMessage = `${timestamp} ${chalk.red('ERROR: ' + message)}`;
            console.log(logMessage);
            break;
        default:
            console.log(`${timestamp} ${message}`);
    }
});

export default logger;