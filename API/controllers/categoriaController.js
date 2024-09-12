
const categoriaModel = require("../models/categoriaModel");


class CategoriaController {
 
  readList(req, res) {
   
    const retorno = categoriaModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhuma categoria encontrada!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

 
  read(req, res) {
    
    const { id } = req.params;
    
    const retorno = categoriaModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Categoria não encontrada!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  search(req, res) {
    
    const { id } = req.params;
    
    const retorno = categoriaModel.search(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Categoria não encontrada!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    const reqBody = req.body; 
    const retorno = categoriaModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Categoria criada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
      
    const retorno = categoriaModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Categoria atualizada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = categoriaModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Categoria deletada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new CategoriaController();
