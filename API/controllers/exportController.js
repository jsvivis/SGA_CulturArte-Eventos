
const exportModel = require("../models/exportModel");


class ExportController {
  
  todasTabelas(req, res) {
      exportModel.exportAll()
        .then(() => res.status(200).send("Dados exportados com sucesso!"))
        .catch((error) => res.status(400).json(error.message));
  }
  
  usuario(req, res) {
    const retorno = exportModel.exportToExcelUsuarios();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  perfil(req, res) {
    const retorno = exportModel.exportToExcelPerfil();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  categoria(req, res) {
    const retorno = exportModel.exportToExcelCategoria();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  espacoCultural(req, res) {
    const retorno = exportModel.exportToExcelEspacoCultural();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  espaco(req, res) {
    const retorno = exportModel.exportToExcelEspaco();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  evento(req, res) {
    const retorno = exportModel.exportToExcelEvento();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  categoriaEvento(req, res) {
    const retorno = exportModel.exportToExcelCategoriaEvento();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  arquivo(req, res) {
    const retorno = exportModel.exportToExcelArquivo();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  imagem(req, res) {
    const retorno = exportModel.exportToExcelImagem();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  link(req, res) {
    const retorno = exportModel.exportToExcelLink();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  reacao(req, res) {
    const retorno = exportModel.exportToExcelReacao();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};

  reacaoUsuario(req, res) {
    const retorno = exportModel.exportToExcelReacaoUsuario();
    return retorno
      .then((fileName) => {
        res.status(200).json({ message: `Arquivo ${fileName} criado com sucesso!` });
      })
      .catch((error) => {
        console.error("Erro ao exportar dados de usuários:", error);
        res.status(400).json({ message: error.message || "Erro ao criar arquivo Excel." });
    })};
}

module.exports = new ExportController();
