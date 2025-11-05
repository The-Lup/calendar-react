import { addHours } from 'date-fns';
import { useState } from 'react';

import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEventBox, Navbar } from '../';
import { getMessagesEs, localizer } from '../../helpers';

const events = [
  {
    title: 'Buy a car',
    notes: 'Need buy a cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: '#fafafa',
    user: {
      _id: '123',
      name: 'Lup',
    },
  },
];

const getInitView = () => {
  const storedView = localStorage.getItem('lastView');
  return storedView || Views.MONTH;
};

export const CalendarPage = () => {
  const [currentView, setCurrentView] = useState(getInitView());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [language, setLanguage] = useState(false);

  const onChangeLanguage = () => {
    setLanguage((current) => !current);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  };
  const onSelect = (event) => {
    console.log({ click: event });
  };
  const onViewChanged = (newView) => {
    setCurrentView(newView);
    localStorage.setItem('lastView', newView);
  };

  return (
    <>
      <Navbar onChangeLanguage={onChangeLanguage} />
      <Calendar
        culture={language && 'es'}
        messages={language && getMessagesEs()}
        localizer={localizer}
        date={currentDate}
        view={currentView}
        onView={onViewChanged}
        onNavigate={setCurrentDate}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEventBox }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
      />
    </>
  );
};
