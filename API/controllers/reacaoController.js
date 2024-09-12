
const reacaoModel = require("../models/reacaoModel.js");


class ReacaoController {
 
  readList(req, res) {
   
    const retorno = reacaoModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhuma reação encontrada!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

 
  read(req, res) {
    
    const { id } = req.params;
    
    const retorno = reacaoModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Reação não encontrada!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  search(req, res) {
    
    const { id } = req.params;
    
    const retorno = reacaoModel.search(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Reação não encontrada!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    const reqBody = req.body; 
    const retorno = reacaoModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Reação criada com sucessa!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
      
    const retorno = reacaoModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Reação atualizada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = reacaoModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Reação deletada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new ReacaoController();
