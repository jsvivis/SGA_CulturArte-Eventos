const arquivoModel = require("../models/arquivoModel");

class ArquivoController {

  readList(req, res) {
    const retorno = arquivoModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhum arquivo encontrado")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  read(req, res) {
    const { id } = req.params;
    const retorno = arquivoModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Arquivo não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo enviado.');
    }

    const novoArquivo = {
      nome: req.file.filename,
      caminho: req.file.path // Caminho do arquivo no servidor
    };

    arquivoModel.create(novoArquivo)
      .then(() => res.status(201).send('Arquivo criado com sucesso!'))
      .catch((error) => res.status(400).json({ message: error.message }));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
    const retorno = arquivoModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Arquivo atualizado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = arquivoModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Arquivo deletado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new ArquivoController();