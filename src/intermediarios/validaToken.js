const jwt = require('jsonwebtoken')
const chaveSecreta = require('../chaveSecreta')

const validarToken = (req, res, next) => {
    try {
        const { authorization } = req.headers

        const token = authorization.split(' ')[1]
        const usuario = jwt.verify(token, chaveSecreta)
        
        req.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    validarToken
}