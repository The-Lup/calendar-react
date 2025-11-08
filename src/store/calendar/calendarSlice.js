import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const now = new Date();

const tempEvent = {
  _id: now.getTime(),
  title: 'Buy a car',
  notes: 'Need buy a cake',
  start: new Date(now),
  end: addHours(new Date(now, 2)),
  bgcolor: '#fafafa',
  user: {
    _id: '123',
    name: 'Lup',
  },
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    onClearActiveEvent: (state) => {
      state.activeEvent = null;
    },

    onAddNewEvent: (state, { payload }) => {
      const newEvent = {
        ...payload,
        start: new Date(payload.start),
        end: new Date(payload.end),
      };

      state.events.push(newEvent);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      const updatedEvent = {
        ...payload,
        start: new Date(payload.start),
        end: new Date(payload.end),
      };

      state.events = state.events.map((event) => {
        if (event._id === updatedEvent._id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});

export const {
  onSetActiveEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onAddNewEvent,
  onUpdateEvent,
} = calendarSlice.actions;
