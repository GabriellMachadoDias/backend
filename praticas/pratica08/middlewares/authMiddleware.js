const jwt = require('jsonwebtoken');

function gerarToken(payload) {
    const expiresIn = 120;
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    } catch (err) {
        throw new Error("Erro ao gerar o token");
    }
}

function verificarToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: "Não autorizado" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        return next();
    } catch (err) {
        return res.status(401).json({ msg: "Token inválido" });
    }
}

module.exports = {
    gerarToken,
    verificarToken
};
