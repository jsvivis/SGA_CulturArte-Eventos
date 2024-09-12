
const reacaoUsuarioModel = require("../models/reacaoUsuarioModel.js");


class ReacaoUsuarioController {
 
  readList(req, res) {
   
    const retorno = reacaoUsuarioModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhuma reação do usuário encontrada!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

 
  read(req, res) {
    
    const { id } = req.params;
    
    const retorno = reacaoUsuarioModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Reação do usuário não encontrada!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    const reqBody = req.body; 
    const retorno = reacaoUsuarioModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Reação do usuário criada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
      
    const retorno = reacaoUsuarioModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Reação do usuário atualizada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = reacaoUsuarioModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Reação do usuário deletada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new ReacaoUsuarioController();
