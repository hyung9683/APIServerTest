import pino from 'pino';
import Pinohttp from 'pino-http';
import { Logging } from '@google-cloud/logging';

let project = process.env.GOOGLE_CLOUD_PROJECT;

export const initLogCorrelation = (projectId) => {

    project = projectId || process.env.GOOGLE_CLOUD_PROJECT;
}

const logging = new Logging();

const log = logging.log('CodeLab-Logging');

const formatters = {
    level(label) {

        return {severity: label};
    }
}

export const logger = pino({
    formatters,
    messageKey : 'message',
    hooks : {
        logMethod(args, method) {
            const entry = log.entry({}, args);
            log.write(entry);
            method.apply(this, args);
        }
    }
});

const pinoHttp = Pinohttp({
    logger : logger,
    customProps : (req, res) => {
        const traceHeader = req.headers['x-cloud-trace-context'];
        const traceId = Array.isArray(traceHeader) ? traceHeader[0] : traceHeader;
        const [traceIdPart] = (traceId ?? '').split('/');

        const trace = traceIdPart ? {'logging.googleapis.com/trace' : `projects/${project}/traces/${traceIdPart}`} : {};

        return {trace};
    }
})

export default {
    initLogCorrelation,
    logger,
    pinoHttp
}