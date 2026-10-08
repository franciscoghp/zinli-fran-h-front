import { API_URL } from "../utils/api";
import { FormEvent, PropsWithChildren, useEffect, useState } from "react";
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { notifyError, notifySuccess } from "./toast";
import Button from "./button";

export default function Card({ post }: PropsWithChildren<any>) {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState<any>(Object);

  useEffect(() => {
    const user = typeof window !== 'undefined' && JSON.parse(String(localStorage.getItem('user-logged')));
    setUser(user.user)
    const objetoEncontrado = post?.likes?.find((item: any) => item.id === user.user.id);
    setLiked(!!objetoEncontrado)
  }, [])

  const calcularTiempoTranscurrido = () => {
    const fechaInicial: Date = new Date(post.created_at);
    const fechaActual: Date = new Date();

    const diferenciaEnMs: number = fechaActual.getTime() - fechaInicial.getTime();
    const segundosTranscurridos: number = Math.floor(diferenciaEnMs / 1000);
    const minutosTranscurridos: number = Math.floor(segundosTranscurridos / 60);
    const horasTranscurridas: number = Math.floor(minutosTranscurridos / 60);
    const diasTranscurridos: number = Math.floor(horasTranscurridas / 24);
    const mesesTranscurridos: number = Math.floor(diasTranscurridos / 30);
    const añosTranscurridos: number = Math.floor(mesesTranscurridos / 12);

    if (añosTranscurridos > 0) {
        return `hace ${añosTranscurridos} años`;
    } else if (mesesTranscurridos > 0) {
        return `hace ${mesesTranscurridos} meses`;
    } else if (diasTranscurridos > 0) {
        return `hace ${diasTranscurridos} días`;
    } else if (horasTranscurridas > 0) {
        return `hace ${horasTranscurridas} horas`;
    } else if (minutosTranscurridos > 0) {
        return `hace ${minutosTranscurridos} minutos`;
    } else {
        return 'hace menos de un minuto';
    }
}

  const like = async (e: FormEvent) => {
    e.preventDefault();
    setLiked(!liked)

    try {
      let response: Response;
        response = await fetch(API_URL + '/post/like/' + post.id , {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...user })
        });
        console.log({response})
      if (response.ok) {
          // onClose(true, 'Resgistrado con éxito');
          const user = await response.json();
          // @ts-ignore
          dispatch(panelSignIn({ user: user.username }));
        } else {
          // onClose(false, response.statusText);
        }
    } catch (error) {
      console.log(error)
    }
  };

  const dislike = async (e: FormEvent) => {
    e.preventDefault();
    setLiked(!liked)

    try {
      let response: Response;
        response = await fetch(API_URL + '/post/dislike/' + post.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...user })
        });
        console.log({response})
      if (response.ok) {

        } else {
          // onClose(false, response.statusText);
        }
    } catch (error) {
      console.log(error)
    }
  };

  const reject = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let response: Response;
        response = await fetch(API_URL + '/post/reject/' + post.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      if (response.ok) {
          console.log('por aqui')
          notifySuccess();
        } else {
          notifyError();
        }
    } catch (error: any) {
      notifyError(error);
    }
  }

  const aproved = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let response: Response;
        response = await fetch(API_URL + '/post/aproved/' + post.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        console.log({response})
      if (response.ok) {
          notifySuccess();;
        } else {
          notifyError();
        }
    } catch (error: any) {
      notifyError(error);
    }
  }

    return (
      <>
      {
          !post.image ?

        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white rounded-3xl my-5">
          <div className="bg-white bg-opacity-80 text-black p-4 w-full flex items-center">
            <img className="w-10 border-2 border-blue-200 rounded-full mr-2" src={post.author.avatar} alt="Owner" />
            <span><b>@{post.author.username}</b></span>
          </div>
          <div className="px-6 pb-4">
            <p className="text-gray-700 text-base">{post.message}</p>
          </div>
          { post.image && <img className="w-full" height={300} src={post.image} alt="Post" /> }
          <div className="px-6 py-2 flex items-center">
            {
              !!liked ?
            <button onClick={dislike} className="text-gray-700 mr-4">
                <HeartIconSolid className="w-9 text-red-600"></HeartIconSolid>
            </button> :
            <button onClick={like} className="text-gray-700 mr-4">
                <HeartIcon className="w-9"></HeartIcon>
            </button>

            }

            { (liked )&&
              <span className="text-gray-700 text-sm">Le gusta a <b>{user.username}</b></span>
            }
            {/* { (post.likes && !liked )&&
              <span className="text-gray-700 text-sm">Le gusta a <b>{post.likes[0].username}</b> y <b>{post.likes.length - 1} más</b></span>
            } */}
            
          </div>

          <span className="px-6 py-4">{calcularTiempoTranscurrido()}</span>
    
          {
            window.location.href.includes('admin') &&
            <div className="ModalActions self-stretch h-[121px] pt-8 flex-col justify-start items-start flex">
              <div className="Content self-stretch h-16 px-6 pb-6 flex justify-start items-start gap-3">
                <Button type="button" className="flex-1 px-4 py-2.5 bg-red-700 rounded-lg border border-blue-700 justify-center items-center gap-2 inline-flex" onClick={reject}>
                  <div className="Text text-white text-sm font-semibold leading-tight">Eliminar</div>
                </Button>
                <Button type="button" className="flex-1 px-4 py-2.5 bg-blue-700 rounded-lg border border-blue-700 justify-center items-center gap-2 inline-flex" onClick={aproved}>
                  <div className="Text text-white text-sm font-semibold leading-tight">Aprobar</div>
                </Button>
              </div>
            </div>
          }
        </div> 

        : 

        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white rounded-3xl my-5">
          <div className="bg-white bg-opacity-80 text-black p-4 w-full flex items-center">
            <img className="h-6 w-6 border-2 border-blue-200 rounded-full mr-2" src={post.author.avatar} alt="Owner" />
            <span><b>@{post.author.username}</b></span>
          </div>
          { post.image && <img className="w-full" height={300} src={post.image} alt="Post" /> }
          <div className="px-6 py-2 flex items-center">
            {
              !!liked ?
            <button onClick={dislike} className="text-gray-700 mr-4">
                <HeartIconSolid className="w-9 text-red-600"></HeartIconSolid>
            </button> :
            <button onClick={like} className="text-gray-700 mr-4">
                <HeartIcon className="w-9"></HeartIcon>
            </button>

            }
            { post.likes && <img className="w-4 rounded-full mr-2  border-2 border-blue-200" src={post.likes[0]?.avatar} alt="User" /> } 
            <span className="text-gray-700 text-sm">Le gusta a <b>{post?.likes && post.likes[0].username}</b> y <b>{post.likes && post.likes.length - 1} más</b></span>
          </div>
          <div className="px-6 pb-4">
            <div className="font-bold text-xl mb-2">{post.author.username}</div>
            <p className="text-gray-700 text-base">{post.message}</p>
          </div>
          <span className="px-6 py-4">{calcularTiempoTranscurrido()}</span>

          {
            window.location.href.includes('admin') &&
            <div className="ModalActions self-stretch h-[121px] pt-8 flex-col justify-start items-start flex">
              <div className="Content self-stretch h-16 px-6 pb-6 flex justify-start items-start gap-3">
                <Button type="button" className="flex-1 px-4 py-2.5 bg-red-700 rounded-lg border border-blue-700 justify-center items-center gap-2 inline-flex" onClick={reject}>
                  <div className="Text text-white text-sm font-semibold leading-tight">Eliminar</div>
                </Button>
                <Button type="button" className="flex-1 px-4 py-2.5 bg-blue-700 rounded-lg border border-blue-700 justify-center items-center gap-2 inline-flex" onClick={aproved}>
                  <div className="Text text-white text-sm font-semibold leading-tight">Aprobar</div>
                </Button>
              </div>
            </div>
          }
        </div>
      }
      </>
      );
}