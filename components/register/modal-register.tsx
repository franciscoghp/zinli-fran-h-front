import { Dialog, Transition } from '@headlessui/react'
import { Fragment, PropsWithChildren, useState } from 'react'

type ModalProps = PropsWithChildren<{
  open?: boolean,
  detail?: boolean,
  onClose: (evt: boolean) => void
}>
export default function ModalRegister({open, onClose, children}: ModalProps) {
  const [isOpen, setIsOpen] = useState(open)

  function closeModal(close: boolean) {
    onClose(close);
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 opacity-70 bg-gray-900 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
            <div className="flex min-h-full items-center text-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[50%] my-6 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}