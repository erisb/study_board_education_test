import express from 'express';
import { saveRole,editRole,deleteRole } from "../controllers/role";

const groupEndpoint = '/api/v1';
const routerApi = express.Router({caseSensitive:true,strict:true});
const routerAll = express.Router({caseSensitive:true,strict:true});

routerApi.post('/role',saveRole)
routerApi.put('/role/:id',editRole)
routerApi.delete('/role/:id',deleteRole)

routerAll.use(groupEndpoint,routerApi);

export default routerAll;