CREATE DATABASE agenda;
USE agenda;

/* Um tipo de perfil diferente para somente administradores poderem fazer certas ações */
CREATE TABLE Perfil ( 
    IdPerfil INT PRIMARY KEY AUTO_INCREMENT,
    PerfilUsuario ENUM('ADMINISTRADOR', 'USUARIO') DEFAULT 'USUARIO'
);

/* Usuário para fazer login associado a um tipo de perfil --> não deletar só inativar para manter integridade referencial */
CREATE TABLE Usuario (
    IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    IdPerfil INT NOT NULL DEFAULT 2,
    FOREIGN KEY (IdPerfil) REFERENCES Perfil(IdPerfil) ON DELETE CASCADE,
    INDEX idx_usuario_ativo (Ativo),
    INDEX idx_usuario_email (Email)
);

/* Para configurações de cores para cada tipo de eventos */
CREATE TABLE Categoria (
    IdCategoria INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    Cor VARCHAR(30) NOT NULL,
    INDEX idx_categoria_ativo (Ativo)
);

/* Armazenar os espaços culturais */
CREATE TABLE EspacoCultural (
    IdEspacoCultural INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(60) NOT NULL,
    Cep INT NOT NULL,
    Endereco VARCHAR(100) NOT NULL,
    Numero VARCHAR(20) NOT NULL,
    Complemento VARCHAR(30),
    Cidade VARCHAR(40) NOT NULL,
    Estado VARCHAR(40) NOT NULL,
    Telefone VARCHAR(25) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    INDEX idx_espaco_cultural_nome (Nome)
);

/* Para armazenar os espaços dentro de um espaço cultural */
CREATE TABLE Espaco (
    IdEspaco INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(50) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    IdEspacoCultural INT NOT NULL,
    FOREIGN KEY (IdEspacoCultural) REFERENCES EspacoCultural(IdEspacoCultural) ON DELETE CASCADE,
    INDEX idx_espaco_nome (Nome)
);

/* Eventos associados a espaço, usuário e tema --> e inicialmente fica oculto até aprovação de administrador */
CREATE TABLE Evento (
    IdEvento INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT NOT NULL,
    HorarioInicial DATETIME NOT NULL,
    HorarioFinal DATETIME NOT NULL,
    Valor DOUBLE,
    Publico INT,
    PublicoTotal INT,
    Ativo BOOLEAN DEFAULT TRUE,
    Liberado BOOLEAN DEFAULT TRUE,
    IdUsuario INT NOT NULL,
    IdEspaco INT NOT NULL,
    IdCategoria INT NOT NULL,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) ON DELETE CASCADE,
    FOREIGN KEY (IdEspaco) REFERENCES Espaco(IdEspaco) ON DELETE CASCADE,
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(IdCategoria) ON DELETE CASCADE,
    INDEX idx_evento_ativo (Ativo),
    INDEX idx_evento_horario_inicial (HorarioInicial),
    INDEX idx_evento_horario_final (HorarioFinal),
    INDEX idx_evento_usuario (IdUsuario),
    INDEX idx_evento_espaco (IdEspaco),
    INDEX idx_evento_liberado (Liberado)
);

/* Para arquivos do evento */
CREATE TABLE Arquivo (
    IdArquivo INT PRIMARY KEY AUTO_INCREMENT,
    Caminho TEXT NOT NULL,
    IdEvento INT,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON DELETE CASCADE,
    INDEX idx_arquivo_evento (IdEvento)
);

/* Para imagens do evento */
CREATE TABLE Imagem (
    IdImagem INT PRIMARY KEY AUTO_INCREMENT,
    Caminho TEXT NOT NULL,
    IdEvento INT,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON DELETE CASCADE,
    INDEX idx_imagem_evento (IdEvento)
);

/* Para links do evento */
CREATE TABLE Link (
    IdLink INT PRIMARY KEY AUTO_INCREMENT,
    Link TEXT NOT NULL,
    IdEvento INT,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON DELETE CASCADE,
    INDEX idx_link_evento (IdEvento)
);

