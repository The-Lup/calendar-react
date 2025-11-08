import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useCalendarStore } from './useCalendarStore';
import { useUiStore } from './useUiStore';

const initialFormValues = () => {
  const now = new Date();
  return {
    title: '',
    notes: '',
    start: now,
    end: addHours(now, 2),
  };
};

export const useCalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues());
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const tittleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({
        ...activeEvent,
        start: new Date(activeEvent.start),
        end: new Date(activeEvent.end),
      });
    } else {
      setFormValues(initialFormValues());
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire(
        'Invalid dates',
        'Please verify the dates you entered',
        'error'
      );
      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  return {
    //States
    isDateModalOpen,
    formValues,
    tittleClass,

    //Handlers
    onInputChange,
    onDateChange,
    onCloseModal,
    onSubmit,
  };
};
