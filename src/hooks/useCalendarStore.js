import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  onAddNewEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';
import { useUiStore } from './useUiStore';

import { useCallback } from 'react';
import { calendarApi } from '../api';
import { parseDates } from '../helpers';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent, isLoadingEvents } = useSelector(
    (state) => state.calendar
  );
  const { user } = useSelector((state) => state.auth);
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const clearActiveEvent = () => {
    dispatch(onClearActiveEvent());
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      const eventWithUser = { ...calendarEvent, user: user.uid };

      if (calendarEvent.id) {
        // Updating Event
        await calendarApi.put(`/events/${calendarEvent.id}`, eventWithUser);
        dispatch(onUpdateEvent({ ...calendarEvent }));
        closeDateModal();
        return;
      }

      // Creating Event
      const { data } = await calendarApi.post('/events', eventWithUser);
      const parsedEvent = parseDates([data.event])[0];

      dispatch(
        onAddNewEvent({
          ...parsedEvent,
          user: {
            _id: user.uid,
            name: user.name,
          },
        })
      );
      closeDateModal();
    } catch (error) {
      console.log(error);
      Swal.fire('Error saving', error.response?.data?.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    if (!activeEvent || !activeEvent.id) return;
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error deleting', error.response?.data?.msg, 'error');
    }
  };

  const startLoadingEvents = useCallback(async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = parseDates(data.events);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Error loading events', error);
      Swal.fire('Error', 'The events could not be loaded', 'error');
    }
  }, [dispatch]);

  return {
    //Props
    activeEvent,
    events,
    isDateModalOpen,
    isLoadingEvents,

    //Methods
    clearActiveEvent,
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
