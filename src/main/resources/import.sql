drop table if exists user;
drop table if exists board;
drop table if exists board_comment;

CREATE TABLE USER (USER_UID INT PRIMARY KEY AUTO_INCREMENT,
NAME VARCHAR (50),
EMAIL VARCHAR (100),
PASSWORD VARCHAR(100),
ROLE VARCHAR(50));

CREATE TABLE BOARD (BOARD_UID INT PRIMARY KEY AUTO_INCREMENT,
  SUBJECT VARCHAR (100),
  CONTENTS VARCHAR (500),
  AUTHOR VARCHAR (50),
  REG_DATE DATE,
  REG_USER_UID INT,
  REG_USER_NAME VARCHAR (50)
);

CREATE TABLE BOARD_COMMENT (BOARD_COMMENT_UID INT PRIMARY KEY AUTO_INCREMENT,
  CONTENTS VARCHAR (500),
  USER_UID INT,
  USER_NAME VARCHAR (50),
  REG_DATE DATE,
  BOARD_UID INT
);

-- INSERT INTO USER (NAME, EMAIL, PASSWORD, ROLE) VALUES ('IronMan', 'IronMan@bookstore.com', '1234', 'USER');
-- INSERT INTO USER (NAME, EMAIL, PASSWORD, ROLE) VALUES ('CaptainAmerica', 'CaptainAmerica@bookstore.com', '1234', 'USER');