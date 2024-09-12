
const dbConnection = require("../db/dbConnection");


class EspacoCulturalModel {

  
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
    const sql = "SELECT IdEspacoCultural, Nome, Cep, Endereco, Numero, Complemento, Cidade, Estado, Telefone, Email, Ativo FROM EspacoCultural";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT IdEspacoCultural, Nome, Cep, Endereco, Numero, Complemento, Cidade, Estado, Telefone, Email, Ativo FROM EspacoCultural WHERE IdEspacoCultural = ?"; 
    return this.executeSQL(sql, id); 
  }

  search(parametro) {
    const sql = `
      SELECT IdEspacoCultural, Nome, Cep, Endereco, Numero, Complemento, Cidade, Estado, Telefone, Email, Ativo
      FROM EspacoCultural
      WHERE IdEspacoCultural = ? OR Nome LIKE ? OR Email LIKE ?`;
    const values = [parametro, `%${parametro}%`, `%${parametro}%`];
    return this.executeSQL(sql, values);
  }

  create(novoEspaco) {
    const sql = "INSERT INTO EspacoCultural SET ?"; 
    return this.executeSQL(sql, novoEspaco);
  }

  update(updateEspaco, id) {
    const sql = "UPDATE EspacoCultural SET ? WHERE IdEspacoCultural = ?";
    return this.executeSQL(sql, [updateEspaco, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM EspacoCultural WHERE IdEspacoCultural = ?"
    return this.executeSQL(sql, id); 
  }

}

module.exports = new EspacoCulturalModel();
