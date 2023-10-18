const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const knex = require('../config/conexao')
const autenticacaoSchema = require('../validacoes/autenticacaoSchema')
const chaveSecreta = require('../chaveSecreta')

const login = async (req, res, next) => {
    try {
        await autenticacaoSchema.validate(req.body)
        const { email, senha } = req.body
        
        const usuarioEncontrado = await knex('usuarios').where({ email }).first()

        if (!usuarioEncontrado) {
            return res.status(400).json({ mensagem: 'Usuário ou senha inválidos '})
        }

        const senhaConfere = await bcrypt.compare(senha, usuarioEncontrado.senha)
        
        if (!senhaConfere) {
            return res.status(400).json({ mensagem: 'Usuário ou senha inválidos '})
        }

        const token = jwt.sign(
            {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            },
            chaveSecreta,
            {
                expiresIn: '2h'
            }
        )

        const { senha: senhaNova, ...usuario } = usuarioEncontrado
        
        return res.status(200).json({
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    login
}
