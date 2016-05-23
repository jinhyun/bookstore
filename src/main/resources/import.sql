drop table if exists user;
drop table if exists board;

CREATE TABLE USER (USER_UID INT PRIMARY KEY AUTO_INCREMENT,
NAME VARCHAR (50),
EMAIL VARCHAR (100),
PASSWORD VARCHAR(100),
ROLE VARCHAR(50));


CREATE TABLE BOARD (BOARD_UID INT PRIMARY KEY AUTO_INCREMENT,
  SUBJECT VARCHAR (100),
  CONTENTS VARCHAR (500),
  AUTHOR VARCHAR (50),
  REG_DATE DATE
);

-- INSERT INTO USER (NAME, EMAIL, PASSWORD, ROLE) VALUES ('IronMan', 'IronMan@bookstore.com', '1234', 'USER');
-- INSERT INTO USER (NAME, EMAIL, PASSWORD, ROLE) VALUES ('CaptainAmerica', 'CaptainAmerica@bookstore.com', '1234', 'USER');