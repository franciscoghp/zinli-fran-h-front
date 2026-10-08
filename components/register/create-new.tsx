import { API_URL } from "../../utils/api";

import Button from "../button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { panelSignIn } from "../../store/thunk/panelLogin";

const images: string[] = [
  "https://robohash.org/nihilnonquia.png?size=50x50&set=set1",
  "https://robohash.org/totamconsequaturfugiat.png?size=50x50&set=set1",
  "https://robohash.org/temporibusconsequaturaut.png?size=50x50&set=set1",
  "https://robohash.org/mollitiarecusandaevoluptatem.png?size=50x50&set=set1",
  "https://robohash.org/omnisipsummaiores.png?size=50x50&set=set1",
  "https://robohash.org/fugaeiusdebitis.png?size=50x50&set=set1",
  "https://robohash.org/quaeratquiavoluptas.png?size=50x50&set=set1",
  "https://robohash.org/quibusdamsitpariatur.png?size=50x50&set=set1",
  "https://robohash.org/estperspiciatisautem.png?size=50x50&set=set1",
  "https://robohash.org/quiaetmagni.png?size=50x50&set=set1",
  "https://robohash.org/faceredolorumvel.png?size=50x50&set=set1",
  "https://robohash.org/estnecessitatibusminima.png?size=50x50&set=set1",
  "https://robohash.org/sitettempora.png?size=50x50&set=set1",
  "https://robohash.org/errorvelitet.png?size=50x50&set=set1",
  "https://robohash.org/atcumquasi.png?size=50x50&set=set1",
  "https://robohash.org/adquisequi.png?size=50x50&set=set1",
  "https://robohash.org/quisquamsedmagnam.png?size=50x50&set=set1",
  "https://robohash.org/velittemporealiquid.png?size=50x50&set=set1",
  "https://robohash.org/eosautducimus.png?size=50x50&set=set1",
  "https://robohash.org/aetipsam.png?size=50x50&set=set1",
];

export default function UserCreateNew({ onClose  }: any){
const [data, setData] = useState({
  username: '',
  name: '',
  surname: '',
  avatar: '',
  role: 'DRAFTED'
});
const [selectedImage, setSelectedImage] = useState<number | null>(null);
const dispatch = useDispatch();
const [errors, setErrors] = useState({
  username: '',
  surname: '',
  name: '',
  nameFormat: '',
  file: ''
});

const onHandleChange = (event: any) => {
  setData({ ...data, [event.target.name]: event.target.value });
  let errores: any
  setErrors({
    ...errores,
  });
};

const create = async (e: FormEvent) => {
  e.preventDefault();
  const errores = await validatesErrors();
  if( !!errores ) return;

  try {
    let response: Response;
      response = await fetch(API_URL + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data })
      });
      console.log({response})
    if (response.ok) {
        onClose(true, 'Resgistrado con éxito');
        const user = await response.json();
        // @ts-ignore
        dispatch(panelSignIn({ user: user.username }));
      } else {
        onClose(false, response.statusText);
      }
  } catch (error) {
    console.log(error)
  }
};


const validatesErrors = () => {
  let errores: any;
  const usernamePattern = /^[^\s]+$/;
  if( data.name == '')
    errores = {
      ...errores,
      name: 'El nombre es requerido',
    }
    
    if( data.surname == '')
      errores = {
        ...errores,
        surname: 'El apellido es requerido',
      }
  
    if( !usernamePattern.test(data.name) )
    errores = {
      ...errores,
      nameFormat: 'El nombre no puede tener espacios en blanco',
    }


  setErrors({
    ...errores,
  });
  return errores;
}

