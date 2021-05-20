DROP TABLE IF EXISTS dogs

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL
);

insert into dogs (name, age) values ('Spot', 5);
