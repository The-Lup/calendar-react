import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';
import { useUiStore } from './useUiStore';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { isDateModalOpen } = useUiStore();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const clearActiveEvent = () => {
    dispatch(onClearActiveEvent());
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO: Reach backend with info
    //TODO: All good from backend response

    if (calendarEvent._id) {
      //updating
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //creating
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
    //TODO REACH BACKEND
    dispatch(onDeleteEvent());
  };
  return {
    //Props
    activeEvent,
    events,
    isDateModalOpen,

    //Methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    clearActiveEvent,
  };
};
