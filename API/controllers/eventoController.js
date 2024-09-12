const eventoModel = require("../models/eventoModel");

class EventoController {

  readList(req, res) {
    const retorno = eventoModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhum evento encontrado")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  read(req, res) {
    const { id } = req.params;
    const retorno = eventoModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Evento não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  search(req, res) {
    
    const { id } = req.params;
    
    const retorno = eventoModel.search(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Evento não encontrado!") 
        : res.status(200).json(result)
      )
  }

  create(req, res) {
   const { Descricao, HorarioInicial, HorarioFinal, IdEspaco, Nome, PublicoTotal, Valor, IdCategoria } = req.body;

  const eventoData = {
    Descricao,
    HorarioInicial,
    HorarioFinal,
    IdEspaco,
    Nome,
    IdCategoria,
    PublicoTotal: parseInt(PublicoTotal), // Convertendo para inteiro
    Valor: parseFloat(Valor),
    IdUsuario: 1 // até a pagina de de login não estiver pronta e funcional
  };
    const retorno = eventoModel.create(eventoData);
    return retorno
      .then((result) =>
        res.status(201).send("Evento criado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const { Descricao, HorarioInicial, HorarioFinal, IdEspaco, Nome, PublicoTotal, Valor, IdCategoria, Ativo } = req.body;

    const eventoData = {
      Descricao,
      HorarioInicial,
      HorarioFinal,
      IdEspaco,
      Nome,
      IdCategoria,
      Ativo,
      PublicoTotal: parseInt(PublicoTotal), // Convertendo para inteiro
      Valor: parseFloat(Valor) // Convertendo para float
    };
    const retorno = eventoModel.update(eventoData, id);
    return retorno
      .then((result) =>
        res.status(200).send("Evento atualizado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  updateLiberar(req, res) {
    const { id } = req.params;
    const { Id } = req.body;
    const retorno = eventoModel.updateLiberar(Id, id);
    return retorno
        .then((result) => {
            if (result.affectedRows > 0) { 
                res.status(200).send("Evento atualizado com sucesso!");
            } else {
                res.status(404).send("Evento não encontrado ou não foi possível atualizar.");
            }
        })
        .catch((error) => res.status(400).json({ error: error.message }));
}

  delete(req, res) {
    const { id } = req.params;
    const retorno = eventoModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Evento deletado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new EventoController();