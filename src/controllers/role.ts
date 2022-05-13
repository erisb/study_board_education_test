import {Request,Response} from 'express'
import dataModel from '../../db/models/model_role'

export const saveRole = async(req:Request,res:Response) => {
    try {
        await dataModel.create({
            kode_role:req.body.kode_role,
            nm_role:req.body.nama_role,
            created_by:req.body.created_by,
            updated_by:req.body.updated_by
        })
        res.json({
            'statusCode':'000',
            'message':'Berhasil simpan data'
        })
    } catch (error) {
        res.status(500).json({
            'statusCode':'111',
            'message':'Gagal simpan data',
            'error':error
        })
    }
}

export const editRole = async(req:Request,res:Response) => {
    try {
        let jumlahData = await dataModel.count({
            where:{id_role: req.params.id}
        });
        
        if (jumlahData !== 0){
            await dataModel.update({
                    nm_role:req.body.nama_role,
                    updated_by:req.body.updated_by
                },
                {
                    where:{id_role: req.params.id}
                }
            )
            res.json({
                'statusCode':'000',
                'message':'Berhasil ubah data'
            })
        } else {
            res.json({
                'statusCode':'111',
                'message':'Gagal ubah data',
                'error':'Data tidak ditemukan'
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

export const deleteRole = async(req:Request,res:Response) => {
    try {
        let jumlahData = await dataModel.count({
            where:{id_role: req.params.id}
        });

        if (jumlahData !== 0){
            await dataModel.destroy(
                {
                    where:{id_role: req.params.id}
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