CREATE TABLE IF NOT EXISTS users
(
    id serial,
    username varchar(40),
    password text,
    role text
);

CREATE TABLE IF NOT EXISTS groups
(
    id serial PRIMARY KEY,
    group_number varchar(40)
);

INSERT INTO groups (group_number) VALUES ('1920');

CREATE TABLE IF NOT EXISTS students
(
    id serial PRIMARY KEY,
    studentName varchar(40),
    groupId INTEGER,
    FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE CASCADE
);

INSERT INTO students (studentName, groupId) VALUES ('Андрюшкевич', 1);
INSERT INTO students (studentName, groupId) VALUES ('Березкина', 1);
INSERT INTO students (studentName, groupId) VALUES ('Булавко', 1);
INSERT INTO students (studentName, groupId) VALUES ('Воробейчиков', 1);
INSERT INTO students (studentName, groupId) VALUES ('Говор', 1);
INSERT INTO students (studentName, groupId) VALUES ('Гучок', 1);
INSERT INTO students (studentName, groupId) VALUES ('Гуща', 1);
INSERT INTO students (studentName, groupId) VALUES ('Денисенко', 1);
INSERT INTO students (studentName, groupId) VALUES ('Драчан', 1);
INSERT INTO students (studentName, groupId) VALUES ('Дудко', 1);
INSERT INTO students (studentName, groupId) VALUES ('Журо', 1);
INSERT INTO students (studentName, groupId) VALUES ('Зиканов', 1);
INSERT INTO students (studentName, groupId) VALUES ('Иванов', 1);
INSERT INTO students (studentName, groupId) VALUES ('Ковалев', 1);
INSERT INTO students (studentName, groupId) VALUES ('Колтович', 1);
INSERT INTO students (studentName, groupId) VALUES ('Лебедев', 1);
INSERT INTO students (studentName, groupId) VALUES ('Можиловская', 1);
INSERT INTO students (studentName, groupId) VALUES ('Нижник', 1);
INSERT INTO students (studentName, groupId) VALUES ('Пратасеня', 1);
INSERT INTO students (studentName, groupId) VALUES ('Прокопчик', 1);
INSERT INTO students (studentName, groupId) VALUES ('Пытко', 1);
INSERT INTO students (studentName, groupId) VALUES ('Романов', 1);
INSERT INTO students (studentName, groupId) VALUES ('Русакович', 1);
INSERT INTO students (studentName, groupId) VALUES ('Сивко', 1);
INSERT INTO students (studentName, groupId) VALUES ('Урбанович', 1);
INSERT INTO students (studentName, groupId) VALUES ('Усов', 1);
INSERT INTO students (studentName, groupId) VALUES ('Хартонович', 1);
INSERT INTO students (studentName, groupId) VALUES ('Швед', 1);
INSERT INTO students (studentName, groupId) VALUES ('Шуман', 1);
INSERT INTO students (studentName, groupId) VALUES ('Юрчук', 1);
INSERT INTO students (studentName, groupId) VALUES ('Ярош', 1);

CREATE TABLE IF NOT EXISTS disciplines
(
    id serial PRIMARY KEY,
    disciplineName varchar(40)
);

INSERT INTO disciplines (disciplineName) VALUES ('САПИС');
INSERT INTO disciplines (disciplineName) VALUES ('ООП');

CREATE TABLE IF NOT EXISTS omissions
(
    id serial,
    data date,
    disciplineId INTEGER,
    studentId INTEGER,
    isPresent bool,
    FOREIGN KEY (disciplineId) REFERENCES disciplines (id) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES students (id) ON DELETE CASCADE
);