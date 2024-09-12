
const perfilModel = require("../models/perfilModel");


class PerfilController {
 
  readList(req, res) {
   
    const retorno = perfilModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhum perfil encontrado!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }
}

module.exports = new PerfilController();
