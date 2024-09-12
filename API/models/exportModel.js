
const dbConnection = require("../db/dbConnection");
const usuarioModel = require("./usuarioModel");
const perfilModel = require('./perfilModel');
const categoriaModel = require('./categoriaModel');
const espacoCulturalModel = require('./espacoCulturalModel');
const espacoModel = require('./espacoModel');
const eventoModel = require('./eventoModel');
const categoriaEventoModel = require('./categoriaEventoModel');
const arquivoModel = require('./arquivoModel');
const imagemModel = require('./imagemModel');
const linkModel = require('./linkModel');
const reacaoModel = require('./reacaoModel');
const reacaoUsuarioModel = require('./reacaoUsuarioModel');
const fs = require('fs');
const XLSX = require('xlsx');

class ExportModel {
  
  executeSQL(sql, parametros = "") {
    
    return new Promise( function (resolve, reject) {
        
       
        dbConnection.query(sql, parametros, function (error, resposta) {
          
          if (error) {
            return reject(error);
          }

          return resolve(resposta);
        });

      }
    );
  }

  async exportAll() {
    try {
      const wb = XLSX.utils.book_new();
  
      // Lista de modelos e nomes das planilhas
      const modelos = [
        { model: usuarioModel, sheetName: 'Usuarios' },
        { model: perfilModel, sheetName: 'Perfis' },
        { model: categoriaModel, sheetName: 'Categorias' },
        { model: espacoModel, sheetName: 'Espacos' },
        { model: eventoModel, sheetName: 'Eventos' },
        { model: espacoCulturalModel, sheetName: 'EspacosCultural' },
        { model: categoriaEventoModel, sheetName: 'CategoriaEvento' },
        { model: arquivoModel, sheetName: 'Arquivos' },
        { model: imagemModel, sheetName: 'Imagens' },
        { model: linkModel, sheetName: 'Links' },
        { model: reacaoModel, sheetName: 'Reacoes' },
        { model: reacaoUsuarioModel, sheetName: 'ReacaoUsuarios' }
      ];
  
      // Função auxiliar para lidar com a resposta do readList
      const getRows = async (model) => {
        const result = await model.readList();
        return Array.isArray(result) ? result : [];
      };
  
      // Loop sobre os modelos e adicionar as planilhas
      for (const { model, sheetName } of modelos) {
        const rows = await getRows(model);
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      }
  
      const fileName = `Exportacao_Completa.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados exportados para ${fileName}`);
    } catch (err) {
      console.error(`Erro ao executar consulta SQL:`, err);
    }
  }

  async exportToExcelUsuarios() {
    const nomeTabela = 'Usuarios';
    const nomePlanilha = 'Usuarios';
    try {
      // Chama o método readList do modelo para obter os dados
      const rows = await usuarioModel.readList();
  
      // Verifica se rows é uma matriz
      if (!Array.isArray(rows)) {
        throw new Error("Os dados retornados não são uma matriz.");
      }
  
      // Converte os dados para um formato de planilha
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
  
      // Define o nome do arquivo Excel
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);

      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }

  async exportToExcelPerfil() {
    const nomeTabela = 'Perfil';
    const nomePlanilha = 'Perfil';
    try {
      const rows = await perfilModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelCategoria() {
    const nomeTabela = 'Categoria';
    const nomePlanilha = 'Categoria';
    try {
      const rows = await categoriaModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelEspacoCultural() {
    const nomeTabela = 'EspacoCultural';
    const nomePlanilha = 'EspacoCultural';
    try {
      const rows = await espacoCulturalModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelEspaco() {
    const nomeTabela = 'Espaco';
    const nomePlanilha = 'Espaco';
    try {
      const rows = await espacoModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelEvento() {
    const nomeTabela = 'Evento';
    const nomePlanilha = 'Evento';
    try {
      const rows = await eventoModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelCategoriaEvento() {
    const nomeTabela = 'CategoriaEvento';
    const nomePlanilha = 'CategoriaEvento';
    try {
      const rows = await categoriaEventoModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelCategoriaEvento() {
    const nomeTabela = 'CategoriaEvento';
    const nomePlanilha = 'CategoriaEvento';
    try {
      const rows = await categoriaEventoModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelArquivo() {
    const nomeTabela = 'Arquivo';
    const nomePlanilha = 'Arquivo';
    try {
      const rows = await arquivoModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelImagem() {
    const nomeTabela = 'Imagem';
    const nomePlanilha = 'Imagem';
    try {
      const rows = await imagemModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async  exportToExcelLink() {
    const nomeTabela = 'Link';
    const nomePlanilha = 'Link';
    try {
      const rows = await linkModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelReacao() {
    const nomeTabela = 'Reacao';
    const nomePlanilha = 'Reacao';
    try {
      const rows = await reacaoModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
  async exportToExcelReacaoUsuario() {
    const nomeTabela = 'ReacaoUsuario';
    const nomePlanilha = 'ReacaoUsuario';
    try {
      const rows = await reacaoUsuarioModel.readList();
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomePlanilha);
      const fileName = `${nomeTabela}.xlsx`;
      XLSX.writeFile(wb, fileName);
      console.log(`Dados da tabela ${nomeTabela} exportados para ${fileName}`);
      return fileName;
    } catch (err) {
      console.error(`Erro ao executar consulta SQL para tabela ${nomeTabela}:`, err);
      throw err;
    }
  }
  
}

module.exports = new ExportModel();
