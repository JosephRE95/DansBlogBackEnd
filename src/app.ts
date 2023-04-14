import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import { db } from './models';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';
import searchRoute from './routes/searchRoute'

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');           
const corsOptions = {
    origin: [ 'http://localhost:4200', 'http://localhost:3000' ]
};
app.use(cors(corsOptions));

// routes
app.use('/api/posts/search', searchRoute)
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

// Syncing our database
db.sync({ alter: true }).then(() => {
    console.info("connected to the database!")
});

app.listen(8800);