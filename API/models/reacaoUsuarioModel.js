
const dbConnection = require("../db/dbConnection");


class ReacaoUsuarioModel {

  
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
    const sql =`SELECT 
        ReacaoUsuario.IdReacaoUsuario, ReacaoUsuario.IdReacao, ReacaoUsuario.IdUsuario, ReacaoUsuario.IdEvento, Usuario.Nome AS NomeUsuario, Evento.Nome AS NomeEvento, Reacao.Nome AS NomeReacao, Reacao.Emoticon 
    FROM  
        ReacaoUsuario 
    JOIN Usuario ON ReacaoUsuario.IdUsuario = Usuario.IdUsuario
    JOIN Evento ON ReacaoUsuario.IdEvento = Evento.IdEvento
    JOIN Reacao ON ReacaoUsuario.IdReacao = Reacao.IdReacao
`;
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = `SELECT 
        ReacaoUsuario.IdReacaoUsuario, ReacaoUsuario.IdReacao, ReacaoUsuario.IdUsuario, ReacaoUsuario.IdEvento, Usuario.Nome AS NomeUsuario, Evento.Nome AS NomeEvento, Reacao.Nome AS NomeReacao, Reacao.Emoticon 
    FROM  
        ReacaoUsuario 
    JOIN Usuario ON ReacaoUsuario.IdUsuario = Usuario.IdUsuario
    JOIN Evento ON ReacaoUsuario.IdEvento = Evento.IdEvento
    JOIN Reacao ON ReacaoUsuario.IdReacao = Reacao.IdReacao
    WHERE ReacaoUsuario.IdReacaoUsuario = ?
`; 
    return this.executeSQL(sql, id); 
  }

  create(novoUsuario) {
    const sql = "INSERT INTO ReacaoUsuario SET ?"; 
    return this.executeSQL(sql, novoUsuario);
  }

  update(updateUsuario, id) {
    const sql = "UPDATE ReacaoUsuario SET ? WHERE IdReacaoUsuario = ?";
    return this.executeSQL(sql, [updateUsuario, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM ReacaoUsuario WHERE IdReacaoUsuario = ?"
    return this.executeSQL(sql, id); 
  }

}

module.exports = new ReacaoUsuarioModel();
