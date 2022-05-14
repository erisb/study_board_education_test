import {Request,Response,NextFunction} from 'express'

const checkJson = (req:Request, res:Response, next:NextFunction) => {
    if (req.get('content-type') !== 'application/json' || req.get('Content-Type') !== 'application/json') {
        res.status(400).json({'statusCode':801,'message':'Server requires application/json'})
    } else if (Object.keys(req.body).length === 0) {
        res.status(400).json({'statusCode':802,'message':'Request only JSON'})
    } else {
        next()
    }
}

export default checkJson;