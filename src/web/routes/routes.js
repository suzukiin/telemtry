const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/', controller.getPage);
router.get('/config', controller.getPageConfig);
router.post('/salvarEquipamento', controller.saveEquipamento);
router.get('/equipamento/:id/adicionar-oid', controller.getPageAdicionarOid);
router.post('/equipamento/:id/adicionar-oid', controller.saveOid);
module.exports = router;