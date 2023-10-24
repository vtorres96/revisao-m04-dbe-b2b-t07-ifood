const { array } = require('yup')
const knex = require('../config/conexao')
const pedidoSchema = require('../validacoes/pedidoSchema')

const salvar = async (req, res, next) => {
    // 1 - validar existência do produto e validar quantidade de produto desejada na compra
    //     a - validar se todos os valores recebidos na propriedade `produto_id`,
    //     se realmente pertencem a um produto existente no banco de dados, caso,
    //     não exista o produto, deveremos criar uma mensagem de validação, e armazená-la
    //     em um array. OK
    //     b - Caso o produto em questão exista, iremos aplicar uma condição de validação,
    //     para analisar se a quantidade informada na propriedade `quantidade_produto`,
    //     é maior que a quantidade que temos em estoque, e para isso podemos obter a quantidade
    //     dentro da tabela `produtos` na coluna `quantidade_estoque`.
    //     Basta comparar esses valores. OK
    // 2 - registrar pedido (inserir registro na tabela pedidos) OK
    // 3 - registrar itens/produtos vinculados e que compõe o pedido (inserir registro na tabela pedido_produtos) OK
    // 4 - diminuir a quantidade em estoque dos produtos que foram vendidos

    try {
        await pedidoSchema.validate(req.body)
        const { observacao, pedido_produtos } = req.body
        const usuarioId = req.usuario.id
        let erros = []
        let valorTotal = 0

        for (const item of pedido_produtos) {
            let produtoCorrente = await knex('produtos')
                .where('id', '=', item.produto_id)
                .first()

            if (!produtoCorrente) {
                erros.push({
                    mensagem: `Não existe produto para o produto_id informado: ${item.produto_id}`
                })
                // Continue - é implementado geralmente para avançar ao próximo item do array
                // e encerra o processamento do restante do código dentro do loop,
                // somente para o item corrente que é o item que é considerado o item atual
                // no momento em que o array está percorrendo
                // encerre o processamento do código para o item aqui e avance para o próximo item
                continue
            }

            if (item .quantidade_produto > produtoCorrente.quantidade_estoque) {
                erros.push({
                    mensagem: `A quantidade solicitada: ${item.quantidade_produto} para o produto de ID: ${produtoCorrente.id} é maior que a quantidade atual em estoque: ${produtoCorrente.quantidade_estoque}`
                })
                // Continue - é implementado geralmente para avançar ao próximo item do array
                // e encerra o processamento do restante do código dentro do loop,
                // somente para o item corrente que é o item que é considerado o item atual
                // no momento em que o array está percorrendo
                // encerre o processamento do código para o item aqui e avance para o próximo item
                continue
            }

            valorTotal += produtoCorrente.valor * item.quantidade_produto
            // adicionar na propriedade item, ou seja, as propriedades `valor_produto` e `quantidade_estoque`
            // a fim de poupar uma nova consulta no banco de dados para obter esses valores novamente,
            // senão teríamos que efetuar uma nova consulta na tabela produtos baseando-se no id no for...of mais abaixo
            item.valor_produto = produtoCorrente.valor
            item.quantidade_estoque = produtoCorrente.quantidade_estoque
        }

        if (erros.length > 0) {
            console.log({ erros })
            return res.status(400).json({ erros })
        }

        const pedido = await knex('pedidos')
            .insert({
                usuario_id: usuarioId,
                observacao: observacao,
                valor_total: valorTotal
            })
            .returning('*')

        for (const item of pedido_produtos) {
            await knex('pedido_produtos')
                .insert({
                    pedido_id: pedido[0].id,
                    produto_id: item.produto_id,
                    quantidade_produto: item.quantidade_produto,
                    valor_produto: item.valor_produto
                })

            let quantidadeReduzida = item.quantidade_estoque - item.quantidade_produto

            await knex('produtos')
                .where('id', '=', item.produto_id)
                .update({
                    quantidade_estoque: quantidadeReduzida
                })
        }

        return res.status(201).json({ mensagem: "Pedido gerado com sucesso" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    salvar
}
