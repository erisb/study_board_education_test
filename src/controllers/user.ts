import {Request,Response} from 'express'
import dataModel from '../../db/models/model_user'
import bcrypt from 'bcrypt';
const salt = 10;

export const saveUser = async(req:Request,res:Response) => {
    try {
        bcrypt.hash(req.body.password,salt,async function(err,hash){
            if (err) {
                res.json({
                    'statusCode':'111',
                    'message':'Gagal simpan data',
                    'error': err
                })
            }

            await dataModel.create({
                nm_user:req.body.nama_user,
                username:req.body.username,
                password:hash,
                role:req.body.role,
                created_by:req.body.created_by,
                updated_by:req.body.updated_by
            })
            res.json({
                'statusCode':'000',
                'message':'Berhasil simpan data'
            })
        })
        
    } catch (error) {
        res.status(500).json({
            'statusCode':'111',
            'message':'Gagal simpan data',
            'error':error
        })
    }
}

export const editUser = async(req:Request,res:Response) => {
    try {
        let dataUser = await dataModel.findAndCountAll({
            attributes:['password'],
            where:{
                id_user:req.params.id
            }
        })
        
        if (dataUser.count !== 0) {
            if (req.body.password !== '') {
                bcrypt.hash(req.body.password,salt,async function(err,hash){
                    if (err) {
                        res.json({
                            'statusCode':'111',
                            'message':'Gagal simpan data',
                            'error': err
                        })
                    }
        
                    await dataModel.update({
                            nm_user:req.body.nama_user,
                            username:req.body.username,
                            password:hash,
                            role:req.body.role,
                            updated_by:req.body.updated_by
                        },
                        {
                            where:{id_user: req.params.id}
                        }
                    )
                    res.json({
                        'statusCode':'000',
                        'message':'Berhasil ubah data'
                    })
                })
            } else {
                await dataModel.update({
                        nm_user:req.body.nama_user,
                        username:req.body.username,
                        role:req.body.role,
                        updated_by:req.body.updated_by
                    },
                    {
                        where:{id_user: req.params.id}
                    }
                )
                res.json({
                    'statusCode':'000',
                    'message':'Berhasil ubah data'
                })
            }

        } else {
            res.json({
                'statusCode':'111',
                'message':'Gagal ubah data',
                'error': 'Data tidak ditemukan'
            })
        }
        
        
    } catch (error) {
        res.status(500).json({
            'statusCode':'111',
            'message':'Gagal ubah data',
            'error':error
        })
    }
}

export const deleteUser = async(req:Request,res:Response) => {
    try {
        let jumlahData = await dataModel.count({
            where:{id_user: req.params.id}
        });

        if (jumlahData !== 0){
            await dataModel.destroy(
                {
                    where:{id_user: req.params.id}
                }
            )
            res.json({
                'statusCode':'000',
                'message':'Berhasil hapus data'
            })
        } else {
            res.json({
                'statusCode':'111',
                'message':'Gagal hapus data',
                'error':'Data tidak ditemukan'
            })
        }

    } catch (error) {
        res.status(500).json({
            'statusCode':'111',
            'message':'Gagal hapus data',
            'error':error
        })
    }
}