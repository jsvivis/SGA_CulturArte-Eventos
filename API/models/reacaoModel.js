const dbConnection = require("../db/dbConnection");

class ReacaoModel {

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
    const sql = "SELECT IdReacao, Nome, Emoticon,Ativo FROM Reacao";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT IdReacao, Nome, Emoticon, Ativo FROM Reacao WHERE IdReacao = ?"; 
    return this.executeSQL(sql, id); 
  }

  search(parametro) {
    const sql = `
      SELECT IdReacao, Nome, Emoticon, Ativo
      FROM Reacao
      WHERE IdReacao = ? OR Nome LIKE ?`;
    const values = [parametro, `%${parametro}%`];
    return this.executeSQL(sql, values);
  }

  create(novaReacao) {
    const sql = "INSERT INTO Reacao SET ?"; 
    return this.executeSQL(sql, novaReacao);
  }

  update(updateReacao, id) {
    const sql = "UPDATE Reacao SET ? WHERE IdReacao = ?";
    return this.executeSQL(sql, [updateReacao, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Reacao WHERE IdReacao = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new ReacaoModel();
