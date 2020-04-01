DROP DATABASE IF EXISTS cars;
CREATE DATABASE cars
CHARACTER SET utf8;
USE cars;

CREATE TABLE car(
	id			int(11) NOT NULL AUTO_INCREMENT, 
	descricao		text(60),
	placa			char(8),
	codRenavam		char(11),
	anoModelo		char(4),
	anoFabricacao	char(4),
	cor				text(20),
	km				text(11),
	marca			text(20),
	preco			decimal(10, 2),
	precoFipe		decimal(10, 2),
    PRIMARY KEY(id)
);

CREATE TABLE accessorie(
	id 				int(11) NOT NULL AUTO_INCREMENT,
	name 			text(60),
    PRIMARY KEY(id)
);

CREATE TABLE carAccessorie(
	carId			int(11),
	accessorieId	int(11),
	FOREIGN KEY(carId)
		REFERENCES car(id),
	FOREIGN KEY(accessorieId)
		REFERENCES accessorie(id)
);