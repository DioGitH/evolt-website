import { Fragment, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { ListUser } from "./dataUser";

export function ButtonEdit() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <button
        style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        type="button"
        onClick={openModal}
        className="text-xs bg-pallete-4 rounded px-3 py-1 my-1.5 text-palette-3"
      >
        <img className="h w-auto" src="/assets/img/editButton.svg" />
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
            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[28em] w-full max-w-sm transform overflow-hidden rounded-md p-8 align-middle shadow-xl transition-all bg-palette-3">
                  <Dialog.Title
                    as="h3"
                    className="className=text-lg font-medium leading-6 text-black w-full text-center"
                  >
                    Update Pintu
                  </Dialog.Title>
                  <div className="max-w-screen mx-auto mb-2">
                    <label
                      htmlFor="username"
                      className="block mb-1 text-sm font-medium text-gray-700 text-left"
                    >
                      Nama Pintu
                    </label>
                    <input
                      type="text"
                      id="namapintu"
                      name="namapintu"
                      className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                    />
                  </div>
                  <div className="max-w-screen mx-auto mb-2">
                    <label
                      htmlFor="namapintu"
                      className="block mb-1 text-sm font-medium text-gray-700 text-left"
                    >
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      id="deskripsi"
                      name="deskripsi"
                      className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                    />
                  </div>
                  <div className="max-w-screen mx-auto mb-2">
                    <label
                      htmlFor="namapintu"
                      className="block mb-1 text-sm font-medium text-gray-700 text-left"
                    >
                      User Akses
                    </label>
                    <ListUser />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border bg-pallete-4 px-4 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
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
  );
}
export function ButtonDelete(props: any) {
  const [isOpen, setIsOpen] = useState(false);

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
        className="text-xs bg-pallete-4 rounded px-3 py-1 my-1.5 text-palette-3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            className="h w-auto"
            src="/assets/img/deleteButton.svg"
            alt="Delete Icon"
          />
        </div>
        <div>Delete</div>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0">
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
                    <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-md p-8 align-middle shadow-xl transition-all bg-palette-3">
                      <Dialog.Title className="text-lg font-medium leading-6 text-black w-full text-center">
                        Apakah kamu yakin <br /> DELETE data ini ?
                      </Dialog.Title>
                      <div className="flex justify-center mt-6">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-palette-2 px-8 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 m-3"
                          onClick={closeModal}
                          style={{
                            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-pallete-4 px-8 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 m-3"
                          onClick={closeModal}
                          style={{
                            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          No
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export function ButtonTambahPintu(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        type="button"
        onClick={openModal}
        className="text-xs bg-pallete-4 rounded px-3 py-1 my-1.5 text-palette-3"
      >
        <img className="h w-auto" src="/assets/img/doorButton.svg" />
        Tambah Pintu
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
                <Dialog.Panel className="h-[30em] w-full max-w-sm transform overflow-hidden rounded-md p-8 align-middle shadow-xl transition-all bg-palette-3">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-black w-full text-center"
                  >
                    Tambah Pintu
                  </Dialog.Title>
                  <div className="grid justify-center h-fit p-2 rounded-md text-palette-3"></div>
                  <div className="max-w-screen mx-auto mb-2">
                    <label
                      htmlFor="namapintu"
                      className="block mb-1 text-sm font-medium text-gray-700 text-left"
                    >
                      Nama Pintu
                    </label>
                    <input
                      type="text"
                      id="namapintu"
                      name="namapintu"
                      className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                    />
                  </div>
                  <div className="max-w-screen mx-auto mb-2">
                    <label
                      htmlFor="namapintu"
                      className="block mb-1 text-sm font-medium text-gray-700 text-left"
                    >
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      id="deskrpsi"
                      name="desk"
                      className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                    />
                  </div>
                  <div className="max-w-screen mx-auto mb-2">
                    <label
                      htmlFor="namapintu"
                      className="block mb-1 text-sm font-medium text-gray-700 text-left"
                    >
                      User Akses
                    </label>
                    <ListUser />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border bg-pallete-4 px-4 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
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
  );
}