// Función para manejar el clic en una imagen
const handleImageClick = (index: number) => {
  setSelectedImage(index);
  setData({ ...data, avatar: images[index]})
};

    return(
        <div className="Modal w-full bg-white rounded-xl shadow flex-col justify-start items-center inline-flex">
            <div className="ModalHeader self-stretch h-[68px] relative items-center flex">

              <div className="Content w-[88.666667%] self-stretch h-12 px-6 pt-6 flex-col justify-start items-start gap-4 inline-flex">
                <div className="TextAndSupportingText self-stretch h-6 flex-col justify-start items-start gap-1 flex">
                  <div className="Text self-stretch text-gray-800 text-lg font-semibold leading-normal">Nuevo miembro</div>
                </div>
              </div>
              <XMarkIcon className="h-5 w-5 cursor-pointer inset-y-0 right-0" onClick={() => onClose()}></XMarkIcon>

            </div>
            <div className="Content self-stretch px-6 flex-col justify-start items-start gap-5 flex">
              <div className="Form self-stretch flex-col justify-start items-start gap-4 flex">

                  <div className="InputField self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
                    <div className="InputWithLabel self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
                      <div className="Label text-gray-800 text-sm font-medium leading-tight">Usuario</div>

                      <input type="text" placeholder="Definir Usuario" name="username" onChange={onHandleChange}
                      required={true} value={data.username}
                      className="Input self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-neutral-200 justify-start items-center gap-2 inline-flex"/>
                    </div>
                    { errors.username && <div className="HintText self-stretch text-red-400 text-sm font-normal leading-tight">Este campo es obligatorio</div> }
                    { errors.nameFormat && <div className="HintText self-stretch text-red-400 text-sm font-normal leading-tight">El nombre no puede tener espacios en blanco</div> }
                    <div className="HintText self-stretch text-gray-500 text-sm font-normal leading-tight">Con este usuario el miembro ingresará al sistema</div>
                  </div>

                  <div className="InputField self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
                    <div className="InputWithLabel self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
                      <div className="Label text-gray-800 text-sm font-medium leading-tight">Nombre</div>

                      <input type="text" placeholder="Definir Nombre" name="name" onChange={onHandleChange}
                      required={true} value={data.name}
                      className="Input self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-neutral-200 justify-start items-center gap-2 inline-flex"/>
                    </div>
                    { errors.name && <div className="HintText self-stretch text-red-400 text-sm font-normal leading-tight">Este campo es obligatorio</div> }
                  </div>

                  <div className="InputField self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
                    <div className="InputWithLabel self-stretch h-auto flex-col justify-start items-start gap-1.5 flex">
                      <div className="Label text-gray-800 text-sm font-medium leading-tight">Apellido</div>

                      <input type="text" placeholder="Definir Apellido" name="surname" onChange={onHandleChange}
                      required={true} value={data.surname}
                      className="Input self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-neutral-200 justify-start items-center gap-2 inline-flex"/>
                    </div>
                    { errors.surname && <div className="HintText self-stretch text-red-400 text-sm font-normal leading-tight">Este campo es obligatorio</div> }
                  </div>


                  <div className="self-stretch">
                    <label className="block text-sm font-medium text-gray-700">Seleccione su avatar:</label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 bg-slate-100">

                      <div className="grid grid-cols-5 gap-4">
                          {images.map((imageUrl, index) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt={`Image ${index}`}
                              className={`cursor-pointer ${selectedImage === index ? 'rounded-full border-4 border-blue-500' : ''}`}
                              onClick={() => handleImageClick(index)}
                            />
                          ))}
                        </div>

                    </div>
                  </div>
              </div>
            </div>
            <div className="ModalActions self-stretch h-[121px] pt-8 flex-col justify-start items-start flex">
              <div className="DividerWrap self-stretch h-[25px] pb-6 flex-col justify-start items-start flex" />
              <div className="Content self-stretch h-16 px-6 pb-6 flex-col justify-start items-start gap-3 flex">
                <Button type="button" className="self-stretch px-4 py-2.5 bg-blue-700 rounded-lg border border-blue-700 justify-center items-center gap-2 inline-flex" onClick={create}>
                    <div className="Text text-white text-sm font-semibold leading-tight">{'Registrar'}</div>
                </Button>
              </div>
            </div>
        </div>

    )
}
