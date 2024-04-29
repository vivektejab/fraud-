import express from 'express';
import blackListRouter from './blacklist.routes';





export default function initRouter(app:express.Application){
    app.use('/api/v1/', blackListRouter);
}
