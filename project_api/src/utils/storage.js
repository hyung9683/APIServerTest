import {Storage} from '@google-cloud/storage';
import {logger} from '../utils/logging.js';

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME || 'code-lab-cloud-run-test';

const uploadFilesToGCS = async (files) => {

    if(!files || files.length === 0) {

        logger.error('No files to upload');
        throw new Error('No files to upload');
    }

    const uploadPromises = files.map((file) => {

        const blob = storage.bucket(bucketNAme).file(file.originalname);

        return new Promise((resolve, reject) => {

            const stream = blob.createWriteStream({

                metadata : {
                    contentType : file.mimetype
                },
            });

            stream.on('error', (error) => {

                logger.error(`Failed to upload ${file.originalname} : `, error);

                reject(new Error(`Failed to upload ${file.originalname}`));
            });

            stream.on('finish', async () => {

                try {

                    await blob.makePublic();

                    const url = `https://storage.googleapis.com/${bucketName}/${file.originalname}`;

                    logger.info(`Uploaded and made public ${file.originalname} : ${url}`);

                    resolve(url);
                } catch (error) {

                    logger.error(`Failed to make ${file.originalname} public :`, error);

                    reject(new Error(`Failed to make ${file.originalname} public`))
                }
            });

            stream.end(file.buffer);
        })
    });

    try {

        return await Promise.all(uploadPromises);
    } catch (error) {

        logger.error(`Failed to upload one or more files.`, error);

        throw new Error(`Failed to upload one or more files.`);
    }
};

export default uploadFilesToGCS;
