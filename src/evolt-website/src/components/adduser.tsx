import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function AddUserModal() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button type="button" onClick={openModal} className="flex items-center p-2.5 ms-2 me-5 text-sm font-medium text-white bg-pallete-4 rounded-lg px-2 py-1" style={{ boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)' }}>
                <img className="h w-auto m-1" src="/assets/img/addUserIcon.svg" />
                <span className="sr-only">Tambah User</span> Tambah User
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 bg-black/30 " aria-hidden="true">
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-md p-8 align-middle shadow-xl transition-all bg-palette-3">
                                    <Dialog.Title
                                        className="text-lg font-medium leading-6 text-black w-full text-center"
                                    >
                                        Tambah User
                                    </Dialog.Title>
                                    
                                    <div className="grid justify-center h-fit p-2 rounded-md text-palette-3">
                                        <div className="image w-full rounded-lg overflow-hidden mb-2 flex justify-center">
                                            <img src="/assets/img/userIcon.svg" alt="" className="max-w-16 h-fit" />
                                        </div>
                                        <div>
                                            <div className="max-w-screen mx-auto mb-2">
                                                <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700 text-left">
                                                    USERNAME
                                                </label>
                                                <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                                                />
                                            </div>

                                            <div className="max-w-screen mx-auto mb-2">
                                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 text-left">
                                                    EMAIL
                                                </label>
                                                <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                className="w-full bg-palette-2 text-gray-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                                                />
                                            </div>

                                            <div className="max-w-screen mx-auto mb-2">
                                                <label htmlFor="pin" className="block mb-1 text-sm font-medium text-gray-700 text-left">
                                                    PIN
                                                </label>
                                                <input
                                                type="text"
                                                id="pin"
                                                name="pin"
                                                className="w-full bg-palette-2 text-gray-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                                                />
                                            </div>

                                            <div className="max-w-screen mx-auto mb-4">
                                                <label htmlFor="photo" className="block mb-1 text-sm font-medium text-gray-700 text-left">
                                                    UPLOAD PHOTO
                                                </label>
                                                <input
                                                type="file"
                                                id="photo"
                                                name="photo"
                                                accept=".jpg, .jpeg, .png, .svg"
                                                className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md bg-pallete-4 px-4 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                            style={{ boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.6)' }}
                                        >
                                            Simpan
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}