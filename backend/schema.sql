CREATE TABLE days(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    spots INTEGER
);

CREATE TABLE appointment(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time text,
    day_id INTEGER,
    FOREIGN KEY(day_id) REFERENCES days(id)
);

CREATE TABLE interview(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student text,
    interview_id
    FOREIGN KEY(interviewer_id) REFERENCES interviewer(id)
    FOREIGN KEY(appointment_id) REFERENCES appointment(id)
);

CREATE TABLE interviewer(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    avatar text
);

CREATE TABLE avaiableInterviewer(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY(interviewer_id) REFERENCES interviewer(id)
    FOREIGN KEY(day_id) REFERENCES days(id)
)

INSERT INTO days(id, name, spots)
VALUES
    (1, "Monday" , 3);

INSERT INTO days(id, name, spots)
VALUES
    (2, "Tuesday", 5);

INSERT INTO days(id, name, spots)
VALUES
    (3, "Wednesday", 0);

INSERT INTO days(id, name, spots)
VALUES
    (4, "Thursday", 1);

INSERT INTO days(id, name, spots)
VALUES
    (5, "Friday", 3);

INSERT INTO appointment(time, day_id)
VALUES
    ("10:00", 3);

-- SELECT * FROM days;
