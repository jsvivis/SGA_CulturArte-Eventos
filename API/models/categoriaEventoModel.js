const dbConnection = require("../db/dbConnection");

class CategoriaEventoModel {

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
    const sql = "SELECT CategoriaEvento.IdCategoriaEvento, CategoriaEvento.IdEvento, CategoriaEvento.IdCategoria, Evento.Nome AS NomeEvento, Categoria.Nome AS NomeCategoria, Categoria.Cor FROM  CategoriaEvento JOIN Evento ON CategoriaEvento.IdEvento = Evento.IdEvento JOIN Categoria ON CategoriaEvento.IdCategoria = Categoria.IdCategoria";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT CategoriaEvento.IdCategoriaEvento, CategoriaEvento.IdEvento, CategoriaEvento.IdCategoria, Evento.Nome AS NomeEvento, Categoria.Nome AS NomeCategoria, Categoria.Cor FROM  CategoriaEvento JOIN Evento ON CategoriaEvento.IdEvento = Evento.IdEvento JOIN Categoria ON CategoriaEvento.IdCategoria = Categoria.IdCategoria WHERE CategoriaEvento.IdCategoriaEvento = ?";
    return this.executeSQL(sql, id); 
  }

  create(novoEvento) {
    const sql = "INSERT INTO CategoriaEvento SET ?"; 
    return this.executeSQL(sql, novoEvento);
  }

  delete(id) {
    const sql = "DELETE FROM CategoriaEvento WHERE IdCategoriaEvento = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new CategoriaEventoModel();
