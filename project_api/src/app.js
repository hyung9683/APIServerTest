import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import routes from './api/routes.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';




// 파일 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const {mountRoutes} = routes;

const app = express();



const corsOptions = {
    origin : process.env.NODE_ENV === 'production' ? ['https://react-annhyung-dot-winged-woods-442503-f1.du.r.appspot.com/bldg_map'] : 'http://localhost:5173',
    credentials : true,
    allowedHeaders : ['Content-Type', 'Authorization'],
};

// 프런트와 연결
app.use(cors(corsOptions));

app.use(express.json());

app.use(helmet());

app.use(compression());


// 폴더가 없으면 생성
const Path = path.join(__dirname, 'public');

if (!fs.existsSync(Path)) {

    fs.mkdirSync(Path, {  recursive: true });
}

app.use('/public', express.static(Path));

const Dist = path.join(__dirname, '../../project_react/dist');

app.use(express.static(Dist));


mountRoutes(app);

app.get('/', async(req, res) => {

    res.send('CodLab Cloud Run APi Server');
    
})

app.get('*', (req, res) => {
    res.sendFile(path.join(Dist,'index.html'));
});







// 포트 설정
// const PORT = process.env.PORT || '8080';

// app.listen(PORT, () => {
    
//    console.log(`Listening on port ${PORT}`);
// })



export default app;