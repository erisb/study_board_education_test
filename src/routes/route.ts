import express from 'express';
import Req from '../middleware/reqMiddle'
import Auth from '../middleware/authMiddle'
import checkAdmin from '../middleware/checkAdminMiddle'
import checkLogin from '../middleware/checkLoginMiddle'
import { saveRole,editRole,deleteRole } from "../controllers/role";
import { saveUserAdmin,saveUserBiasa,editUser,deleteUser } from "../controllers/user";
import { login,logout,refreshToken } from "../controllers/auth"
import { saveSoal,editSoal,deleteSoal,allSoal,allSoalNotAnswered,allSoalAnswered,allPoinUser } from "../controllers/soal"
import { saveJawaban,editJawaban,deleteJawaban } from "../controllers/jawaban"

const groupEndpoint = '/api/v1';
const routerApi = express.Router({caseSensitive:true,strict:true});
const routerAll = express.Router({caseSensitive:true,strict:true});

routerApi.post('/role',Auth,Req,saveRole)
routerApi.put('/role/:id',Auth,Req,editRole)
routerApi.delete('/role/:id',Auth,deleteRole)

routerApi.post('/user/admin',Auth,checkAdmin,Req,saveUserAdmin)
routerApi.post('/user/biasa',Auth,Req,saveUserBiasa)
routerApi.put('/user/:id',Auth,checkAdmin,Req,editUser)
routerApi.delete('/user/:id',Auth,checkAdmin,deleteUser)

routerApi.post('/login',checkLogin,Req,login)
routerApi.post('/logout',Req,logout)
routerApi.post('/refresh/token',Req,refreshToken)

routerApi.post('/soal',Auth,checkAdmin,Req,saveSoal)
routerApi.put('/soal/:id',Auth,checkAdmin,Req,editSoal)
routerApi.delete('/soal/:id',Auth,checkAdmin,deleteSoal)
routerApi.get('/soal',Auth,checkAdmin,allSoal)
routerApi.post('/soal/not/answered',Auth,Req,allSoalNotAnswered)
routerApi.post('/soal/answered',Auth,Req,allSoalAnswered)

routerApi.get('/nilai/user',Auth,checkAdmin,allPoinUser)

routerApi.post('/jawaban',Auth,Req,saveJawaban)
routerApi.put('/jawaban/:id',Auth,Req,editJawaban)
routerApi.delete('/jawaban/:id',Auth,deleteJawaban)

routerAll.use(groupEndpoint,routerApi);

export default routerAll;