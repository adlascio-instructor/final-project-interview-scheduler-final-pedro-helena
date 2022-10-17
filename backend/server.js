const express = require("express");
var cors = require("cors");
const { reset } = require("nodemon");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    res.json(daysToAvailableSpots);
  });
});

  app.get("/interviewers", (req, res) => {
    let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
    });

    const sql = `SELECT id, name, avatar FROM interviewer`;
    db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    let interviewerList = {};

    console.log(rows);
    /*rows.forEach((row) => {
      interviewerList[row.name] = {
        id: row.id,
        avatar: row.avatar,
        name: row.name,
      };
    });
    res.json(interviewerList); */
    res.json(rows);
  });

  



  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

app.get('interview_teste', (req, res) =>{
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

app.post('/interview_post' ,(req, res) => {
  var appointment = req.body;
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  console.log(appointment)
  const sql = `INSERT INTO interview (student, interviewer_id, appointment_id, day_id) VALUES ('` + appointment.student + `',` + appointment.interviewerid + `,` + appointment.appointment + `,` + appointment.day + `)`;
  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
    console.log('insert');
  console.log(req.body);
});
});

app.post('/interview_delete'), (req, res) => {
  var id = req.body.id;
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  const sql = `DELETE FROM interview WHERE appointment_id = ` + id;
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  } 

  console.log(rows);
   res.json(rows);
});



db.close((err) => {
  if (err) {
    console.error(err.message);
  }
});
  console.log('delete');
  console.log(req.body);
};

app.post('/interview_update', (req, res) =>{
  var replace = req.body.id;
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });


  //student, interviewer_id, appointment_id, day_id
  const sql = `UPDATE interview SET student = `+ replace.student + ` WHERE ` + id + `=` + replace.id ;
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  } 

  console.log(rows);
   res.json(rows);
  console.log('update');
  console.log(req.body);
  console.log('update');
  console.log(req.body);
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

app.get("/appointments/:day", (req, res) => {
  let db = new sqlite3.Database("backend.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    let dia = req.params.day;

    // const sql = `SELECT id, student, interviewer_id, appointment_id, day_id FROM interview`;
    const sql = `SELECT appointment.id AS appointment_id, appointment.time, interview.student, interviewer.id, interviewer.name, interviewer.avatar FROM appointment LEFT JOIN interview ON interview.appointment_id = appointment.id LEFT JOIN interviewer ON interviewer.id = interview.interviewer_id JOIN days ON days.id = appointment.day_id WHERE days.name = '`+ dia +`'
         ` 
         console.log('bom dia' + sql);
    db.all(sql, [], (err, rows) => {
      let result = {};
      rows.forEach((row) => {
        result[row.appointment_id]= {id: row.appointment_id, time:row.time};
        if (row.student){
          result[row.appointment_id].interview = {student: row.student, interviewer:{id: row.id, name: row.name, avatar: row.avatar}}
        }
      });
      res.json(result);
    
    if (err) {
      throw err;
    }
  });
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

app.get("//:id/indaysterviews", (req, res) => {
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

  const sql = `SELECT id, interviewer_id FROM avaiableInterviewer where day_id=${req.params.id}`;
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


//axios app selects, passar parametro dia appoints 
//alterar caminho da rota - appointments