/* Para os tipos de "emoticons" que o sistema vai aceitar */
CREATE TABLE Reacao (
    IdReacao INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Emoticon VARCHAR(30) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    INDEX idx_reacao_nome (Nome),
    INDEX idx_reacao_ativo (Ativo)
);

/* Para armazenar as reações das postagens */
CREATE TABLE ReacaoUsuario (
    IdReacaoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    IdReacao INT,
    IdUsuario INT,
    IdEvento INT,
    FOREIGN KEY (IdReacao) REFERENCES Reacao(IdReacao) ON DELETE CASCADE,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) ON DELETE CASCADE,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON DELETE CASCADE,
    UNIQUE (IdUsuario, IdEvento, IdReacao), -- Evita múltiplas reações iguais do mesmo usuário na mesma postagem
    INDEX idx_reacao_usuario_evento (IdUsuario, IdEvento)
);

/* Inserir dados fictícios na tabela Perfil */
INSERT INTO Perfil (PerfilUsuario) VALUES 
('ADMINISTRADOR'), 
('USUARIO');

/* Inserir dados fictícios na tabela Usuario */
INSERT INTO Usuario (Nome, Email, Senha, Ativo, IdPerfil) VALUES 
('Admin User', 'admin@admin', '123', TRUE, 1),
('Regular User', 'regular@user', '123', TRUE, 2),

/* Inserir dados fictícios na tabela Categoria */
INSERT INTO Categoria (Nome, Ativo, Cor) VALUES 
('Artes Cênicas', TRUE, '#ee7272'), 
('Cinema', TRUE, '#57f457'), 
('Exposição', TRUE, '#e6d041'),
('Música', TRUE, '#54f0f2'),
('Inovação', TRUE, '#c743d0'),
('Outros', TRUE, '#7b3737');

/* Inserir dados fictícios na tabela EspacoCultural */
INSERT INTO EspacoCultural (Nome, Cep, Endereco, Numero, Complemento, Cidade, Estado, Telefone, Email, Ativo) VALUES 
('Usina Cultural - Paraíba', 12345678, 'Rua A', '123', 'Apto 1', 'Cidade A', 'Estado A', '123456789', 'espacocultural1@example.com', TRUE),
('Anfiteatro - Cataguases', 87654321, 'Rua B', '456', 'Apto 2', 'Cidade B', 'Estado B', '987654321', 'espacocultural2@example.com', TRUE),
('Centro Cultural - Cataguases', 87654321, 'Rua B', '456', 'Apto 2', 'Cidade B', 'Estado B', '987654321', 'espacocultural2@example.com', TRUE),
('Usina Cultural - Nova Friburgo', 54321678, 'Rua C', '789', 'Apto 3', 'Cidade C', 'Estado C', '111111111', 'espacocultural3@example.com', TRUE);

/* Inserir dados fictícios na tabela Espaco */
INSERT INTO Espaco (Nome, Ativo, IdEspacoCultural) VALUES 
('Galeria de Arte', TRUE, 1), 
('Galeria Alexandre Filho', TRUE, 1), 
('Sala Vladimir Carvalho', TRUE, 1),
('Tenda da Música', TRUE, 1),
('Café da Usina', TRUE, 1),
('Palco', TRUE, 1),
('Anfiteatro Ivan Mulher Botelho', TRUE, 2),
('Cineteatro Paulo César Sarraceni', TRUE, 3),
('Galeria Zequinha Mauro', TRUE, 3),
('Memorial Humberto Mauro', TRUE, 3),
('Teatro da Usina', TRUE, 4),
('Salão Nobre', TRUE, 4),
('Galerias', TRUE, 4),
('Anexo', TRUE, 4),
('Terraço', TRUE, 4),
('Espaço Café', TRUE, 4);

