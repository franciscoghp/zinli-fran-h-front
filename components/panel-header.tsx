import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import { classNames } from '../utils/classnames'
import { Toaster } from 'react-hot-toast'
import ModalFotografo from './register/modal-register'
import Profile from '../pages/profile'


export function PanelHeader() {
  const [user, setUser] = useState(Object);
  const [openDetail, setOpenDetail] = useState(false);
  const router = useRouter()

  const auth = useSelector((state: any) => {
    return state.auth;
  });

  useEffect(() => {
    if (!auth.userLogged) {
      router.push('/login');
    }
  }, [auth]);
  const dispatch = useDispatch();

  const onLogout = async (e: any) => {
    dispatch(logout());
  }

  useEffect( () => {
    const user = typeof window !== 'undefined' ? JSON.parse(String(localStorage.getItem('user-logged'))) : null;
    setUser(user.user)
  }, [])

  return <>
  <Disclosure as="nav" className="bg-white">
    {({ open }) => (
      <>
        <div className='flex flex-row justify-between items-center border lg:gap-20 py-2 px-9'>
          <div className='p-3 items-center flex'>
            <img className="px-6 w-[80px]"
              src="/tailwind.png"
              alt="" />
            <h2 className="text-lg w-full text-purple-800">¡¡ Bienvenido {user.username} !!</h2>
          </div>
          {/* <h2 onClick={() => setOpenCreate(true)}  className="text-md w-full text-purple-800">Bienvenido</h2> */}
          <div className="flex gap-2 items-center">
          <button type="button" onClick={() => router.push('/posts/create')}  className="bg-purple-800 border-black p-1 text-md w-full rounded text-white">Crear Nuevo +</button>
            <div className='md:flex gap-2 hidden'>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                {/* Profile dropdown */}

                <Menu as="div" className="relative">
                  <div className='inline-flex'>

                    <Menu.Button className="px-2 flex rounded-full items-center text-sm focus:outline-none ">
                        {/* <UserCircleIcon className="fill-gray-400 w-10 h-5'"/> */}
                        <img src={user.avatar} alt="" className='border border-blue-700 rounded-full' />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {
                        user.role == 'ADMIN' &&
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => router.push('/admin')}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                            >
                              Administrar
                            </button>
                          )}
                        </Menu.Item>
                      }
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setOpenDetail(true)}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                          >
                            Detalles del Perfil
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={onLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                          >
                            Desconectarse
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-100 p-2 text-gray-dark focus:outline-none focus:ring-2 focus:ring-primary">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>
        </div>
        <Disclosure.Panel className="md:hidden">
          <div className="border-t border-neatral-200 pb-3">

            <div className="mt-3 space-y-1 px-2">
              <Disclosure.Button
                as="a"
                href='/api/auth/logout'
                className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-dark hover:bg-indigo-100"
              >
               Desconectarse
              </Disclosure.Button>
            </div>
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>

  {/* Modal De Detalle */}
  {openDetail && 
  <ModalFotografo open={openDetail} onClose={() => setOpenDetail(false)} detail={true}>
      <Profile 
      // photographerDetail={photographerSelected}
      onClose={() => setOpenDetail(false)}/>
  </ModalFotografo>}
  <Toaster position="top-right"/>
  </>
}