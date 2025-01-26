import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes.js'
import dotenv from 'dotenv';


const app = express();


dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json())
const corsConfig = {
    origin: true,
    credentials: true
};
app.use(cors(corsConfig));

app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);

app.use('/', (req, res) => {
    res.status(404).json({ message: 'The requested URL could not found on this server' });
})


app.use('*', (req, res) => {
    res.status(404).json({ message: 'Resource not found' });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})