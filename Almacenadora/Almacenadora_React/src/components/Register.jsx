import {
  passConfirmationValidationMessage,
  validatePasswordConfirm,
  validateEmail,
  emailValidationMessage,
  passwordValidationMessage,
  validatePassword,
  usernameValidationMessage,
  validateUsername
} from "../shared/validators/validaroAll.js"
import { Input } from "./Input.jsx"
import { useState } from "react"
import { useRegister } from "../shared/hooks/useRegister.jsx"

export const Register = ({ switchAuthHandler }) => {

  const { register, isLoading } = useRegister()

  const [formData, setFormData] = useState(
    {
      email: {
        value: '',
        isValid: false,
        showError: false
      },
      username: {
        value: '',
        isValid: false,
        showError: false
      },
      password: {
        value: '',
        isValid: false,
        showError: false
      },
      passwordConfirm: {
        value: '',
        isValid: false,
        showError: false
      }
    }
  )

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
      case 'username':
        isValid = validateUsername(value)
        break
      case 'password':
        isValid = validatePassword(value)
        break
      case 'passwordConfirm':
        isValid = validatePasswordConfirm(formData.password.value, value)
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

  const handleRegister = async (e) => {
    e.preventDefault()
    register(
      formData.email.value,
      formData.username.value,
      formData.password.value
    )
    switchAuthHandler()
  }

  const isSubmitButtonDisable = !formData.email.isValid ||
    !formData.username.isValid ||
    !formData.password.isValid ||
    !formData.passwordConfirm.isValid
  return (
    <div className="register-container" style={{ backgroundColor: '#202c33' }}>
      <div style={{ backgroundColor: '#2a3942', borderRadius: '10px', width: '90%' }}>
        <h1 style={{ textAlign: 'center' }}>Registrar</h1>
      </div>
      <form
        className="auth-form"
        onSubmit={handleRegister}
      >
        <Input
          field='email'
          label='Email'
          type='email'
          value={formData.email.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.email.showError}
          validationMessage={emailValidationMessage}
          placeholder={'ejemplo@gmail.com'}
        />

        <Input
          field='username'
          label='Username'
          type='text'
          value={formData.username.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.username.showError}
          validationMessage={usernameValidationMessage}
          placeholder={'De 3 a 8 caracteres sin usar espacios'}
        />

        <Input
          field='password'
          label='Password'
          type='password'
          value={formData.password.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
          placeholder={'Mínimo 6 caracteres sin usar espacios'}
        />

        <Input
          field='passwordConfirm'
          label='Password Confirmation'
          type='password'
          value={formData.passwordConfirm.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.passwordConfirm.showError}
          validationMessage={passConfirmationValidationMessage}
          placeholder={'Mínimo 6 caracteres sin usar espacios'}
        />
        <button
          disabled={isSubmitButtonDisable}
        >
          Registrarse
        </button>
      </form>
      <span onClick={switchAuthHandler}>
        ¿Ya tienes una cuenta? ¡Inicia sesión acá!
      </span>
    </div>
  )
}