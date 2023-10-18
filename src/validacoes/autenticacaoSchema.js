const yup = require('yup')
const { pt } = require('yup-locales')
yup.setLocale(pt)

// email - obrigatório, e-mail válido e formato string
// senha - obrigatório e formato string

const autenticacaoSchema = yup.object({
    email: yup.string().email().required(),
    senha: yup.string().required()
})

module.exports = autenticacaoSchema