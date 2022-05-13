import express from 'express';
import { saveRole,editRole,deleteRole } from "../controllers/role";
import { saveUser,editUser,deleteUser } from "../controllers/user";

const groupEndpoint = '/api/v1';
const routerApi = express.Router({caseSensitive:true,strict:true});
const routerAll = express.Router({caseSensitive:true,strict:true});

routerApi.post('/role',saveRole)
routerApi.put('/role/:id',editRole)
routerApi.delete('/role/:id',deleteRole)

routerApi.post('/user',saveUser)
routerApi.put('/user/:id',editUser)
routerApi.delete('/user/:id',deleteUser)

routerAll.use(groupEndpoint,routerApi);

export default routerAll;