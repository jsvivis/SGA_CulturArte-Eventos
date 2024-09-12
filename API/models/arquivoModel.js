const dbConnection = require("../db/dbConnection");

class ArquivoModel {

  executeSQL(sql, parametros = "") {
    return new Promise(function (resolve, reject) {
      dbConnection.query(sql, parametros, function (error, resposta) {
        if (error) {
          return reject(error);
        }
        return resolve(resposta);
      });
    });
  }

  readList() {
    const sql = "SELECT IdArquivo, Caminho, IdEvento FROM Arquivo";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT IdArquivo, Caminho, IdEvento FROM Arquivo WHERE IdArquivo = ?"; 
    return this.executeSQL(sql, id); 
  }

  create(novoArquivo) {
    const sql = 'INSERT INTO Arquivo SET ?';
    return db.query(sql, novoArquivo);
  }

  update(updateArquivo, id) {
    const sql = "UPDATE Arquivo SET ? WHERE IdArquivo = ?";
    return this.executeSQL(sql, [updateArquivo, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Arquivo WHERE IdArquivo = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new ArquivoModel();
