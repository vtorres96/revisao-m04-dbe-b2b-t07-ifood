usuario - 1
produto - 1
produto - 2

pedido efetuado pelo usuário de id 1 contendo os produtos de id 1 e 2, de modo, que 
a quantidade de cada produto será 2 itens.

Segunda-feira
fechei uma venda de 2 produtos de cada um dessa lista abaixo, logo, fechei uma venda,
no valor total de 40 reais.

Terça-feira
Porém, no dia posterior a essa venda, aumentaram o preço do produto para 1000.

Quarta-feira
Gerente efetuou uma extração do relatório de vendas da Segunda-feira
Logo, para ele será exibido que foi efetuada uma venda de 2 produtos contendo 2 itens de
cada um desses produtos, e que o total da venda foi 4000

produtos

id | descricao             | quantidade_estoque | valor |
1  |  God Of War IV        | 10                 | 10
2  |  God Of War V         | 10                 | 10

pedido

id | usuario_id | observacao | valor_total |
1  |  1         | null       | 40

pedido_produtos

id | pedido_id | produto_id | quantidade_produto | valor_produto
1  | 1         | 1          | 2                  | 10
1  | 1         | 2          | 2                  | 10

n pedidos - n produtos
Quando o relacionamento entre as tabelas é N:N devemos criar uma tabela intermediária / pivot
