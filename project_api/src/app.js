import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import routes from './api/routes.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import logger from './error/logger.js';




// 파일 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const {mountRoutes} = routes;

const app = express();



const corsOptions = {
    origin : ['https://react-annhyung-dot-winged-woods-442503-f1.du.r.appspot.com', 'http://localhost:5173'],
    credentials : true
    
}

console.log(corsOptions.origin);




// 프런트와 연결
app.use(cors(corsOptions));

//gpt보고 다시 수정하기
// app.use((req, res, next) => {
//     const origin = req.headers.origin || req.hostname;

//     if (origin === 'https://react-annhyung-dot-winged-woods-442503-f1.du.r.appspot.com') {
//         process.env.NODE_ENV = 'production';
//     } else {
//         process.env.NODE_ENV = 'development';
//     }
//     next();
// });

app.use(express.json());

app.use(helmet());

app.use(compression());


// 폴더가 없으면 생성
const Path = path.join(__dirname, 'public');

app.use('/public', express.static(Path));

// const Path = process.env.NODE_ENV === 'production' ? path.join(__dirname, 'src', 'public') : path.join(__dirname, 'public');


console.log('Current Working Directory:', process.cwd());
console.log('Resolved Path:', Path);


// if (!fs.existsSync(Path)) {

//     fs.mkdirSync(Path, {  recursive: true });
// }

console.log('File exists:', fs.existsSync(Path));

// app.use(express.static(Path));

const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));



app.get('/', async(req, res) => {

    res.json({message : 'CodLab Cloud Run APi Server'});
    
})

mountRoutes(app);


app.get('*', (req, res) => {
    res.sendFile(path.join(distPath,'index.html'));
});








// 포트 설정
// const PORT = process.env.PORT || '8080';

// app.listen(PORT, () => {
    
//    console.log(`Listening on port ${PORT}`);
// })



export default app;