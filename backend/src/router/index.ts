import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('API funcionando!');
});

router.get('/hello', (req, res) => {
    res.json({message: 'hello world!'});
});

export default router;