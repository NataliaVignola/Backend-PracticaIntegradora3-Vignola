import { createLogger, format as _format, transports as _transports } from 'winston';

const logLevels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
};

const logger = createLogger({
    levels: logLevels,
    format: _format.json(),
    transports: [
        new _transports.Console({
            level: 'debug',
            format: _format.combine(
                _format.colorize(),
                _format.simple()
            ),
        }),
        new _transports.File({
            level: 'error',
            filename: 'logs/errors.log',
            format: _format.combine(
                _format.timestamp(),
                _format.json()
            ),
        }),
    ],
});

export default logger;
