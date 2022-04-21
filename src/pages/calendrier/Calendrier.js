import * as React from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Button, Container, TextField, Typography } from "@mui/material";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Visite curative",
    allDay: true,
    start: new Date(2022, 3, 21),
    end: new Date(2022, 3, 21),
  },
  {
    title: "Intervention Technique",
    start: new Date(2022, 3, 21),
    end: new Date(2022, 3, 27),
  },
  {
    title: "Adressage ip",
    start: new Date(2022, 3, 22),
    end: new Date(2022, 3, 22),
  },
];

export default function Calendrier() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const handleAddEvents = () => {
    setAllEvents([...allEvents, newEvent]);
  };

  return (
    <div>
      <Container>
        <Typography variant="h4" style={{ marginTop: "6rem" }}>
          {" "}
          Ajout Tache
        </Typography>

        <div>
          <TextField
            style={{ width: "185px", marginBottom: "1rem" }}
            type="text"
            id="standard-basic"
            label="titre"
            variant="standard"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <DatePicker
            placeholderText="Date debut"
            style={{
              marginBottom: "1rem",
              marginTop: "3rem",
              marginRight: "10px",
            }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
          />
          <h2></h2>
          <DatePicker
            placeholderText="Date fin"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
          />
          <Button
            variant="outlined"
            style={{ marginTop: "1rem" }}
            onClick={handleAddEvents}
          >
            Ajouter
          </Button>
        </div>

        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ marginTop: "3rem", height: 500 }}
        />
      </Container>
    </div>
  );
}
