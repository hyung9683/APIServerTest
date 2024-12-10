import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import routes from './api/routes.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';

// 프런트와 연결
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));


// 파일 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {mountRoutes} = routes;

const app = express();

app.use(express.json());

app.use(helmet());

app.use(compression());


// 폴더가 없으면 생성
const Path = path.join(__dirname, 'public');

if (!fs.existsSync(Path)) {

    fs.mkdirSync(Path, {  recursive: true });
}

app.use('/public', express.static(Path));




mountRoutes(app);


// 포트 설정
const PORT = process.env.PORT || '8080';

app.listen(PORT, () => {
    
   console.log(`Listening on port ${PORT}`);
})

app.get('/', async(req, res) => {
    res.send('CodLab Cloud Run APi Server')
})

export default app;