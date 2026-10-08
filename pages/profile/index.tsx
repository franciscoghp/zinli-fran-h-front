import { API_URL } from "../../utils/api";
import { useEffect, useState } from "react";

export default function Profile({ onClose}: any) {
    const [user, setUser] = useState<any>(Object);
    const [posts, setPosts] = useState<any[]>([]);
    const [totalLikes, setNumberLikes] = useState<number>(0);

    useEffect(() => {
        const user = typeof window !== 'undefined' && JSON.parse(String(localStorage.getItem('user-logged')));
        setUser(user.user)
        getPosts(user.user);
    }, [])

    const getPosts = async (userCurrect: any) => {
        let posts: any = await fetch(API_URL + '/post/' + userCurrect.id);
        if(posts.ok)
          posts = await posts.json();
          setPosts(posts)
          console.log(posts)
          const totalLikes = posts.reduce((total: any, post: { likes: any[]; }) => total + post.likes.length, 0);
          setNumberLikes(totalLikes)
    }


    return (
        <div className="Drawer bg-white rounded-tl-xl rounded-bl-xl shadow flex-col justify-center items-center inline-flex w-full">
            <div className="DrawerHeader self-stretch  flex-col justify-start items-center flex">
                <div className="Content self-stretch h-12 px-6 pt-6 flex-col justify-start items-start gap-4 flex">
                    <div className="TextAndSupportingText self-stretch h-6 flex-col justify-start items-start gap-1 flex">
                    <   div className="Text self-stretch text-gray-800 text-lg font-bold  leading-normal">Detalle de Perfíl</div>
                    </div>
                </div>

                <div className="PaddingBottom self-stretch h-5" />
            </div>
            <div className="DrawerContent self-stretch grow shrink basis-0 px-2 flex-col justify-start items-center gap-2 flex">
                <div className="Frame1000004463 self-stretch grow shrink basis-0 flex-col justify-start items-center gap-2 flex">
                    <div className="Table self-stretch  rounded border border-neutral-200 flex-col justify-start items-start flex">
                        <div className="Frame1000004464 self-stretch justify-start items-start inline-flex">
                            <div className="Frame121 grow shrink basis-0 px-6 py-3 border-r border-b border-neutral-200 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="NombresYApellidos opacity-50 text-gray-500 text-sm font-normal  leading-tight">Nombres y Apellidos</div>
                                <div className="Frame1000004457 self-stretch justify-start items-start gap-1 inline-flex">
                                    <div className="FullName text-zinc-800 text-sm font-medium  leading-tight">{user?.name}</div>
                                    <div className="LastName text-zinc-800 text-sm font-medium  leading-tight">{user?.surname}</div>
                                </div>
                            </div>
                        </div>
                        <div className="Frame1000004464 self-stretch justify-start items-start inline-flex">
                            <div className="Frame121 grow shrink basis-0 px-6 py-3 border-r border-b border-neutral-200 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="NombresYApellidos opacity-50 text-gray-500 text-sm font-normal  leading-tight">Nombre de Usuario</div>
                                <div className="Frame1000004457 self-stretch justify-start items-start gap-1 inline-flex">
                                    <div className="FullName text-zinc-800 text-sm font-medium  leading-tight">{user?.username}</div>
                                </div>
                            </div>
                        </div>
                        <div className="Frame1000004464 self-stretch justify-start items-start inline-flex">
                            <div className="Frame121 grow shrink basis-0 px-6 py-3 border-r border-b border-neutral-200 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="NombresYApellidos opacity-50 text-gray-500 text-sm font-normal  leading-tight">Rol</div>
                                <div className="Frame1000004457 self-stretch justify-start items-start gap-1 inline-flex">
                                    <div className="FullName text-zinc-800 text-sm font-medium  leading-tight">{user?.role}</div>
                                </div>
                            </div>
                        </div>
                        <div className="Frame1000004464 self-stretch justify-start items-start inline-flex">
                            <div className="Frame121 grow shrink basis-0 px-6 py-3 border-r border-b border-neutral-200 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="NombresYApellidos opacity-50 text-gray-500 text-sm font-normal  leading-tight">Número de posts</div>
                                <div className="Frame1000004457 self-stretch justify-start items-start gap-1 inline-flex">
                                    <div className="FullName text-zinc-800 text-sm font-medium  leading-tight">{posts.length}</div>
                                </div>
                            </div>
                        </div>
                        <div className="Frame1000004464 self-stretch justify-start items-start inline-flex">
                            <div className="Frame121 grow shrink basis-0 px-6 py-3 border-r border-b border-neutral-200 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="NombresYApellidos opacity-50 text-gray-500 text-sm font-normal  leading-tight">Total de likes en tus posts</div>
                                <div className="Frame1000004457 self-stretch justify-start items-start gap-1 inline-flex">
                                    <div className="FullName text-zinc-800 text-sm font-medium  leading-tight">{totalLikes}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="self-stretch">
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                                <img src={user.avatar} alt="" className="mx-auto h-40 w-40 text-gray-400" />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="DrawerActions self-stretch h-[84px] pt-4 flex-col justify-start items-start flex">
                <div className="Content self-stretch px-6 pb-6 justify-end items-start gap-3 inline-flex">
                    <button onClick={() => {onClose()}} type="button" className="Button px-3.5 py-2.5 bg-white rounded-lg shadow border border-neutral-200 justify-center items-center gap-1 flex">
                        <div className="TextPadding px-0.5 justify-center items-center flex">
                            <div className="Text text-gray-800 text-base font-normal  leading-normal">Cerrar</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
};