CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    lastname VARCHAR(255) not null,
	PRIMARY KEY (id)
);

INSERT INTO users (name, lastname) VALUES ('John', "Doe");
INSERT INTO users (name, lastname) VALUES ('Bobbi', "Jay");

