const dbConnection = require("../db/dbConnection");

class ImagemModel {

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
    const sql = "SELECT IdImagem, Caminho, IdEvento FROM Imagem";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT IdImagem, Caminho, IdEvento FROM Imagem WHERE IdImagem = ?"; 
    return this.executeSQL(sql, id); 
  }

  create(novaImagem) {
    const sql = "INSERT INTO Imagem SET ?"; 
    return this.executeSQL(sql, novaImagem);
  }

  update(updateImagem, id) {
    const sql = "UPDATE Imagem SET ? WHERE IdImagem = ?";
    return this.executeSQL(sql, [updateImagem, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Imagem WHERE IdImagem = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new ImagemModel();
