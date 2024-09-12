
const espacoCulturalModel = require("../models/espacoCulturalModel.js");


class EspacoCulturalController {
 
  readList(req, res) {
   
    const retorno = espacoCulturalModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhum espaço cultural encontrado!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

 
  read(req, res) {
    
    const { id } = req.params;
    
    const retorno = espacoCulturalModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Espaço cultural não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  search(req, res) {
    
    const { id } = req.params;
    
    const retorno = espacoCulturalModel.search(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Espaço cultural não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    const reqBody = req.body; 
    const retorno = espacoCulturalModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Espaço cultural criado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
      
    const retorno = espacoCulturalModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Espaço cultural atualizado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = espacoCulturalModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Espaço cultural deletado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new EspacoCulturalController();
