const express = require('express');
const router = express.Router();

const autenticacaoControlador = require('../controladores/autenticacao');
const usuarioControlador = require('../controladores/usuario');
const pedidoControlador = require('../controladores/pedido');

const { validarToken } = require('../intermediarios/validaToken');

router.post('/usuario', usuarioControlador.salvar);
router.post('/login' , autenticacaoControlador.login);

router.use(validarToken);

router.get('/usuario', usuarioControlador.detalhar);
router.post('/pedido', pedidoControlador.salvar);

module.exports = router;
