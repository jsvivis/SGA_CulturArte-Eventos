const multer = require('multer');
const path = require('path');

// Configuração do multer para salvar arquivos no disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Diretório onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo salvo
  }
});

const upload = multer({ storage: storage });

module.exports = upload;