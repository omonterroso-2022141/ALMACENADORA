import {
  emailValidationMessage,
  validateEmail,
  passwordValidationMessage,
  validatePassword
} from '../shared/validators/validaroAll.js';
import { Input } from './Input.jsx'
import { useState } from 'react';
import logo from '../assets/img/logo.png'
import { useLogin } from '../shared/hooks/useLogin.jsx'

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin()
  const [formData, setFormData] = useState(
    {
      email: {
        value: "",
        isValid: false,
        showError: false,
      },
      password: {
        value: "",
        isValid: false,
        showError: false,
      },
    }
  );
  const isSubmitButtonDisable = !formData.email.isValid ||
    !formData.password.isValid

  const onValueChange = (value, field) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          value
        }
      }
    ))
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'email':
        isValid = validateEmail(value)
        break
      case 'password':
        isValid = validatePassword(value)
        break
      default:
        break
    }
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          isValid,
          showError: !isValid
        }
      }
    ))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login(
      formData.email.value,
      formData.password.value
    )
  }
  return (
    <div className="login-container" style={{ backgroundColor: '#202c33' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '25%' }}>
        <img src={logo} alt="" style={{ width: '20%', marginRight: '5%' }} />
        <h1>RapiNote</h1>
      </div>
      <form
        className="auth-form"
        onSubmit={handleLogin}
      >
        <Input
          field='email'
          label='Email'
          value={formData.email.value}
          onChangeHandler={onValueChange}
          type='text'
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.email.showError}
          validationMessage={emailValidationMessage}
          placeholder={'ejemplo@gmail.com'}
        />

        <Input
          field='password'
          label='Password'
          value={formData.password.value}
          onChangeHandler={onValueChange}
          type='password'
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
          placeholder={'Mínimo 6 Caracteres sin espacios vacíos'}
        />
        <button
          disabled={isSubmitButtonDisable}
        >
          Iniciar Sesión
        </button>
      </form>
      <span style={{ textAlign: 'center' }} onClick={switchAuthHandler} className="auth-form-switch-label">
        ¿Aún no tienes una cuenta? <br /> ¡Registrate...!
      </span>
    </div>
  )
}
