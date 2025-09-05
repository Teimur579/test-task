import env from './config/env.js';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import userRoutes from './routes/userRoutes.js';
import './db/db.js';

const app = express();
const PORT = env.PORT || 3000;

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        httpOnly: true, 
        sameSite: 'strict', 
        maxAge: 30 * 24 * 60 * 60 * 1000 
    }
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use((req, res, next) => {
    console.log(`Запрос на ${req.url} с методом ${req.method}`);
    next();
});

app.disable('x-powered-by'); 

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});