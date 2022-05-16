import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import dataModel from '../../db/models/model_user';

const authenticateJWT = async (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        console.log(authHeader)
        const token = authHeader.split(' ')[1];
        console.log(token)
        let dataToken = await dataModel.findAndCountAll({
            attributes:['role'],
            where:{
                access_token : token
            },
            raw:true
        });
        
        if (dataToken.count !== 0 && dataToken.rows[0].role === 1)
        {
            next();
            
        } else {
            res.status(401).json({'statusCode':401,'message':'Unauthorized. Harus Administrator'});
        }
        
    } else {
        res.status(401).json({'statusCode':401,'message':'Unauthorized. Token Kosong'});
    }
};

export default authenticateJWT;