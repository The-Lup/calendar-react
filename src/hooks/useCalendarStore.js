import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent } from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO: Reach backend with info
    //TODO: All good from backend response

    if (calendarEvent._id) {
      //updating
    } else {
      //creating
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime }));
    }
  };

  return {
    //Props
    activeEvent,
    events,

    //Methods
    setActiveEvent,
    startSavingEvent,
  };
};
