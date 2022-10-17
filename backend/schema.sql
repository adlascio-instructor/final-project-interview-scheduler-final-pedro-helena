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
    (1, "Mondays" , 3);

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

INSERT INTO interviewer ( name, avatar)
VALUES
    ('Sylvia Palmer',"https://i.imgur.com/LpaY82x.png" );

INSERT INTO interviewer ( name, avatar)
VALUES
    ('Tori Malcolm',"https://i.imgur.com/Nmx0Qxo.png" );

INSERT INTO interviewer (name, avatar)
VALUES
    ('Mildred Nazir',"https://i.imgur.com/T2WwVfS.png" );

INSERT INTO interviewer (name, avatar)
VALUES
    ('Cohana Roy',"https://i.imgur.com/FK8V841.jpg" );

INSERT INTO interviewer (name, avatar)
VALUES
    ('Sven Jones',"https://i.imgur.com/twYrpay.jpg" );
