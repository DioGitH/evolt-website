import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function DetailPintu({ itemId, user, pintu }: any) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center text-xs text-white bg-pallete-4 rounded px-3 py-1 my-1.5 text-palette-32"
      >
        <img className="h w-auto m-1" src="/assets/img/detailButton.svg" />
        <span className="sr-only"></span>Detail
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
                    <div>Detail {pintu}</div>
                  </Dialog.Title>

                  <div className="grid justify-center text-center h-fit p-5 m-4 rounded-md text-palette-3">
                    <div className="image w-full rounded-lg overflow-hidden mb-5">
                      {/* <img
                        src="/assets/img/dummyDetail.jpeg"
                        alt=""
                        className="image max-w-48 h-fit"
                      /> */}
                    </div>
                    <TextDetail pintu={pintu} user={user} />
                    <div className="grid justify-center"></div>
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
  );
}

export function TextDetail({ user, pintu }: any) {
  return (
    // <div className="grid">
    //   {/* <div className="font-semibold">{pintu}</div> */}
    //   {/* <div className="font-semibold">{user}</div>
    //    */}

    // </div>
    <div className="grid">
      {user.map((item: any, index: any) => (
        <div key={index} className="font-semibold">
          {item}
          <br />
        </div>
      ))}
    </div>
  );
}