/* Inserir dados fictícios na tabela Evento */
INSERT INTO Evento (Nome, Descricao, HorarioInicial, HorarioFinal, Valor, Publico, PublicoTotal, Ativo, Liberado, IdUsuario, IdEspaco, IdCategoria) VALUES 
('Vernissage', 'Descrição do Evento 1', '2024-07-01 10:00:00', '2024-07-01 12:00:00', 100.0, 50, 100, TRUE, TRUE, 1, 1, 1),
('Lançamento do livro: "OUTONO - MEMORIAL DA ESCRITURA"', 'Descrição do Evento 2', '2024-07-02 14:00:00', '2024-07-02 16:00:00', 50.0, 25, 50, FALSE, FALSE, 2, 2, 2),
('Quiosque da Poesia - com Carlyto Campos', 'Descrição do Evento 3', '2024-07-10 15:00:00', '2024-07-10 17:00:00', 80.0, 30, 50, TRUE, TRUE, 1, 2, 1),
('Encontro de Vinil', 'Descrição do Evento 4', '2024-07-15 19:00:00', '2024-07-15 21:00:00', 120.0, 60, 80, TRUE, TRUE, 2, 3, 2),
('Espetáculo Jequitibá-Rosa - por Amanda Gouveia  e Jhasmyna', 'Descrição do Evento 5', '2024-07-20 10:00:00', '2024-07-20 12:00:00', 50.0, 20, 30, TRUE, TRUE, 1, 7, 3),
('Tramatopia', 'Descrição do Evento 6', '2024-07-25 14:00:00', '2024-07-25 16:00:00', 100.0, 40, 60, TRUE, TRUE, 2, 7, 1),
('Festival Ver e Fazer Filmes', 'Descrição do Evento 7', '2024-07-30 17:00:00', '2024-07-30 19:00:00', 70.0, 25, 40, TRUE, TRUE, 1, 8, 2),
('Encontro Escrevendo com Escritor', 'Descrição do Evento 8', '2024-08-05 11:00:00', '2024-08-05 13:00:00', 90.0, 35, 50, TRUE, TRUE, 2, 9, 3),
('Fórum Visionário', 'Descrição do Evento 9', '2024-08-10 16:00:00', '2024-08-10 18:00:00', 110.0, 45, 70, TRUE, TRUE, 1, 10, 1),
('Summit Executivo', 'Descrição do Evento 10', '2024-08-15 20:00:00', '2024-08-15 22:00:00', 150.0, 75, 100, TRUE, TRUE, 2, 10, 2),
('Seminário de Excelência', 'Descrição do Evento 11', '2024-08-20 09:00:00', '2024-08-20 11:00:00', 60.0, 30, 40, TRUE, TRUE, 1, 11, 3),
('Jornada do Conhecimento', 'Descrição do Evento 12', '2024-08-25 15:00:00', '2024-08-25 17:00:00', 85.0, 40, 60, TRUE, TRUE, 2, 12, 1),
('Conferência de Visão', 'Descrição do Evento 13', '2024-08-30 18:00:00', '2024-08-30 20:00:00', 75.0, 35, 50, TRUE, TRUE, 1, 14, 2);

/* Inserir dados fictícios na tabela Arquivo */
INSERT INTO Arquivo (Caminho, IdEvento) VALUES 
('caminho/arquivo1.pdf', 1), 
('caminho/arquivo2.pdf', 2);

/* Inserir dados fictícios na tabela Imagem */
INSERT INTO Imagem (Caminho, IdEvento) VALUES 
('caminho/imagem1.jpg', 1), 
('caminho/imagem2.jpg', 2);

/* Inserir dados fictícios na tabela Link */
INSERT INTO Link (Link, IdEvento) VALUES 
('http://link1.com', 1), 
('http://link2.com', 2);

/* Inserir dados fictícios na tabela Reacao */
INSERT INTO Reacao (Nome, Emoticon, Ativo) VALUES 
('Gostei', '1F60A', TRUE), 
('Amei', '1F60D', TRUE), 
('Haha', '1F602', TRUE),
('Muito Bom', '1F44D', TRUE),
('Parabéns!', '1F44F', TRUE),
('Incrível', '1F60D', TRUE),
('Não Gostei', '2639', TRUE),
('Odiei', '1F621', TRUE ),
('Feliz', '1F604', TRUE);

/* Inserir dados fictícios na tabela ReacaoUsuario */
INSERT INTO ReacaoUsuario (IdReacao, IdUsuario, IdEvento) VALUES 
(1, 1, 1), 
(2, 2, 2);
