import { API_URL } from "../../utils/api";

import { FormEvent, useEffect, useState } from "react";
import { notifySuccess } from "../../components/toast";
import router from "next/router";
import Button from "../../components/button";
import ModalRegister from "../../components/register/modal-register";

export default function PostCreate() {
  const [data, setData] = useState({
    message: '',
    location: '',
    author: '',
    image: '',
    created_at: new Date(),
    status: 'DRAFTED',
    likes: []
  });

  const [errors, setErrors] = useState({
    message: '',
    location: '',
    author: '',
  });
  const [user, setUser] = useState<any>(Object);
  

  useEffect(() => {
    const user = typeof window !== 'undefined' && JSON.parse(String(localStorage.getItem('user-logged')));
    setUser(user.user)
  }, []);
  
  const onHandleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });

    setErrors({
      ...errors,
      [event.target.name] : ''
    });
  };
  
  const create = async (e: FormEvent) => {
      e.preventDefault();
      const errores = await validatesErrors();
      if( !!errores ) return;
      console.log({ ...data, location, author: user })
      try {
        let response: Response;
        response = await fetch(API_URL + '/post/' , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data, location, author: user })
          });
        
        if (response.ok) {
          notifySuccess()
          router.push('/admin')
        } else {

        }
      } catch (error) {
        console.log(error)
      }
  };
  
  const validatesErrors = () => {
    let errores: any
    if( data.message == '')
      errores = {
        ...errores,
        message: 'El message es requerido',
      }
    if( data.location == '')
      errores = {
        ...errores,
        location: 'El location es requerido',
      }
 
    setErrors({
      ...errores,
    });
    return errores;
  }

  return (
    <ModalRegister open={true} onClose={() => router.push('/')}>
    <div className="Modal w-full bg-white rounded-xl shadow flex-col justify-start items-center inline-flex">
      <div className="ModalHeader self-stretch h-[68px] flex-col justify-start items-center flex">
        <div className="Content self-stretch h-12 px-6 pt-6 flex-col justify-start items-start gap-4 flex">
          <div className="TextAndSupportingText self-stretch h-6 flex-col justify-start items-start gap-1 flex">
            <div className="Text self-stretch text-gray-800 text-lg font-semibold leading-normal">Nueva Post</div>
          </div>
        </div>
        <div className="ButtonCloseX w-11 h-11 p-2 rounded-lg justify-center items-center inline-flex">
          <div className="Close w-6 h-6 relative opacity-50" />
        </div>
        <div className="PaddingBottom self-stretch h-5" />
      </div>
      <div className="Content self-stretch  px-6 flex-col justify-start items-start gap-5 flex">
        <div className="Form self-stretch  flex-col justify-start items-start gap-4 flex">
          <div className="InputField self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
            <div className="InputWithLabel self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
              <div className="Label text-gray-800 text-sm font-medium leading-tight">Mensaje</div>

              <input type="text" placeholder="Ingresar Mensaje" name="message" onChange={onHandleChange}
              required={true} value={data.message}
              className="Input self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-neutral-200 justify-start items-center gap-2 inline-flex"/>
            </div>
            { errors.message && <div className="HintText self-stretch text-red-400 text-sm font-normal leading-tight">Este campo es obligatorio</div> }
          </div>

          <div className="InputField self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
            <div className="InputWithLabel self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
              <div className="Label text-gray-800 text-sm font-medium leading-tight">Localidad</div>

              <input type="text" placeholder="Ingresar Localidad" name="location" onChange={onHandleChange}
              required={true} value={data.location}
              className="Input self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-neutral-200 justify-start items-center gap-2 inline-flex"/>
            </div>
            { errors.location && <div className="HintText self-stretch text-red-400 text-sm font-normal leading-tight">Este campo es obligatorio</div> }
          </div>

        </div>
      </div>
      <div className="ModalActions self-stretch h-[121px] pt-8 flex-col justify-start items-start flex">
        <div className="Content self-stretch h-16 px-6 pb-6 flex justify-start items-start gap-3">
          <Button type="button" className="flex-2 px-4 py-2.5 bg-red-700 rounded-lg border border-blue-700 justify-center items-center gap-2 inline-flex" onClick={() => router.push('/')}>
            <div className="Text text-white text-sm font-semibold leading-tight">Cancelar</div>
          </Button>
          <Button type="button" className="flex-1 px-4 py-2.5 bg-blue-700 rounded-lg border border-blue-700 justify-center items-center gap-2 inline-flex" onClick={create}>
            <div className="Text text-white text-sm font-semibold leading-tight">Crear</div>
          </Button>
        </div>
      </div>

    </div>

    </ModalRegister>
  )
}
