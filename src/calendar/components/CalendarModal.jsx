import { addHours } from 'date-fns';
import { enUS } from 'date-fns/locale';
import es from 'date-fns/locale/es';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import '../styles/modal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

const translations = {
  es: {
    title: 'Nuevo Evento',
    labelStart: 'Fecha y hora inicio',
    labelEnd: 'Fecha y hora fin',
    labelTitleNotes: 'Título y notas',
    placeholderTitle: 'Título del evento',
    shortDescription: 'Una descripción corta',
    placeholderNotes: 'Notas',
    additionalInfo: 'Información adicional',
    save: 'Guardar',
  },
  en: {
    title: 'New Event',
    labelStart: 'Start Date and Time',
    labelEnd: 'End Date and Time',
    labelTitleNotes: 'Title and Notes',
    placeholderTitle: 'Event Title',
    shortDescription: 'A short description',
    placeholderNotes: 'Notes',
    additionalInfo: 'Additional information',
    save: 'Save',
  },
};

export const CalendarModal = ({ isSpanish }) => {
  const activeLocale = isSpanish ? es : enUS;
  const t = isSpanish ? translations.es : translations.en;

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formValues, setFormValues] = useState({
    title: 'JoPim',
    notes: 'Hades',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

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
    console.log('Modal closed');
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1 className="card-title fs-4 fw-bold text-center text-primary mb-3 pb-2 border-bottom">
        New Event
      </h1>

      <form className="container">
        {/* Input Group: Start Date and Time */}
        <div className="mb-3">
          <label className="form-label fw-semibold">{t.labelStart}</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            wrapperClassName="d-grid"
            onChange={(event) => onDateChange(event, 'start')}
            locale={activeLocale}
            dateFormat="Pp"
            showTimeSelect
            timeCaption={t.labelStart.split(' ')[0]}
          />
        </div>

        {/* Input Group: End Date and Time */}
        <div className="mb-3">
          <label className="form-label fw-semibold">{t.labelEnd}</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            wrapperClassName="d-grid"
            onChange={(event) => onDateChange(event, 'end')}
            locale={activeLocale}
            dateFormat="Pp"
            timeCaption={t.labelEnd.split(' ')[0]}
            showTimeSelect
          />
        </div>

        <hr className="my-4" />

        {/* Input Group: Title */}
        <div className="mb-3">
          <label className="form-label fw-semibold">{t.labelTitleNotes}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t.placeholderTitle}
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <div className="form-text text-muted">{t.shortDescription}</div>
        </div>

        {/* Input Group: Notes */}
        <div className="mb-4">
          <textarea
            className="form-control"
            placeholder={t.placeholderNotes}
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <div className="form-text text-muted">{t.additionalInfo}</div>
        </div>

        {/* Save Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary fw-bold">
            <i className="far fa-save me-2"></i>
            <span>{t.save}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
