import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function DetailModal({itemId, time, username, image}:any) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="text-xs bg-pallete-4 rounded px-3 py-1 my-1.5 text-palette-3"
            >
                Edit
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-md backdrop-blur-xl p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-palette-2 w-full"
                                    >
                                        Detail Log
                                    </Dialog.Title>
                                    
                                    <div className="grid justify-center text-center h-fit p-5 m-4 rounded-md text-palette-3">
                                        <div className='image w-full rounded-lg overflow-hidden mb-5'>
                                            <img src="/assets/img/dummyDetail.jpeg" alt="" className='image max-w-48 h-fit' />
                                        </div>
                                        <TextDetail date={time} username={username}/>
                                        <div className='grid justify-center'>
                                            
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-pallete-4 bg-opacity-60 px-4 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Kembali
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

export function TextDetail({date, username}:any){
    return(
        <div className='grid'>
            <div className="font-semibold">
                {date}
            </div>
            <div className="font-semibold">
                {username}
            </div>
        </div>
    )
}
