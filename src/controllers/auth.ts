import {Request,Response} from 'express'
import dataModel from '../../db/models/model_user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { where } from 'sequelize/types'
dotenv.config()

export const login = async(req:Request,res:Response) => {
    try {
        let username = req.body.username
        let password = req.body.password
        
        let payload = {username:username,password:password};
        let accessToken = jwt.sign(payload,process.env.ACCESS_JWT_SECRET as string,{algorithm:'HS256',expiresIn:process.env.ACCESS_JWT_LIFE});
        let refreshToken = jwt.sign(payload,process.env.REFRESH_JWT_SECRET as string,{algorithm:'HS256',expiresIn:process.env.REFRESH_JWT_LIFE});

        let dataUser = await dataModel.findAndCountAll({
            attributes:['id_user','nm_user','password','role','access_token','refresh_token'],
            where : {
                username:username
            }
        })
        
        if (dataUser.count !== 0){
            let newData = {
                'id':dataUser.rows[0].id_user,
                'nama':dataUser.rows[0].nm_user,
                'role':dataUser.rows[0].role,
                'access_token':accessToken,
                'refresh_token':refreshToken
            }

            bcrypt.compare(password,dataUser.rows[0].password,async function(err,result){
                if (dataUser.count > 0 && result === true) {
                    await dataModel.update({
                            access_token:accessToken,
                            refresh_token:refreshToken,
                            updated_by:dataUser.rows[0].nm_user
                        }
                        ,{where:{username: username}
                    });
                    res.json({
                        'statusCode':'000',
                        'message':'Berhasil login',
                        'data':newData
                    })
                } else {
                    res.json({
                        'statusCode':'111',
                        'message':'Gagal login',
                        'error':'username atau password anda salah'
                    })
                }
            })
        } else {
            res.json({
                'statusCode':'111',
                'message':'Gagal login',
                'error':'akun tidak terdaftar'
            })
        }
        
    } catch (Error) {
        res.status(500).json({
            'statusCode':'111',
            'message':'Gagal login',
            'error':Error
        })
    }
}

export const logout = async function(req:Request,res:Response){
    try {
        let id = req.body.id
        let dataUser = await dataModel.findAndCountAll({
            attributes: ['nm_user','access_token'],
            where:{id_user:id},
            raw:true
        });
        
        if (dataUser.count > 0 && dataUser.rows[0].access_token !== null) {
            await dataModel.update({
                    access_token:null,
                    refresh_token:null,
                    updated_by:dataUser.rows[0].nm_user
                }
                ,{where:{id_user: id}
            });
            res.json({
                'statusCode':'000',
                'message':'Berhasil logout'
            })
        } else {
            res.json({
                'statusCode':'111',
                'message':'Gagal logout',
                'error':'akun sudah logout sebelumnya'
            })
        }
        
    } catch (err) {
        res.json({
            'statusCode':'111',
            'message':'Gagal logout',
            'error':err
        })
    }
    
};

export const refreshToken = async function(req:Request,res:Response){
    try {
        let dataUser = await dataModel.findOne({
            where:{
                id_user:req.body.id
            },
            raw:true
        });
        
        let refreshToken = dataUser?.refresh_token;
        jwt.verify(refreshToken as string, process.env.REFRESH_JWT_SECRET as string, async (err) => {
            if (err) {
                return res.status(403).json({'statusCode':403,'message':'Forbidden. Silahkan login kembali!'});
            }
            let payload = {username:dataUser?.username,password:dataUser?.password};
            let accessToken = jwt.sign(payload,process.env.ACCESS_JWT_SECRET as string,{algorithm:'HS256',expiresIn:process.env.ACCESS_JWT_LIFE});
            
            await dataModel.update({
                    access_token:accessToken
                },
                {
                    where:{id_user:req.body.id}

                }
            )
            res.json({'statusCode':'000','message':'Berhasil refresh token','accessToken':accessToken});
        });
        
    } catch (err) {
        res.json({
            'statusCode':'111',
            'message':'Gagal generate token',
            'error':err
        })
    }
    
};