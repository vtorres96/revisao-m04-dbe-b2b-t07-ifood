# revisao-m04-dbe-b2b-t07-ifood

<summary><b>Banco de Dados</b></summary>

Crie as seguintes tabelas e colunas abaixo: 

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

-   produtos
    -   id
    -   descricao
    -   quantidade_estoque
    -   valor
-   pedidos
    -   id
    -   usuario_id
    -   observacao
    -   valor_total
-   pedido_produtos
    -   id
    -   pedido_id
    -   produto_id
    -   quantidade_produto
    -   valor_produto

<summary><b>Cadastrar Pedido</b></summary>

#### `POST` `/pedido`

Essa é a rota que será utilizada para cadastrar um novo pedido no sistema.

**Lembre-se:** Cada pedido deverá conter ao menos um produto vinculado.

**Atenção:** As propriedades produto_id e quantidade_produto devem ser informadas dentro de um array e para cada produto deverá ser criado um objeto neste array, como ilustrado no objeto de requisição abaixo.
Só deverá ser cadastrado o pedido caso todos produtos vinculados ao pedido realmente existão no banco de dados.

```javascript
// Corpo da requisição para cadastro de pedido (body)
{
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
```

Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   pedido_produtos
            -   produto_id
            -   quantidade_produto
    -   Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.
    -   Validar se existe a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição.
    -   O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados.    