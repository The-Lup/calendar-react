import { addHours, differenceInSeconds } from 'date-fns';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
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

export const CalendarModal = () => {
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

  const onSubmit = (event) => {
    event.preventDefault();
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Invalid dates. Please verify the dates you entered.');
      return;
    }
    if (formValues.title.length <= 0) return;
    console.log({ formValues });

    //TODO: Close Modal, remove screen errors
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

      <form className="container" onSubmit={onSubmit}>
        {/* Input Group: Start Date and Time */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Start Date and Time</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            wrapperClassName="d-grid"
            onChange={(event) => onDateChange(event, 'start')}
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        {/* Input Group: End Date and Time */}
        <div className="mb-3">
          <label className="form-label fw-semibold">End Date and Time</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            wrapperClassName="d-grid"
            onChange={(event) => onDateChange(event, 'end')}
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <hr className="my-4" />

        {/* Input Group: Title */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Event Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Title and Notes"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <div className="form-text text-muted">A short description</div>
        </div>

        {/* Input Group: Notes */}
        <div className="mb-4">
          <textarea
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <div className="form-text text-muted">Additional information</div>
        </div>

        {/* Save Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary fw-bold">
            <i className="far fa-save me-2"></i>
            <span>Save</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
