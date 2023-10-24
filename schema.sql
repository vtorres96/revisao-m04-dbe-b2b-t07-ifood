create database revisao_unidade_quatro;

create table usuarios (
	id serial primary key not null,
	nome text,
	email text UNIQUE,
	senha text
);

create table produtos (
	id serial primary key not null,
	descricao text,
	quantidade_estoque integer,
    valor integer
);

create table pedidos (
	id serial primary key not null,
	valor_total integer,
	observacao text,
	usuario_id integer references usuarios(id)
);

create table pedido_produtos (
	id serial primary key not null,
	quantidade_produto integer,
    valor_produto integer,
	pedido_id integer references pedidos(id),
	produto_id integer references produtos(id)
);