const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

router.get('/export/todastabelas', exportController.todasTabelas);
router.get('/export/usuario', exportController.usuario);
router.get('/export/perfil', exportController.perfil);
router.get('/export/categoria', exportController.categoria);
router.get('/export/espacoCultural', exportController.espacoCultural);
router.get('/export/espaco', exportController.espaco);
router.get('/export/evento', exportController.evento);
router.get('/export/categoriaEvento', exportController.categoriaEvento);
router.get('/export/arquivo', exportController.arquivo);
router.get('/export/imagem', exportController.imagem);
router.get('/export/link', exportController.link);
router.get('/export/reacao', exportController.reacao);
router.get('/export/reacaoUsuario', exportController.reacaoUsuario);

module.exports = router;
