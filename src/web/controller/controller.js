const dbService = require('../../services/dbService');

exports.getPage = async (req, res) => {
  try {
    const equipamentos = await dbService.getAllEquipamentos();
    const oids = await dbService.getAllOids();

    // Relaciona OIDs a cada equipamento
    const equipamentosComOids = equipamentos.map(equipamento => {
      return {
        ...equipamento,
        oids: oids.filter(oid => oid.equipamento_id === equipamento.id)
      };
    });

    res.status(200).render('home', { title: 'Home', equipamento: equipamentosComOids });
  } catch (err) {
    res.status(500).send(`error: ${err}`);
  }
}

exports.getPageConfig = async (req, res) => {
    try {
        res.status(200).render('config', { title: 'Configuração' });
    } catch (err) {
        res.status(500).send(`error: ${err}`);
    }
}

exports.getPageAdicionarOid = async (req, res) => {
    try {
        const equipamentoId = req.params.id;
        const equipamento = await dbService.getEquipamentoById(equipamentoId);
        res.render('adicionarOid', { equipamento });
    } catch (err) {
        res.status(500).send(`error: ${err}`);
    }

};

exports.saveEquipamento = async (req, res) => {
    try {
        const equipamento = req.body;
        const result = await dbService.saveEquipamento(equipamento);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(`error: ${err}`);
    }
}

exports.saveOid = async (req, res) => {
    try {
        const equipamentoId = req.params.id;
        const { oid, description, mask, type } = req.body;
        await dbService.addOidToEquipamento(equipamentoId, { oid, description, mask, type });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(`error: ${err}`);
    }
};