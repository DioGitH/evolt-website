import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function ListUser({users, selectedUsers, onCheckboxChange}: any) {
  const [localSelectedUsers, setLocalSelectedUsers] = useState(selectedUsers);

  useEffect(() => {
    setLocalSelectedUsers(selectedUsers);
  }, [selectedUsers]);

  const handleCheckboxChange = (event:any, userId:any) => {
    const { checked } = event.target;
    const updatedSelectedUsers = checked
      ? [...localSelectedUsers, userId]
      : localSelectedUsers.filter(id => id !== userId);

    setLocalSelectedUsers(updatedSelectedUsers);
    onCheckboxChange(updatedSelectedUsers);
  };

  if (!Array.isArray(users)) {
    return null;
  }

  return (
    <Menu as="div" className="relative w-full inline-block text-left">
      <div>
        <Menu.Button className="bg-palette-2 inline-flex  w-full justify-between gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 ">
          User
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <ul className="">
              {users.map((user:any, index:any)=>(
                <li key={index} className="w-full ">
                  <div className="flex items-center ps-3">
                    <input
                      id={`${user.id_user}-checkbox`}
                      type="checkbox"
                      checked={localSelectedUsers.includes(user.id_user)}
                      value=""
                      className="w-4 h-4  bg-gray-100 border-gray-300 rounded"
                      onChange={(e) => handleCheckboxChange(e, user.id_user)}
                    />
                    <label
                      htmlFor={`${user.id_user}-checkbox`}
                      className="w-full py-3 ms-2 text-sm font-medium text-black"
                    >
                      {user.username}
                    </label>
                  </div>
                </li>
              ))}
              
            </ul>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
