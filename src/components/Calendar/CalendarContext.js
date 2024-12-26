import React, { createContext, useContext, useState } from "react";

// Crea el contexto
const CalendarContext = createContext();

// Proveedor del contexto
export const CalendarProvider = ({ children }) => {
  const [calendarDate, setCalendarDate] = useState(new Date());

  return (
    <CalendarContext.Provider value={{ calendarDate, setCalendarDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

// Hook para usar el contexto
export const useCalendar = () => useContext(CalendarContext);