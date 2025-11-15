import { useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { useLoginForm, useRegisterForm } from '../../hooks';
import { useAuthStore } from '../../hooks/useAuthStore';
import './LoginPage.css';

export const LoginPage = () => {
  const {
    loginEmail,
    loginPassword,
    loginSubmitted,
    loginEmailValid,
    loginPasswordValid,
    onLoginInputChange,
    loginSubmit,
  } = useLoginForm();

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    registerSubmitted,
    registerNameValid,
    registerEmailValid,
    registerPasswordValid,
    registerPassword2Valid,
    onRegisterInputChange,
    registerSubmit,
  } = useRegisterForm();

  const { status, errorMessage, clearErrorMessage } = useAuthStore();
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Authentication Error', errorMessage, 'error');
      clearErrorMessage();
    }
  }, [errorMessage, clearErrorMessage]);

  return (
    <div className="container login-container">
      <div className="login-content">
        {/* --- LOGIN FORM --- */}
        <div className="login-form-1">
          <h3>Login</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className={`form-control ${
                  !!loginEmailValid && loginSubmitted ? 'is-invalid' : ''
                }`}
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
              <div className="invalid-feedback">{loginEmailValid}</div>{' '}
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className={`form-control ${
                  !!loginPasswordValid && loginSubmitted ? 'is-invalid' : ''
                }`}
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
              <div className="invalid-feedback">{loginPasswordValid}</div>{' '}
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
                disabled={isAuthenticating}
              />
            </div>
          </form>
        </div>

        {/* --- REGISTER FORM --- */}
        <div className="login-form-2">
          <h3>Register</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className={`form-control ${
                  !!registerNameValid && registerSubmitted ? 'is-invalid' : ''
                }`}
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
              <div className="invalid-feedback">{registerNameValid}</div>{' '}
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className={`form-control ${
                  !!registerEmailValid && registerSubmitted ? 'is-invalid' : ''
                }`}
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
              <div className="invalid-feedback">{registerEmailValid}</div>{' '}
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className={`form-control ${
                  !!registerPasswordValid && registerSubmitted
                    ? 'is-invalid'
                    : ''
                }`}
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
              <div className="invalid-feedback">{registerPasswordValid}</div>{' '}
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className={`form-control ${
                  !!registerPassword2Valid && registerSubmitted
                    ? 'is-invalid'
                    : ''
                }`}
                placeholder="Repeat Password"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
              <div className="invalid-feedback">{registerPassword2Valid}</div>{' '}
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Create Account"
                disabled={isAuthenticating}
              />{' '}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
