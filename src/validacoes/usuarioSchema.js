const yup = require('yup')
const { pt } = require('yup-locales')
yup.setLocale(pt)

// nome - obrigatório e formato string
// email - obrigatório, e-mail válido e formato string
// senha - obrigatório e formato string

const usuarioSchema = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().required()
})

module.exports = usuarioSchema