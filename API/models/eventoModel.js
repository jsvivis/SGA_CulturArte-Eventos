const dbConnection = require("../db/dbConnection");

class EventoModel {

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
    const sql = `
      SELECT 
        Evento.IdEvento, 
        Evento.Nome, 
        Evento.Descricao, 
        Evento.HorarioInicial, 
        Evento.HorarioFinal, 
        Evento.Valor, 
        Evento.PublicoTotal, 
        Evento.Ativo, 
        Evento.IdUsuario, 
        Evento.IdCategoria, 
        Evento.IdEspaco, 
        UsuarioCriador.Nome AS NomeUsuario, 
        Espaco.Nome AS NomeEspaco, 
        EspacoCultural.Estado AS EstadoEspacoCultural,
        EspacoCultural.IdEspacoCultural,
        EspacoCultural.Nome as NomeEspacoCultural,
        EspacoCultural.Cidade AS CidadeEspacoCultural,
        EspacoCultural.Endereco AS EnderecoEspacoCultural,
        Categoria.Nome AS NomeCategoria, 
        Categoria.Cor AS CorCategoria
      FROM 
        Evento
        JOIN Usuario AS UsuarioCriador ON Evento.IdUsuario = UsuarioCriador.IdUsuario
        JOIN Espaco ON Evento.IdEspaco = Espaco.IdEspaco
        JOIN Categoria ON Evento.IdCategoria = Categoria.IdCategoria
        JOIN EspacoCultural ON Espaco.IdEspacoCultural = EspacoCultural.IdEspacoCultural
    `;
    return this.executeSQL(sql); 
  }  

  read(id) {
    const sql = `
      SELECT 
        Evento.IdEvento, Evento.Nome, Evento.Descricao, Evento.HorarioInicial, Evento.HorarioFinal, Evento.Valor,    
        Evento.Publico, Evento.PublicoTotal, Evento.Ativo, Evento.IdUsuario, Evento.IdEspaco, Evento.IdCategoria,
        UsuarioCriador.Nome AS NomeUsuario,
        Espaco.Nome AS NomeEspaco, Espaco.IdEspacoCultural,
        EspacoCultural.Nome AS NomeEspacoCultural,
        Evento.Liberado, UsuarioLiberacao.Nome AS NomeUsuarioLiberacao,
        Categoria.Nome AS NomeCategoria, Categoria.Cor AS CorCategoria
      FROM Evento 
      JOIN Usuario AS UsuarioCriador ON Evento.IdUsuario = UsuarioCriador.IdUsuario 
      JOIN Espaco ON Evento.IdEspaco = Espaco.IdEspaco 
      JOIN EspacoCultural ON Espaco.IdEspacoCultural = EspacoCultural.IdEspacoCultural
      JOIN Categoria ON Evento.IdCategoria = Categoria.IdCategoria
      LEFT JOIN Usuario AS UsuarioLiberacao ON Evento.Liberado = UsuarioLiberacao.IdUsuario 
      WHERE Evento.IdEvento = ?`;
    return this.executeSQL(sql, id); 
  }

  search(parametro) {
    const sql = `
      SELECT 
        Evento.IdEvento, 
        Evento.Nome, 
        Evento.Descricao, 
        Evento.HorarioInicial, 
        Evento.HorarioFinal, 
        Evento.Valor, 
        Evento.PublicoTotal, 
        Evento.Ativo, 
        Evento.IdUsuario, 
        Evento.IdCategoria, 
        Evento.IdEspaco, 
        UsuarioCriador.Nome AS NomeUsuario, 
        Espaco.Nome AS NomeEspaco, 
        EspacoCultural.Nome AS NomeEspacoCultural, 
        Categoria.Nome AS NomeCategoria, 
        Categoria.Cor AS CorCategoria
      FROM 
        Evento
        JOIN Usuario AS UsuarioCriador ON Evento.IdUsuario = UsuarioCriador.IdUsuario
        JOIN Espaco ON Evento.IdEspaco = Espaco.IdEspaco
        JOIN EspacoCultural ON Espaco.IdEspacoCultural = EspacoCultural.IdEspacoCultural
        JOIN Categoria ON Evento.IdCategoria = Categoria.IdCategoria
      WHERE 
        Evento.IdEvento = ? 
        OR Evento.Nome LIKE ? 
        OR Espaco.Nome LIKE ? 
        OR EspacoCultural.Nome LIKE ? 
        OR EspacoCultural.Cidade LIKE ? 
        OR EspacoCultural.Estado LIKE ?`;
    const values = [
      parametro,
      `%${parametro}%`,
      `%${parametro}%`,
      `%${parametro}%`,
      `%${parametro}%`,
      `%${parametro}%`
    ];
    return this.executeSQL(sql, values);
  }
  
  create(novoEvento) {
    const sql = "INSERT INTO Evento SET ?"; 
    return this.executeSQL(sql, novoEvento);
  }

  update(updateEvento, id) {
    const sql = "UPDATE Evento SET ? WHERE IdEvento = ?";
    return this.executeSQL(sql, [updateEvento, id]); 
  }

  updateLiberar(liberar, id) {
    const sql = "UPDATE Evento SET Liberado = ? WHERE IdEvento = ?";
    return this.executeSQL(sql, [liberar, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Evento WHERE IdEvento = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new EventoModel();
