import express from 'express';
import Req from '../middleware/reqMiddle'
import Auth from '../middleware/authMiddle'
import { saveRole,editRole,deleteRole } from "../controllers/role";
import { saveUser,editUser,deleteUser } from "../controllers/user";
import { login,logout,refreshToken } from "../controllers/auth"

const groupEndpoint = '/api/v1';
const routerApi = express.Router({caseSensitive:true,strict:true});
const routerAll = express.Router({caseSensitive:true,strict:true});

routerApi.post('/role',Auth,Req,saveRole)
routerApi.put('/role/:id',Auth,Req,editRole)
routerApi.delete('/role/:id',Auth,deleteRole)

routerApi.post('/user',Auth,Req,saveUser)
routerApi.put('/user/:id',Auth,Req,editUser)
routerApi.delete('/user/:id',Auth,deleteUser)

routerApi.post('/login',Req,login)
routerApi.post('/logout',Req,logout)
routerApi.post('/refresh/token',Req,refreshToken)

routerAll.use(groupEndpoint,routerApi);

export default routerAll;