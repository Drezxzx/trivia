-- Active: 1695372655942@@127.0.0.1@3306@test
DROP DATABASE IF EXISTS trivia;
CREATE DATABASE trivia;

USE trivia;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    points INT NULL DEFAULT 0
)

CREATE TABLE question(
   id INT PRIMARY KEY AUTO_INCREMENT,
   question VARCHAR(250) NOT NULL,
   response1 VARCHAR(250) NOT NULL,
   response2 VARCHAR(250) NOT NULL,
   response3 VARCHAR(250) NOT NULL,
   response4 VARCHAR(250) NOT NULL,
   category VARCHAR(250) NOT NULL,
   trueresponse VARCHAR(250) NOT NULL
)

CREATE TABLE usercorrect (
    iduser INT,
    idquestion INT,
    FOREIGN KEY (iduser) REFERENCES Users(id),
    FOREIGN KEY (idquestion) REFERENCES question(id),
    PRIMARY KEY(iduser, idquestion)
);


INSERT INTO question (question, response1, response2, response3, response4, category, trueresponse) VALUES
('¿Cuál es la capital de Francia?', 'París', 'Londres', 'Berlín', 'Madrid', 'Geografía', 'París'),
('¿En qué año comenzó la Segunda Guerra Mundial?', '1935', '1939', '1942', '1945', 'Historia', '1939'),
('¿Cuál es el río más largo de América del Sur?', 'Amazonas', 'Nilo', 'Misisipi', 'Yangtsé', 'Geografía', 'Amazonas'),
('¿Quién escribió "Don Quijote de la Mancha"?', 'Garcilaso de la Vega', 'Lope de Vega', 'Miguel de Cervantes', 'Federico García Lorca', 'Literatura', 'Miguel de Cervantes'),
('¿Cuántos elementos químicos hay en la tabla periódica?', '92', '108', '118', '130', 'Ciencia', '118'),
('¿Cuál es el planeta más grande del sistema solar?', 'Tierra', 'Júpiter', 'Saturno', 'Marte', 'Astronomía', 'Júpiter'),
('¿En qué continente se encuentra Egipto?', 'Asia', 'África', 'Europa', 'América', 'Geografía', 'África'),
('¿Cuál es la velocidad de la luz?', '300,000 km/s', '150,000 km/s', '500,000 km/s', '1,000,000 km/s', 'Ciencia', '300,000 km/s'),
('¿Cuál es la montaña más alta de Norteamérica?', 'Monte Everest', 'Monte McKinley', 'Monte Kilimanjaro', 'Monte Rushmore', 'Geografía', 'Monte McKinley'),
('¿Quién fue el primer presidente de Estados Unidos?', 'George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams', 'Historia', 'George Washington'),
('¿Cuál es el animal más grande del mundo?', 'Elefante', 'Ballena azul', 'Jirafa', 'Tigre', 'Biología', 'Ballena azul'),
('¿Cuál es la capital de Japón?', 'Seúl', 'Pekín', 'Tokio', 'Bangkok', 'Geografía', 'Tokio'),
('¿Quién pintó la Mona Lisa?', 'Pablo Picasso', 'Leonardo da Vinci', 'Vincent van Gogh', 'Claude Monet', 'Arte', 'Leonardo da Vinci'),
('¿Cuántas patas tiene una araña?', '4', '6', '8', '10', 'Biología', '8'),
('¿Cuál es el proceso mediante el cual las plantas producen su propio alimento?', 'Fotosíntesis', 'Respiración', 'Transpiración', 'Fermentación', 'Biología', 'Fotosíntesis'),
('¿En qué año se llevó a cabo la Revolución Rusa?', '1915', '1917', '1920', '1922', 'Historia', '1917'),
('¿Cuál es el océano más grande del mundo?', 'Atlántico', 'Índico', 'Ártico', 'Pacífico', 'Geografía', 'Pacífico'),
('¿Cuál es el símbolo químico del oro?', 'O', 'Au', 'Ag', 'Fe', 'Química', 'Au'),
('¿En qué año se fundó la Organización de las Naciones Unidas (ONU)?', '1945', '1950', '1960', '1975', 'Historia', '1945'),
('¿Cuál es el hueso más largo del cuerpo humano?', 'Húmero', 'Fémur', 'Tibia', 'Radio', 'Anatomía', 'Fémur');

INSERT INTO users(username, email, password) VALUES("drez", "Andres@gmail.com", "1234");