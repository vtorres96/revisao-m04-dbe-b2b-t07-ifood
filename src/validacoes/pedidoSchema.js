const yup = require('yup')
const { pt } = require('yup-locales')
yup.setLocale(pt)

// observacao - não é obrigatório, caso não seja informado,
// podemos atribuir um valor padrão / default de uma string vazia
// Porém, caso essa propriedade seja informada, deverá ser string.

// pedido_produtos - 
//     - ser informado em formato de array
//     - deve existir para cada objeto que refere-se a um produto,
//     duas propriedades, sendo elas: `produto_id` e `quantidade_produto`
//     - conter ao menos um produto vinculado

// Array - OK 
//     -> objetos OK
//     -> cada objeto deve possui apenas: `produto_id` e `quantidade_produto` OK
//     -> deve conter ao menos um produto vinculado
//     -> obrigatório

const pedidoSchema = yup.object({
    observacao: yup.string().default(''),
    pedido_produtos: yup.array().of(
        yup.object({
            produto_id: yup.number().positive().integer().required() ,
            quantidade_produto: yup.number().positive().integer().required() 
        }) 
    )
    .min(1)
    .required()
})

module.exports = pedidoSchema