import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { ListUser } from "./dataUser";
import axios from "axios";

export function ButtonEdit({id_door, onUpdateSuccess}:any) {
  const [isOpen, setIsOpen] = useState(false);
  const [doorName, setDoorName] = useState("");
  const [doorDescription, setDoorDescription] = useState("");
  const [doorStatus, setDoorStatus] = useState("close");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getDoorById = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/doors/get/${id_door}`);
      if (response.data.success) {
        const { id_door, door_name, door_description, door_status, users } = response.data.data;
        setDoorName(door_name);
        setDoorDescription(door_description);
        setDoorStatus(door_status);
        setSelectedUsers(users.map(user=> user.id_user));
        // console.log(selected_users);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getUsers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/users`);
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckboxChange = (selectedUsers: any) => {
    setSelectedUsers(selectedUsers);
  }

  const updateDoor = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/doors/${id_door}`, {
        door_name: doorName,
        door_description: doorDescription,
        door_status: doorStatus,
        id_user: selectedUsers,
      })

      if (response.data.success) {
        setDoorName("");
        setDoorDescription("");
        setSelectedUsers([]);
        setDoorStatus("close");
        onUpdateSuccess();
        closeModal();
        // alert('Data berhasil disimpan!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    getUsers();
    getDoorById();
  }, [isOpen]);

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
                  <form onSubmit={updateDoor}>
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
                        value={doorName}
                        onChange={(e) => setDoorName(e.target.value)}
                        className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                      />
                    </div>
                    <div className="max-w-screen mx-auto mb-2">
                      <label
                        htmlFor="deskripsi"
                        className="block mb-1 text-sm font-medium text-gray-700 text-left"
                      >
                        Deskripsi
                      </label>
                      <input
                        type="text"
                        id="deskripsi"
                        name="deskripsi"
                        value={doorDescription}
                        onChange={(e) => setDoorDescription(e.target.value)}
                        className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                      />
                    </div>
                    <div className="max-w-screen mx-auto mb-2">
                      <label
                        htmlFor="userakses"
                        className="block mb-1 text-sm font-medium text-gray-700 text-left"
                      >
                        User Akses
                      </label>
                      <ListUser users={users} selectedUsers={selectedUsers} onCheckboxChange={handleCheckboxChange} />
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border bg-pallete-4 px-4 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export function ButtonDelete({id_door, onDeleteSuccess}: any) {
  const [isOpen, setIsOpen] = useState(false);

  const deleteUser = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/doors/${id_door}`);
      onDeleteSuccess(); 
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(){
    deleteUser();
    closeModal();
  }

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
                          onClick={handleDelete}
                          
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

export function ButtonTambahPintu({onAddSuccess}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [doorName, setDoorName] = useState("");
  const [doorDescription, setDoorDescription] = useState("");
  const [doorStatus, setDoorStatus] = useState("close");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (selectedUsers:any) => {
    setSelectedUsers(selectedUsers);
  }

  const saveDoor = async(e:any) =>{
    e.preventDefault();
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/doors`,{
        door_name: doorName,
        door_description: doorDescription,
        door_status: doorStatus,
        id_user: selectedUsers,
      })

      if (response.data.success) {
        setDoorName("");
        setDoorDescription("");
        setSelectedUsers([]);
        setDoorStatus("close");
        onAddSuccess();
        closeModal();
        // alert('Data berhasil disimpan!');
      }
    } catch(error){
      console.log(error);
    }
  }

  const getUsers = async()=>{
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/users`);
      if (response.data.success){
        setUsers(response.data.data);
      }
    } catch(error){
      console.log(error);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    getUsers();
  }, []);

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
                  <form onSubmit={saveDoor}>
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
                        value={doorName}
                        onChange={(e)=> setDoorName(e.target.value)}
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
                        value={doorDescription}
                        onChange={(e) => setDoorDescription(e.target.value)}
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
                      <ListUser users={users} selectedUsers={selectedUsers} onCheckboxChange={handleCheckboxChange}/>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border bg-pallete-4 px-4 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
