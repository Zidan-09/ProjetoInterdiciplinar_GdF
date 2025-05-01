import { Request, Response, Router } from "express";

export const homeRouter = Router();

homeRouter.get('/', (req: Request, res: Response) => {
    res.send('API NO AR')
})

export default homeRouter;