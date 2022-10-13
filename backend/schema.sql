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
    interviewer_id INTEGER,
    appointment_id INTEGER,
    day_id INTEGER,
    FOREIGN KEY(interviewer_id) REFERENCES interviewer(id),
    FOREIGN KEY(appointment_id) REFERENCES appointment(id)
    FOREIGN KEY(day_id) REFERENCES days(id)
);

CREATE TABLE interviewer(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    avatar text,
    day_id INTEGER,
    FOREIGN KEY(day_id) REFERENCES days(id)
);

CREATE TABLE avaiableInterviewer(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    interviewer_id INTEGER,
    day_id INTEGER,
    FOREIGN KEY(interviewer_id) REFERENCES interviewer(id),
    FOREIGN KEY(day_id) REFERENCES days(id)
);

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
    ("2pm", 3);

INSERT INTO appointment(time, day_id)
VALUES
    ("12pm", 1);

    INSERT INTO appointment(time, day_id)
VALUES
    ("4pm", 5);

-- SELECT * FROM days;
