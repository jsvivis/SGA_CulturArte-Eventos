const linkModel = require("../models/linkModel");

class LinkController {

  readList(req, res) {
    const retorno = linkModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhum link encontrado")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  readListId(req, res) {
    const { id } = req.params;
    const retorno = linkModel.readListId(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Link não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  read(req, res) {
    const { id } = req.params;
    const retorno = linkModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Link não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    const reqBody = req.body; 
    const retorno = linkModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Link criado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
    const retorno = linkModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Link atualizado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = linkModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Link deletado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new LinkController();