const imagemModel = require("../models/imagemModel");

class ImagemController {

  readList(req, res) {
    const retorno = imagemModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhuma imagem encontrada")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  read(req, res) {
    const { id } = req.params;
    const retorno = imagemModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Imagem não encontrada!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    const reqBody = req.body; 
    const retorno = imagemModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Imagem criada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
    const retorno = imagemModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Imagem atualizada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = imagemModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Imagem deletada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new ImagemController();