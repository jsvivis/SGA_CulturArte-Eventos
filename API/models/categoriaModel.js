const dbConnection = require("../db/dbConnection");

class CategoriaModel {

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
    const sql = "SELECT IdCategoria, Nome, Ativo, Cor FROM Categoria";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT IdCategoria, Nome, Ativo, Cor FROM Categoria WHERE IdCategoria = ?"; 
    return this.executeSQL(sql, id); 
  }

  search(parametro) {
    const sql = `
      SELECT IdCategoria, Nome, Ativo, Cor
      FROM Categoria
      WHERE IdCategoria = ? OR Nome LIKE ?`;
    const values = [parametro, `%${parametro}%`];
    return this.executeSQL(sql, values);
  }

  create(novoEvento) {
    const sql = "INSERT INTO Categoria SET ?"; 
    return this.executeSQL(sql, novoEvento);
  }

  update(updateEvento, id) {
    const sql = "UPDATE Categoria SET ? WHERE IdCategoria = ?";
    return this.executeSQL(sql, [updateEvento, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Categoria WHERE IdCategoria = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new CategoriaModel();
