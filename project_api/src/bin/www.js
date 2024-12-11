import app from '../app.js';
// import {logger, initLogCorrelation} from '../utils/logging.js';
// import metadata from '../utils/metadata.js';
import {logger} from '../utils/logging.js';

// const {fetchProjectId} = metadata;

const main = async () => {

    // let project = process.env.GOOGLE_CLOUD_PROJECT || '';

    // if (!project) {

    //     try { 

    //         project = await fetchProjectId() || '';

    //         if (project) {

    //             console.log('Project ID:', project);
                
    //         } else {

    //             throw new Error('Project ID is empty');
    //         }
    //     } catch (error) {

    //         logger.warn('Cloud not fetch project Id for tracing:', error);
    //         project = 'default';
    //     }
    // }

    // initLogCorrelation(project);

    const PORT = process.env.PORT || '8080';

    app.listen(parseInt(PORT, 10), () => {

        console.log(`Listening on port ${PORT}`);
    });
}

process.on('SIGTERM', () => {

    logger.info('Caught SIGTERM.');
    logger.flush();
});

main().catch(err => {
    logger.error('An error occurred during the server initialization:', err);
})