drop table if exists user;

CREATE TABLE USER (USER_UID INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR (50), EMAIL VARCHAR (100));

INSERT INTO USER (NAME, EMAIL) VALUES ('IronMan', 'IronMan@bookstore.com');
INSERT INTO USER (NAME, EMAIL) VALUES ('CaptainAmerica', 'CaptainAmerica@bookstore.com');