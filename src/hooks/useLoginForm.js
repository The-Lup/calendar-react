import { useState } from 'react';
import { useAuthStore } from './useAuthStore';
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
  const { startLogin } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange,
    isFormValid,
    loginEmailValid,
    loginPasswordValid,
  } = useForm(loginFormFields, loginValidations);

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoginSubmitted(true);

    if (!isFormValid) return;

    await startLogin({ email: loginEmail, password: loginPassword });
  };

  return {
    // State
    loginEmail,
    loginPassword,
    loginSubmitted,

    // Validations
    isLoginFormValid: isFormValid,
    loginEmailValid,
    loginPasswordValid,

    // Methods
    onLoginInputChange: onInputChange,
    loginSubmit,
  };
};
