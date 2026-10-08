import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { panelSignIn } from "../../store/thunk/panelLogin";
import { Toaster } from "react-hot-toast";
import { notifyError, notifySuccess } from "../../components/toast";
import ModalRegister from "../../components/register/modal-register";
import UserCreateNew from "../../components/register/create-new";

export default function Login() {
    // Demo users (the API uses sample data, login is by username only)
    const DEMO_ADMIN = 'xropkes0';
    const DEMO_USER = 'prevening1';
    const [user, setUser] = useState(DEMO_ADMIN);
    const [loading, setLoading] = useState(false);
    const [openCreateNew, setOpenCreateNew] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector((state: any) => {
        return state.auth;
    });

    useEffect(() => {
        if (auth.userLogged) router.push('/');
    }, [auth]);


    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        // @ts-ignore
        const logged = await dispatch(panelSignIn({ user }));
        setLoading(false);
        if (logged.error) notifyError('Error al iniciar sesión')
        console.log({logged})
    }

    return (
        <div className="flex justify-center items-center h-screen bg-slate-700">
            <div className="flex flex-col md:flex-row shadow w-2/3 md:w-2/3 md:h-4/5 ">
                <div className="flex flex-col justify-center px-8 p-6 w-1/2 bg-white rounded">
                    <h1 className="font-bold">Ingresar a la Mejor App del Mundo</h1>
                    <form>
                        <div>
                            <label className="text-gray-400 text-xs">Usuario</label> <br/>
                            <input value={user} onChange={(e) => setUser(e.target.value)}
                                type="text" className="shadow rounded w-full" name="user" id="user" />
                        </div>
                        {auth.errorLogin && <p className="text-red-500 text-xs mt-2">Credenciales inválidas</p>}
                        {loading && <p className="text-purple-500 text-xs mt-2">Cargando...</p>}
                        <div className="mt-4 rounded border border-purple-200 bg-purple-50 p-2 text-xs text-gray-600">
                            <p className="font-semibold text-purple-800">Acceso demo (sin contraseña)</p>
                            <div className="mt-1 flex gap-2">
                                <button type="button" onClick={() => setUser(DEMO_ADMIN)} className="flex-1 rounded border border-purple-400 px-1 py-0.5 text-purple-800 hover:bg-purple-100">Admin: {DEMO_ADMIN}</button>
                                <button type="button" onClick={() => setUser(DEMO_USER)} className="flex-1 rounded border border-purple-400 px-1 py-0.5 text-purple-800 hover:bg-purple-100">Usuario: {DEMO_USER}</button>
                            </div>
                        </div>
                        <button onClick={onFormSubmit} className="bg-purple-800 p-1 text-md w-full rounded text-white mt-4"><b>Ingresar</b></button>
                        <div className="mt-[20%]">
                            <span className="p-1 text-xs text-purple-600 inline-flex justify-center">¿No tienes cuenta?, regístrate gratis</span>
                            <button type="button" onClick={() => setOpenCreateNew(true)} className="bg-purple-800 p-1 text-md w-full rounded text-white">Regístrate</button>
                        </div>
                   </form>
                </div>
                <div className="bg-green-400 p-6 text-white flex items-end md:w-1/2 rounded">
                    {/* <h1 className="font-bold">Bienvenido de vuelta</h1> */}
                    <img className="w-[100%] h-[100%] " src="data:image/png;base64,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" alt="" />
                </div>
            </div>

            {/* Modal De Crear Fotografo Nuevo */}
            {openCreateNew && 
            <ModalRegister open={openCreateNew} onClose={() => setOpenCreateNew(false)}>
                <UserCreateNew
                    onClose={(ok?: boolean, message?: any) => {
                        if( !!ok ) notifySuccess();
                        if( ok == false ) notifyError(message)
                        setOpenCreateNew(false);
                    }}/>
            </ModalRegister>}
            <Toaster  position="top-right"/>
        </div>
        
    )
}