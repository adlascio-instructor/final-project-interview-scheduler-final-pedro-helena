import React, { useState, useEffect } from "react";
import axios from 'axios';

import "./App.scss";

import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
import daysData from "./components/__mocks__/days.json";
import appointmentsData from "./components/__mocks__/appointments.json";

export default function Application() {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState({});
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/days")
      // .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.data);
          setDays(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [day]);

  useEffect(() => {
    console.log(day);
     axios.get("http://localhost:8000/appointments/" + day)      
      .then(
        (result) => {
          setAppointments(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }, [appointments]);
  
  
  function bookInterview(id, interview) {
    var marreta = {student: interview.student,appointment: id, interviewerid: interview.interviewer.id, day: null}
    console.log(id, interview);
    console.log(appointments);
    console.log(appointments[id]);
    console.log(interview.interviewer.id);
    const isEdit = appointments[id].interview;

    setAppointments((prev) => {
      const appointment = {
        ...prev[id],
        interview: { ...interview },
      };
      const appointments = {
        ...prev,
        [id]: appointment,
      };
      return appointments;
    });
    if (!appointments[id].interview){
      
      axios.post("http://localhost:8000/interview_post", marreta);

    }
    if (!isEdit) {
      setDays((prev) => {
        const updatedDay = {
          ...prev[day],
          spots: prev[day].spots - 1,
        };
        const days = {
          ...prev,
          [day]: updatedDay,
        };
        return days;
      });
    }
  }
  function cancelInterview(id) {
    axios.post('http://localhost:8000/interview_delete/', appointments[id]);
    console.log(appointments)
    setAppointments((prev) => {
      const updatedAppointment = {
        ...prev[id],
        interview: null,
      };
      const appointments = {
        ...prev,
        [id]: updatedAppointment,
      };
      return appointments;
    });
    setDays((prev) => {
      const updatedDay = {
        ...prev[day],
        spots: prev[day].spots + 1,
      };
      const days = {
        ...prev,
        [day]: updatedDay,
      };
      return days;
    });
  }
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (
          <Appointment
            key={appointment.id}
            {...appointment}
            bookInterview={(interview) =>
              bookInterview(appointment.id, interview)
            }
            cancelInterview={cancelInterview}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
