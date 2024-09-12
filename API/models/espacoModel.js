
const dbConnection = require("../db/dbConnection");


class EspacoModel {

  
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


  readList() {
    const sql = "SELECT Espaco.IdEspaco, Espaco.Nome, Espaco.Ativo, Espaco.IdEspacoCultural, EspacoCultural.Nome AS NomeEspacoCultural FROM Espaco JOIN EspacoCultural ON Espaco.IdEspacoCultural = EspacoCultural.IdEspacoCultural";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT Espaco.IdEspaco, Espaco.Nome, Espaco.Ativo, Espaco.IdEspacoCultural, EspacoCultural.Nome AS NomeEspacoCultural FROM Espaco JOIN EspacoCultural ON Espaco.IdEspacoCultural = EspacoCultural.IdEspacoCultural WHERE Espaco.IdEspacoCultural = ?"; 
    return this.executeSQL(sql, id); 
  }

  readEspaco(id) {
    const sql = "SELECT Espaco.IdEspaco, Espaco.Nome, Espaco.Ativo, Espaco.IdEspacoCultural, EspacoCultural.Nome AS NomeEspacoCultural FROM Espaco JOIN EspacoCultural ON Espaco.IdEspacoCultural = EspacoCultural.IdEspacoCultural WHERE Espaco.IdEspaco = ?"; 
    return this.executeSQL(sql, id); 
  }

  search(parametro) {
    const sql = `
      SELECT Espaco.IdEspaco, Espaco.Nome, Espaco.Ativo, Espaco.IdEspacoCultural, EspacoCultural.Nome AS NomeEspacoCultural
      FROM Espaco
      JOIN EspacoCultural ON Espaco.IdEspacoCultural = EspacoCultural.IdEspacoCultural
      WHERE Espaco.IdEspaco = ? OR Espaco.Nome LIKE ? OR EspacoCultural.Nome LIKE ?`;
    const values = [parametro, `%${parametro}%`, `%${parametro}%`];
    return this.executeSQL(sql, values);
  }

  create(novoEspaco) {
    const sql = "INSERT INTO Espaco SET ?"; 
    return this.executeSQL(sql, novoEspaco);
  }

  update(updateEspaco, id) {
    const sql = "UPDATE Espaco SET ? WHERE IdEspaco = ?";
    return this.executeSQL(sql, [updateEspaco, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Espaco WHERE IdEspaco = ?"
    return this.executeSQL(sql, id); 
  }

}

module.exports = new EspacoModel();
