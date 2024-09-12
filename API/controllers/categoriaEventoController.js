
const categoriaEventoModel = require("../models/categoriaEventoModel.js");


class CategoriaEventoController {
 
  readList(req, res) {
   
    const retorno = categoriaEventoModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhuma categoria para o evento!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  read(req, res) {
    
    const { id } = req.params;
    
    const retorno = categoriaEventoModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Categoria para o evento!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    const reqBody = req.body; 
    const retorno = categoriaEventoModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Categoria cadastrada para o evento com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }


  delete(req, res) {
    const { id } = req.params;
    const retorno = categoriaEventoModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Categoria deletada do evento com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new CategoriaEventoController();
