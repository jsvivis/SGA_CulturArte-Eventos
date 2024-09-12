const dbConnection = require("../db/dbConnection");

class LinkModel {

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
    const sql = "SELECT IdLink, Link, IdEvento FROM Link";
    return this.executeSQL(sql); 
  }

  readListId(id) {
    const sql = "SELECT IdLink, Link, IdEvento FROM Link WHERE IdEvento = ?";
    return this.executeSQL(sql, id); 
  }

  read(id) {
    const sql = "SELECT IdLink, Link, IdEvento FROM Link WHERE IdLink = ?"; 
    return this.executeSQL(sql, id); 
  }

  create(novoLink) {
    const sql = "INSERT INTO Link SET ?"; 
    return this.executeSQL(sql, novoLink);
  }

  update(updateLink, id) {
    const sql = "UPDATE Link SET ? WHERE IdLink = ?";
    return this.executeSQL(sql, [updateLink, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Link WHERE IdLink = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new LinkModel();
