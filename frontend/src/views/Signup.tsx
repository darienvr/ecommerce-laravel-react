import React, {useRef, useState} from 'react';
import axiosClient from '../axios';

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
  
    //const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null);
  
    const onSubmit = (e:any) => {
      e.preventDefault()
      const payload = {
        //name: nameRef.current.value,
        //email: emailRef.current.value,
        //password: passwordRef.current.value,
        //password_confirmation: passwordConfirmationRef.current.value,
      }
   
      axiosClient.post('/signup', payload)
        .then(({data})=> {
          setUser(data.user)
          setToken(data.token)
        })
        .catch(err=>{
          const response = err.response;
          if(response && response.status === 422){
            setErrors(response.data.errors)
          }
        })
    }
  
    return (
      <div>
          <h3 className='title-signup'>Ingrese sus datos </h3>
          <form onSubmit={onSubmit} className='formulario'>
            <label className='form-label'><b>Nombre</b> </label>
            <input ref={nameRef}  className='form-control' type='text'></input> 
            <label className='form-label'><b>Email</b> </label> 
            <input ref={emailRef} className='form-control'  type='email'></input>
            <label className='form-label'><b>Contraseña</b> </label>
            <input ref={passwordRef} className='form-control'  type='password'></input>
            <label className='form-label'><b>Confirmar contraseña</b></label> 
            <input ref={passwordConfirmationRef} className='form-control'  type='password'></input>
            <button className='btn-login' type='submit'>Registrar</button>
            <div className='contenedor-registrarse'>
              <p>¿Ya tiene una cuenta?</p>
              <a className='btn-link' href='/login'>Iniciar Sesion</a>
            </div>
            
          </form>
      </div>
    )
}

export default Signup