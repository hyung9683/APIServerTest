import express from 'express';
import compression from 'compression'
import helmet from 'helmet'
import routes from './api/routes.js'
// import path from 'path'

const {mountRoutes} = routes;

const app = express();

app.use(express.json());

app.use(helmet());

app.use(compression());

// app.use(express.static(path.join(__dirname, 'public')));


mountRoutes(app);

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
    
   console.log(`Listening on port ${PORT}`);
})

app.get('/', async(req, res) => {
    res.send('CodLab Cloud Run APi Server')
})

export default app;