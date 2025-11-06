export const Navbar = ({ onChangeLanguage, language }) => {
  const buttonText = language ? 'Change Language' : 'Cambiar Idioma';
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; JoPim
      </span>

      <button className="btn btn-outline-info" onClick={onChangeLanguage}>
        <i className="fas fa-language"></i>
        <span> {buttonText}</span>
      </button>

      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span> Sign out</span>
      </button>
    </div>
  );
};
