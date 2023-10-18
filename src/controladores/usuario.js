const bcrypt = require('bcrypt')
const knex = require('../config/conexao')
const usuarioSchema = require('../validacoes/usuarioSchema')

const salvar = async (req, res, next) => {
    try {
        await usuarioSchema.validate(req.body)
        const { nome, email, senha } = req.body
    
        const usuario = await knex('usuarios').where({ email }).first()

        if (usuario) {
            return res.status(400).json({
                mensagem: 'O e-mail informado já pertence a outro usuário'
            })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioCadastrado = await knex('usuarios').insert({
            nome: nome,
            email: email,
            senha: senhaCriptografada
        }).returning(['id', 'nome', 'email'])
        
        return res.status(201).json(usuarioCadastrado)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const detalhar = async (req, res, next) => {
    try {
        const usuario = req.usuario
        
        return res.status(200).json(usuario)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    salvar,
    detalhar
}