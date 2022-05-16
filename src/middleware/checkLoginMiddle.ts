import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv';
dotenv.config();
import dataModel from '../../db/models/model_user';

const authenticateLogin = async (req:Request, res:Response, next:NextFunction) => {
    const username = req.body.username;

    if (username) {
        let dataUser = await dataModel.findAndCountAll({
            attributes:['access_token'],
            where:{
                username : username
            },
            raw:true
        });
        
        if (dataUser.count !== 0 && dataUser.rows[0].access_token !== null) {
            res.json({'statusCode':'111','message':'Gagal','error':'Anda masih login'});
        } else {
            next()
        }
        
    } else {
        res.status(401).json({'statusCode':401,'message':'Unauthorized. Token Kosong'});
    }
};

export default authenticateLogin;