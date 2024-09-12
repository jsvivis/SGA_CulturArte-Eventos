
const dbConnection = require("../db/dbConnection");


class PerfilModel {

  
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
    const sql = "SELECT IdPerfil, PerfilUsuario FROM Perfil";
    return this.executeSQL(sql); 
  }
}

module.exports = new PerfilModel();
