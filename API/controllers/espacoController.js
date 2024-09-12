
const espacoModel = require("../models/espacoModel");


class EspacoController {
 
  readList(req, res) {
   
    const retorno = espacoModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhum espaço encontrado!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

 
  read(req, res) {
    
    const { id } = req.params;
    
    const retorno = espacoModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Espaço não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  readEspaco(req, res) {
    
    const { id } = req.params;
    
    const retorno = espacoModel.readEspaco(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Espaço não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  search(req, res) {
    
    const { id } = req.params;
    
    const retorno = espacoModel.search(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Espaço não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }


  create(req, res) {
    const reqBody = req.body; 
    const retorno = espacoModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Espaço criado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
      
    const retorno = espacoModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Espaço atualizado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = espacoModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Espaço deletado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new EspacoController();
