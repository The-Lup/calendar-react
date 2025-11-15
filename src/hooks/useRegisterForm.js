import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from './useAuthStore';
import { useForm } from './useForm';

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

const registerValidations = {
  registerName: [(value) => value.length >= 1, 'Name is required.'],
  registerEmail: [(value) => value.includes('@'), 'Email is not valid.'],
  registerPassword: [
    (value) => value.length >= 8,
    'Password must be at least 8 characters.',
  ],
  registerPassword2: [
    (value) => value.length >= 1,
    'Password confirmation is required.',
  ],
};

export const useRegisterForm = () => {
  const [registerSubmitted, setRegisterSubmitted] = useState(false);
  const { startRegister } = useAuthStore();

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange,
    isFormValid,
    registerNameValid,
    registerEmailValid,
    registerPasswordValid,
    registerPassword2Valid,
  } = useForm(registerFormFields, registerValidations);

  const registerSubmit = async (e) => {
    e.preventDefault();
    setRegisterSubmitted(true);

    if (registerPassword !== registerPassword2) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }

    if (!isFormValid) return;

    await startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  return {
    // State
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    registerSubmitted,

    // Validations
    isRegisterFormValid: isFormValid,
    registerNameValid,
    registerEmailValid,
    registerPasswordValid,
    registerPassword2Valid,

    // Methods
    onRegisterInputChange: onInputChange,
    registerSubmit,
  };
};
