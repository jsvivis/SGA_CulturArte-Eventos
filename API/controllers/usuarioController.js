
const usuarioModel = require("../models/usuarioModel");


class UsuarioController {
 
  readList(req, res) {
   
    const retorno = usuarioModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhum usuário encontrado!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

 
  read(req, res) {
    
    const { id } = req.params;
    
    const retorno = usuarioModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Usuário não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  search(req, res) {
    
    const { id } = req.params;
    
    const retorno = usuarioModel.search(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Nenhum usuário encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    const reqBody = req.body; 
    const retorno = usuarioModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Usuário criado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
      
    const retorno = usuarioModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Usuário atualizado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = usuarioModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Usuário deletado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new UsuarioController();
