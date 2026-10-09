import { API_URL } from "../utils/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/loadingSlice";
import Head from "next/head";
import PanelLayout from "../components/panel-layout";
import RouteGuard from "../guards/RouteGuard";
import Card from "../components/card";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState(Object);
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect( () => {
    console.log(new Date())
    const user = typeof window !== 'undefined' ? JSON.parse(String(localStorage.getItem('user-logged'))) : null;
    if( !user ) router.push('/login')
    else{
      getPosts(user);
      setUser(user.user)
    }
  }, [])

  const getPosts = async (user: any) => {
    dispatch( setLoading(true) )
    let posts: any = await fetch(API_URL + '/post/' + user.user.id);
    if(posts.ok)
      posts = await posts.json();
      setPosts(posts)
      console.log(posts)
      dispatch( setLoading(false) )
}



  return <RouteGuard>
    <PanelLayout>
      <Head>
        <title>Social Feed</title>
      </Head>
          <div className="max-w-3xl mx-auto mt-4">
            
              <div className="flex items-center space-x-4 mb-8 bg-white rounded p-4">
                <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-blue-200" />
                <div>
                  <h2 className="text-2xl font-semibold">@{user.username}</h2>
                  <p className="text-gray-600">{user.name} {user.surname}</p>
                </div>
              </div>

              {
                posts.length == 0 ?
                <div className="bg-gray-900 flex justify-center items-center rounded">

                  <div className="p-12">
                    <h1 className="text-white w-6 w-full py-5">No hay publicaciones todavia</h1> 
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
  </RouteGuard>;
}




