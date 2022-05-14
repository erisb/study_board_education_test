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
            where:{
                access_token : token
            }
        });
        
        if (dataToken.count !== 0)
        {
            try {
                jwt.verify(token, process.env.ACCESS_JWT_SECRET as string);
                    
                next();

            } catch(e) {
                res.status(403).json({'statusCode':403,'message':'Forbidden'});
            }
            
        } else {
            res.status(401).json({'statusCode':401,'message':'Unauthorized. Token Salah'});
        }
        
    } else {
        res.status(401).json({'statusCode':401,'message':'Unauthorized. Token Kosong'});
    }
};

export default authenticateJWT;