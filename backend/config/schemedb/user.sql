CREATE TABLE users IF NO EXISTS (
    user_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstname varchar(50) NOT NULL COMMENT 'table name',
    lastname varchar(50) NOT NULL COMMENT 'table name',
    password varchar(255) NOT NULL COMMENT 'table name',
    email int(50) NOT NULL COMMENT 'table name',
    email_confirm int(255) NULL COMMENT 'table name',
    is_active int(255) NULL COMMENT 'table name',
     
)