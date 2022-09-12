import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import conection from './db/db.js';
import closeSessions from './intervals/closeSession.intervals.js';
const MIN = 60 * 1000;
const HOUR = MIN * 60;

let db = await conection();

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

setInterval(() => {
    console.log('Encerrando Sessões!');
    closeSessions(HOUR);
    }, MIN);

app.listen(5000, () => {
    console.log('Server is listening on port 5000.');
});