import {Op} from 'sequelize'
import {raw, Request,Response} from 'express'
import dataModel from '../../db/models/model_soal'
import dataJawaban from '../../db/models/model_jawaban'
import dataUser from '../../db/models/model_user'

export const saveSoal = async(req:Request,res:Response) => {
    try {
        await dataModel.create({
            detail:req.body.detail_soal,
            pilihan_jwbn:req.body.pilihan_jawaban,
            kunci_jwbn:req.body.kunci_jawaban,
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

export const editSoal = async(req:Request,res:Response) => {
    try {
        let jumlahData = await dataModel.count({
            where:{id_soal: req.params.id}
        });
        
        if (jumlahData !== 0){
            await dataModel.update({
                    detail:req.body.detail_soal,
                    pilihan_jwbn:req.body.pilihan_jawaban,
                    kunci_jwbn:req.body.kunci_jawaban,
                    updated_by:req.body.updated_by
                },
                {
                    where:{id_soal: req.params.id}
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

export const deleteSoal = async(req:Request,res:Response) => {
    try {
        let jumlahData = await dataModel.count({
            where:{id_soal: req.params.id}
        });

        if (jumlahData !== 0){
            await dataModel.destroy(
                {
                    where:{id_soal: req.params.id}
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

export const allSoal = async(req:Request,res:Response) => {
    try {
        
        let dataSoal = await dataModel.findAll({
            attributes:['detail','pilihan_jwbn','kunci_jwbn'],
            order:[
                ['id_soal','ASC']
            ] 
        })

        let newData : {soal:string,pilihan_jawaban:string,kunci_jawaban:string}[] = []
        dataSoal.map(item => {
            newData = [...newData,
                {
                    'soal':item.detail,
                    'pilihan_jawaban':item.pilihan_jwbn,
                    'kunci_jawaban':item.kunci_jwbn
                }
            ]
        })

        res.json({
            'statusCode':'000',
            'message':'Berhasil',
            'data':newData
        })

    } catch (error) {
        res.status(500).json({
            'statusCode':'111',
            'message':'Gagal',
            'error':error
        })
    }
}

export const allSoalNotAnswered = async(req:Request,res:Response) => {
    try {
        let jawaban = await dataJawaban.findAll({
            attributes:['id_soal'],
            where:{
                id_user:req.body.user
            },
            raw:true
        })
        let newJawaban : Array<number> = []
        jawaban.map(item => {
            newJawaban = [...newJawaban,item.id_soal]
        })
        
        let dataSoal = await dataModel.findAll({
            attributes:['detail','pilihan_jwbn','kunci_jwbn'],
            where:{
                id_soal:{
                    [Op.notIn]:newJawaban
                }
            },
            order:[
                ['id_soal','ASC']
            ] 
        })

        let newData : {soal:string,pilihan_jawaban:string,kunci_jawaban:string}[] = []

        dataSoal.map(item => {
            newData = [...newData,
                {
                    'soal':item.detail,
                    'pilihan_jawaban':item.pilihan_jwbn,
                    'kunci_jawaban':item.kunci_jwbn
                }
            ]
        })

        res.json({
            'statusCode':'000',
            'message':'Berhasil',
            'data':newData
        })

    } catch (error) {
        res.status(500).json({
            'statusCode':'111',
            'message':'Gagal',
            'error':error
        })
    }
}

export const allSoalAnswered = async(req:Request,res:Response) => {
    try {
        let jawaban = []
        jawaban = await dataJawaban.findAll({
            attributes:['jawaban','nilai'],
            where:{
                id_user:req.body.user
            },
            include:[
                {
                    model:dataModel,
                    attributes:['detail','pilihan_jwbn'],
                    as:'jwbnSoal',
                    required:true
                },
                {
                    model:dataUser,
                    attributes:['username'],
                    as:'jwbnUser',
                    required:true
                }
            ],
            order:[
                ['id_jwbn','ASC']
            ]
        })
        let newJawaban : {jawaban:string,nilai:string,jwbnSoal:{detail:string,pilihan_jwbn:string},jwbnUser:{username:string}}[] = JSON.parse(JSON.stringify(jawaban))
        
        let newData : {soal:string,pilihan_jawaban:string,jawaban:string,username:string,nilai:string}[] = []

        newJawaban.map(item => {
            newData = [...newData,
                {
                    'soal':item.jwbnSoal.detail,
                    'pilihan_jawaban':item.jwbnSoal.pilihan_jwbn,
                    'jawaban':item.jawaban,
                    'username':item.jwbnUser.username,
                    'nilai':item.nilai
                }
            ]
        })

        res.json({
            'statusCode':'000',
            'message':'Berhasil',
            'data':newData
        })

    } catch (error) {
        res.status(500).json({
            'statusCode':'111',
            'message':'Gagal',
            'error':error
        })
    }
}

export const allPoinUser = async(req:Request,res:Response) => {
    try {
        let user = []
        user = await dataUser.findAll({
            attributes:['username'],
            where:{
                role:{
                    [Op.notIn]:[1]
                }
            },
            include:[
                {
                    model:dataJawaban,
                    attributes:['nilai'],
                    as:'userJwbn'
                }
            ],
            order:[
                ['id_user','ASC']
            ]
        })
        let newUser:{username:string,userJwbn:{nilai:string}[]}[]  = JSON.parse(JSON.stringify(user))
        
        let newData : {username:string,total_nilai:number}[] = []

        newUser.map(item => {
            let totalNilai = 0
            
            for(var i=0;i<Object.keys(item.userJwbn).length;i++){
                totalNilai += parseInt(item.userJwbn[i].nilai)
            }
            
            newData = [...newData,
                {
                    'username':item.username,
                    'total_nilai':totalNilai
                }
            ]
        })

        res.json({
            'statusCode':'000',
            'message':'Berhasil',
            'data':newData
        })

    } catch (error) {
        res.status(500).json({
            'statusCode':'111',
            'message':'Gagal',
            'error':error
        })
    }
}