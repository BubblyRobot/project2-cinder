CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    lastname VARCHAR(255) not null,
	PRIMARY KEY (id)
);

INSERT INTO users (name, lastname) VALUES ('John', "Doe");
INSERT INTO users (name, lastname) VALUES ('Bobbi', "Jay");

CREATE TABLE userProfile
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    lastName VARCHAR(255) not null,
	nickName VARCHAR(255) not null,
	dob INTEGER not null,
	phone INTEGER not null,
	workPlace  VARCHAR(255) not null,
	jobRole VARCHAR(255) not null,
	workExperience  VARCHAR(255) not null,
	gender VARCHAR(5) not null,
	PRIMARY KEY (id)
);

-- INSERT INTO users (name, lastname, nickName, dob,  phone, workPlace,  jobRole,  workExperience, gender ) VALUES ('John', "Doe");


