const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());

const port = 8000;
const sqlite3 = require("sqlite3").verbose();

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get("/days", (req, res) => {
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let daysToAvailableSpots = {};

  const sql = `SELECT id, name, spots FROM days`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      daysToAvailableSpots[row.name] = {
        id: row.id,
        spots: row.spots,
        name: row.name,
      };
    });
    res.send(daysToAvailableSpots);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

//nao necessário
app.get("/days/:id/appointments", (req, res) => {
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let appointmentsOnDay = {};

  const sql = `SELECT id, time FROM appointment where day_id=${req.params.id}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      appointmentsOnDay[row.id] = {
        id: row.id,
        time: row.time,
      };
    });
    res.send(appointmentsOnDay);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

app.get("/appointments", (req, res) => {
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let appointmentsOnDay = {};

  const sql = `SELECT id, time FROM appointment`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      appointmentsOnDay[row.id] = { id: row.id, time: row.time };
    });
    res.send(appointmentsOnDay);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

app.get("/interviewer", (req, res) => {
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let interviwers = {};

  //faltar INSERT dados (criar um .post)
  const sql = `SELECT id, name, avatar FROM interviewer`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      interviwers[row.name] = {
        id: row.id,
        name: row.name,
        avatar: row.avatar,
      };
    });
    res.send(interviwers);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

app.get("/days/:id/interviews", (req, res) => {
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let interviewsOnDay = {};

  const sql = `SELECT id, student, interviewer_id, appointment_id FROM interview where day_id=${req.params.id}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      interviewsOnDay[row.id] = {
        id: row.id,
        student: row.student,
        interviewer_id: interviewer_id,
        appointment_id: appointment_id,
      };
    });
    res.send(interviewsOnDay);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

//availableInterviewers
app.get("/days/:id/availableInterviewers", (req, res) => {
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let avaiableInterviewer = {};

  const sql = `SELECT id, interviewer_id  FROM avaiableInterviewer where day_id=${req.params.id}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      avaiableInterviewer[row.id] = {
        id: row.id,
        interviewer_id: interviewer_id,
      };
    });
    res.send(avaiableInterviewer);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});
