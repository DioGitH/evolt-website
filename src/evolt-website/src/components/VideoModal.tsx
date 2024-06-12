import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function VideoModal({ videoUrl }:any) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // function openNewTab(url:any) {
  //   window.open(url, '_blank')!.focus();
  // }
  

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center justify-center text-xs bg-pallete-4 rounded px-3 py-1 my-1.5 text-palette-3"
      >
        Kamera
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

          <div className="fixed inset-0 bg-black/30" aria-hidden="true">
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-md p-8 align-middle shadow-xl transition-all bg-palette-3">
                  <button
                    onClick={closeModal}
                    className="absolute top-0 right-0 m-4 text-red-700 hover:text-red-900"
                  >
                    X
                  </button>
                  <div className="relative pt-[30%] "> {/* 1:1 Aspect Ratio */}
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={videoUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
