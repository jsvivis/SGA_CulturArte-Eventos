const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarioModel'); // Ajuste o caminho conforme sua estrutura de projeto

class AuthController {
  static async login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
 
    try {
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Verifique se a senha está presente no corpo da requisição
      if (!password) {
        return res.status(400).json({ message: 'Senha não fornecida' });
      }
    
      // Compare a senha fornecida com a senha no banco de dados
      /*const isMatch = await bcrypt.compare(password, user[0].Senha);

      if (!isMatch) {
        return res.status(400).json({ message: 'Credenciais Inválidas' });
      }*/

      const token = jwt.sign({ id: user.IdUsuario }, 'your_jwt_secret', { expiresIn: '1h' });

      //return res.status(200).json({ token, usuario: {id: user[0].IdUsuario, email: user[0].Email, nome: user[0].Nome} });
      return res.status(200).json({id: user[0].IdUsuario, email: user[0].Email, nome: user[0].Nome});
    } catch (error) {
      console.error('Erro durante o login:', error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }
}

module.exports = AuthController;
