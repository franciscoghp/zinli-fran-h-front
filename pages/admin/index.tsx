import { API_URL } from "../../utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { setLoading } from "../../store/loadingSlice";
import RouteGuard from "../../guards/RouteGuard";
import Card from "../../components/card";
import PanelLayout from "../../components/panel-layout";

export default function Tags() {
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState(Object);
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect( () => {
    console.log(new Date())
    const user = typeof window !== 'undefined' ? JSON.parse(String(localStorage.getItem('user-logged'))) : null;
    getPosts(user);
    setUser(user.user)
  }, [])

  const getPosts = async (user: any) => {
    dispatch( setLoading(true) )
    let posts: any = await fetch(API_URL + '/post/all/' + user.user.id);
    if(posts.ok)
      posts = await posts.json();
      setPosts(posts)
      console.log(posts)
      dispatch( setLoading(false) )
  }

  return (
    <RouteGuard>
          <PanelLayout>
          <div className="max-w-3xl mx-auto mt-4">
            
              <div className="flex items-center space-x-4 mb-1 bg-white rounded p-4">
                <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-blue-200" />
                <div>
                  <h2 className="text-2xl font-semibold">@{user.username}</h2>
                  <p className="text-gray-600">{user.name} {user.surname}</p>
                </div>
                
              </div>
              <div className="flex items-center mb-8 bg-white rounded p-4 mt-2">
                  <button
                    className="px-4 py-2 text-black inline-flex"
                    onClick={() => router.push('/')}
                  >
                    <ChevronLeftIcon className="w-7" />
                    <span className="h-5 w-5 text-lg">Volver</span>
                  </button>
                <div>
                  <h2 className="text-2xl font-semibold ml-[50%] w-full">Publicaciones por aprobar</h2>
                </div>
              </div>

              {
                posts.length == 0 ?
                <div className="bg-gray-900 flex justify-center items-center rounded">

                  <div className="p-12">
                    <h1 className="text-white w-6 w-full py-5">No hay publicaciones por aprobar todavia</h1> 
                    <button type="button" onClick={() => router.push('/posts/create')}  className="bg-purple-800 border-black p-1 text-md w-full rounded text-white">Crear Nuevo +</button>
                  </div>

                </div>
                :
                <div className="bg-gray-900 flex justify-center items-center rounded">
                  <div className="space-y-4">
                  {
                    posts.map( (post) =>
                      <Card
                          key={post.id}
                          post={post}
                        />
                    )
                  }
                  </div>
                </div>
              }

          </div>
          </PanelLayout>
    </RouteGuard>
  )
}
