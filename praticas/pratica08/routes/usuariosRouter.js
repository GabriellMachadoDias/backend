const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/login", (req, res) => {
    try {
        const token = authMiddleware.gerarToken({ email: req.body.usuario });
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ msg: "Erro ao gerar o token" });
    }
});

router.post("/renovar", authMiddleware.verificarToken, (req, res) => {
    try {
        const token = authMiddleware.gerarToken({ email: req.usuario.email });
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ msg: "Erro ao gerar o token" });
    }
});

module.exports = router;
