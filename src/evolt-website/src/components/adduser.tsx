import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import PasswordInput from "./passwordInput";
import axios from "axios";
import ShowError from "./loginErrorModal";
// import Router from 'next/router';

export default function AddUserModal({onAddSuccess}:any) {
  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    const roleStatus = localStorage.getItem('idRole');

    setRoleId(roleStatus ?? '');
  }, []);
  
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [idRole, setIdRole] = useState<number>(3);
  const [photoProfile, setPhotoProfile] = useState('');
  const [isPinValid, setIsPinValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  //state validation
  const [validation, setValidation] = useState({});

  //function "handleFileChange"
  const handleFileChange = (e: any) => {

      //define variable for get value image data
      const imageData = e.target.files[0]

      //check validation file
      if (!imageData.type.match('image.*')) {

          //set state "image" to null
          setPhotoProfile('');

          return
      }

      //assign file to state "image"
      setPhotoProfile(imageData);
  }

  //method "storeUser"
  const storeUser = async (e: any) => {
      e.preventDefault();

      setIsLoading(true);

      //define formData
      const formData = new FormData();

      //append data to "formData"
      formData.append('username', username);
      formData.append('email', email);
      formData.append('pin', pin);
      formData.append('id_role', idRole.toString());
      formData.append('photo_profile', photoProfile);
      
      //send data to server
      await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/users`, formData)
      .then(() => {

          //redirect
          // Router.push('/user')
          // closeModal()
          // window.location.reload()
          setUsername('');
          setEmail('');
          setIdRole(3);
          setPin('');
          setPhotoProfile('');
          onAddSuccess();
          setIsLoading(false);
          closeModal();

      })
      .catch((error) => {
        // alert(error.response.data.message)

          //assign validation on state
          setValidation(error.response.data.message);
          setShowError(true);
          setIsLoading(false);
      })
      
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center p-2.5 ms-2 m-5 text-sm font-medium text-white bg-pallete-4 rounded-lg px-2 py-1"
        style={{ boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4)" }}
      >
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
                  <Dialog.Title className="text-lg font-medium leading-6 text-black w-full text-center">
                    Tambah User
                  </Dialog.Title>

                  <form onSubmit={storeUser}>
                    <div className="grid justify-center h-fit p-2 rounded-md text-palette-3">
                      <div className="image w-full rounded-lg overflow-hidden mb-2 flex justify-center">
                        <img
                          src="/assets/img/userIcon.svg"
                          alt=""
                          className="max-w-16 h-fit"
                        />
                      </div>
                      <div>
                        <div className="max-w-screen mx-auto mb-2">
                          <label
                            htmlFor="username"
                            className="block mb-1 text-sm font-medium text-gray-700 text-left"
                          >
                            USERNAME
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan Username"
                            required
                          />
                        </div>
                        {/* {validation.username && (
                          <div className="alert alert-danger">
                            {validation.username}
                          </div>
                        )} */}

                        <div className="max-w-screen mx-auto mb-2">
                          <label
                            htmlFor="email"
                            className="block mb-1 text-sm font-medium text-gray-700 text-left"
                          >
                            EMAIL
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Email"
                            required
                          />
                        </div>
                        {/* {validation.email && (
                          <div className="alert alert-danger">
                            {validation.email}
                          </div>
                        )} */}

                        <div className="max-w-screen mx-auto mb-2">
                          <PasswordInput pin={pin} setPin={setPin} isPinValid={false} setIsPinValid={setIsPinValid}/>
                        </div>

                        <div className="max-w-screen mx-auto mb-2">
                          <label
                            htmlFor="role"
                            className="block mb-1 text-sm font-medium text-gray-700 text-left"
                          >
                            ROLE
                          </label>
                          <select
                            id="role"
                            name="role"
                            className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                            value={idRole}
                            onChange={(e) => setIdRole(Number(e.target.value))}
                            required
                          >
                            <option value={3}>Reguler User</option>
                            {Number(roleId) === 1 && <option value={1}>Provider</option>}
                            <option value={2}>Admin</option>
                          </select>
                        </div>
                        {/* {validation.pin && (
                          <div className="alert alert-danger">
                            {validation.pin}
                          </div>
                        )} */}

                        <div className="max-w-screen mx-auto mb-4">
                          <label
                            htmlFor="photo"
                            className="block mb-1 text-sm font-medium text-white-700 text-left"
                          >
                            UPLOAD PHOTO
                          </label>
                          <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept=".jpg, .jpeg, .png, .svg"
                            className="w-full bg-palette-2 text-white-800 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-palette-4 shadow-inner"
                            onChange={handleFileChange}
                            required
                          />
                        </div>
                        {/* {validation.photo_profile && (
                          <div className="alert alert-danger">
                            {validation.photo_profile}
                          </div>
                        )} */}
                      </div>
                    </div>
                    
                    {isPinValid == true && (
                      <div className="flex justify-center">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-pallete-4 px-4 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        style={{ boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)" }}
                      >
                          {isLoading ? (
                            <>
                              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                              </svg>
                              Loading ...
                            </>
                          ) : (
                            <>
                              Simpan
                            </>
                          )}
                          {showError && <ShowError onClose={() => setShowError(false)} text={validation} />}
                      </button>
                    </div>
                    )} 
                    {isPinValid == false && (
                      <div className="flex justify-center">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-pallete-4 px-4 py-2 text-sm font-medium text-palette-3 bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        style={{ boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)", cursor: "wait" }}
                      >
                        Simpan
                      </button>
                    </div>
                    )}
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
