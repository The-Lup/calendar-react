import { useState } from 'react';
import { useForm } from './useForm';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const loginValidations = {
  loginEmail: [(value) => value.includes('@'), 'Email is not valid.'],
  loginPassword: [
    (value) => value.length >= 8,
    'Password must be at least 8 characters.',
  ],
};

export const useLoginForm = () => {
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  const {
    loginEmail,
    loginPassword,
    onInputChange,
    isFormValid,
    loginEmailValid,
    loginPasswordValid,
  } = useForm(loginFormFields, loginValidations);

  const loginSubmit = (e) => {
    e.preventDefault();
    setLoginSubmitted(true);

    if (!isFormValid) return;

    console.log({ loginEmail, loginPassword });
    //TODO: APi LOGIN CALL LOGIC
  };

  return {
    // State
    loginEmail,
    loginPassword,
    loginSubmitted,

    // Validarions
    isLoginFormValid: isFormValid,
    loginEmailValid,
    loginPasswordValid,

    // Methods
    onLoginInputChange: onInputChange,
    loginSubmit,
  };
};
