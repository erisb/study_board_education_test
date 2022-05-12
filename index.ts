import express,{Express,Request,Response,NextFunction} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './db/connectDB';
import routes from './src/routes/route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors<Request>());
app.use(routes);

app.use(function(req:Request, res:Response, next:NextFunction) {
    res.status(404).json({'statusCode':404,'message':'HTTP not found'})
})

connection;
app.listen(port,() => {
    console.log(`[server] : Server is running at https://localhost:${port}`);
});
