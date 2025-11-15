import { useEffect, useState } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  CalendarEventBox,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from '../';
import { localizer, stringToHslColor } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';
import { LoadingSpinner } from '../components/LoadingSpinner';

const getInitView = () => {
  const storedView = localStorage.getItem('lastView');
  return storedView || Views.MONTH;
};

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const {
    events,
    setActiveEvent,
    clearActiveEvent,
    startLoadingEvents,
    isLoadingEvents,
  } = useCalendarStore();
  const [currentView, setCurrentView] = useState(getInitView());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    startLoadingEvents();
  }, [startLoadingEvents]);

  // eslint-disable-next-line no-unused-vars
  const eventStyleGetter = (event, start, end, isSelected) => {
    const color = stringToHslColor(event.user._id);

    const style = {
      backgroundColor: color,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onSelectSlot = () => {
    clearActiveEvent();
  };

  const onDoubleClick = () => {
    openDateModal();
  };
  const onSelect = (event) => {
    setActiveEvent(event);
  };
  const onViewChanged = (newView) => {
    setCurrentView(newView);
    localStorage.setItem('lastView', newView);
  };

  if (isLoadingEvents) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <Calendar
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
        selectable={true}
        onSelectSlot={onSelectSlot}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
