// root 경로를 가져오기 위해 사용
import appRoot from 'app-root-path';

// log 파일 작성
import winston from 'winston';

// log 파일을 일자별로 생성
import 'winston-daily-rotate-file';
import moment from 'moment';

const transport = new winston.transports.DailyRatateFile({
    filename: `${appRoot}/error/application-%DATE%.log`,
    maxsize: 1024,
    datePatten: 'YYYY-MM-DD-HH',

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
            return `[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${info.level}: ${info.message}`;
        })
    ),
});

const logger = winston.createLogger({
    transports: [transport],
});

export default logger;