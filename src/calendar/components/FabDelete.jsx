import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, activeEvent } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleClickDelete = () => {
    startDeletingEvent();
  };

  if (!activeEvent || isDateModalOpen) {
    return null;
  }

  return (
    <button
      className="btn btn-danger fab-danger"
      type="button"
      onClick={handleClickDelete}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
