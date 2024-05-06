export const validateEmail = (email)=>{
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
}


export const validatePassword = (password)=>{
    const regex = /^\S{6,12}$/
    return regex.test(password)
}


export const validatePasswordConfirm = (pass, confirmPass)=>{
    return pass === confirmPass
}


export const validateUsername = (username)=>{
    const regex = /^\S{3,20}$/
    return regex.test(username)
}

export const validateCaracteres = (cadena)=>{
    const regex = /^[a-zA-Z\s]{3,20}$/
    return regex.test(cadena)
}

export const validateFecha = (fecha)=>{
    const regex = /^(\d{2}\/\d{2}\/\d{4})$/
    return regex.test(fecha)
}

export const convertedFecha = (fecha)=>{
    const partes = fecha.split('/');
    return `${partes[2]}-${partes[1]}-${partes[0]}`
}

export const validateActivo = (activo)=>{
    const regex = /^(true|false)$/
    return regex.test(activo)
}

export const emailValidationMessage = 'Por favor ingresa un correo válido'
export const passwordValidationMessage = 'La contraseña debe tener entre 6 y 12 caracteres y no tenes espacios vacíos'
export const passConfirmationValidationMessage = 'La contraseña no coincide'
export const usernameValidationMessage = 'Nombre de usuario inválido, mínimo 3 máximo 8 caracteres. No se aceptan espacios'
export const cadenaValidationMessage = 'No se aceptan caracteres especiales'
export const fechaValidationMessage = 'Fecha incorrecta el formato es: dia/mes/año'
export const activoValidationMessage = 'Solo palabra true | false no se aceptan otra'