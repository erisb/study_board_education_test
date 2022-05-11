import express,{Express,Request,Response} from 'express';
import dotenv from 'dotenv';
import connection from './db/connectDB';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/',(req: Request,res: Response) => {
    res.send('Test Code Express');
});

app.listen(port,() => {
    connection
    console.log(`[server] : Server is running at https://localhost:${port}`);
});
