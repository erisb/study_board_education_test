import {Request,Response} from 'express'
import dataModel from '../../db/models/model_jawaban'
import dataSoal from '../../db/models/model_soal'

export const saveJawaban = async(req:Request,res:Response) => {
    try {
        let jawabanSoal = await dataSoal.findOne({
            attributes:['kunci_jwbn'],
            where:{
                id_soal:req.body.soal
            },
            raw:true
        })
        
        let nilai = jawabanSoal?.kunci_jwbn === req.body.jawaban ? '1' : '0';

        await dataModel.create({
            id_soal:req.body.soal,
            id_user:req.body.user,
            jawaban:req.body.jawaban,
            nilai: nilai,
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

export const editJawaban = async(req:Request,res:Response) => {
    try {
        let jumlahData = await dataModel.count({
            where:{id_jwbn: req.params.id}
        });
        
        if (jumlahData !== 0){
            let jawabanSoal = await dataSoal.findOne({
                attributes:['kunci_jwbn'],
                where:{
                    id_soal:req.body.soal
                },
                raw:true
            })
            
            let nilai = jawabanSoal?.kunci_jwbn === req.body.jawaban ? '1' : '0';

            await dataModel.update({
                    id_soal:req.body.soal,
                    id_user:req.body.user,
                    jawaban:req.body.jawaban,
                    nilai: nilai,
                    updated_by:req.body.updated_by
                },
                {
                    where:{id_jwbn: req.params.id}
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

export const deleteJawaban = async(req:Request,res:Response) => {
    try {
        let jumlahData = await dataModel.count({
            where:{id_jwbn: req.params.id}
        });

        if (jumlahData !== 0){
            await dataModel.destroy(
                {
                    where:{id_jwbn: req.params.id}
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