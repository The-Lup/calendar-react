import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useUiStore } from './useUiStore';

const initialFormValues = {
  title: 'JoPim',
  notes: 'Hades',
  start: new Date(),
  end: addHours(new Date(), 2),
};

export const useCalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const tittleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.title.length > 0 ? 'is-valid' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

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

  const onSubmit = (event) => {
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

    // Validación del título
    if (formValues.title.length <= 0) return;

    console.log({ formValues });

    //TODO: cerrar modal y limpiar errores
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
