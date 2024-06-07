"use client";
import AddUser from "@/components/adduser";
import DeleteUser from "@/components/deleteuser";
import DetailUser from "@/components/detailUser";
import EditUser from "@/components/edituser";
import Navbar from "@/components/navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Fungsi untuk mendapatkan data dari server
const getData = async (
  setUserData: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const req = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/users`
    );
    const data = req.data.data;
    setUserData(data);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

export default function Dashboard() {
  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    getData(setUserData);
    const loginStatus = localStorage.getItem("isLogin");

    const isLogin = loginStatus === "true";

    if (!isLogin) {
      window.location.href = "/";
    }
  }, []);

  const handleUserAdded = () => {
    getData(setUserData);
  };

  const handleUserDeleted = () => {
    getData(setUserData);
  };

  const handleUserEdited = () => {
    getData(setUserData);
  };

  return (
    <div>
      <div className="grid h-fit">
        <Navbar />
      </div>
      <div className="justify-center items-center gap-y-12">
        <LogTable
          data={userData}
          itemsPerPage={5}
          onUserAdded={handleUserAdded}
          onUserDeleted={handleUserDeleted}
          onUserEdited={handleUserEdited}
        />
      </div>
    </div>
  );
}

function LogTable({
  data,
  itemsPerPage,
  onUserAdded,
  onUserDeleted,
  onUserEdited,
}: {
  data: any[];
  itemsPerPage: number;
  onUserAdded: () => void;
  onUserDeleted: () => void;
  onUserEdited: () => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="text-center text-palette-1 mt-5 ml-5 mr-5 bg-palette-3 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.20)] rounded-md">
      <div className="h-fit w-full pt-2 pb-1 text-2xl font-medium">
        Data User
      </div>

      <div className="grid justify-between ml-5 mt-2">
        <form className="flex items-center max-w-md justify-between">
          {/* Search Form */}
        </form>
      </div>
      <div className="flex justify-end">
        <AddUser onAddSuccess={onUserAdded} />
      </div>
      <div className="mx-5 mt-2 mb-5 text-center bg-palette-3 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.25)] rounded-md overflow-hidden">
        <table className="table-fixed w-full h-auto ">
          <thead className="tes bg-palette-2 text-palette-3">
            <tr>
              <th className="py-3">ID</th>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>PIN</th>
              <th>ROLE</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map(
              (
                {
                  id_user,
                  username,
                  email,
                  pin,
                  detailId,
                  photo_profile,
                  role,
                },
                index
              ) => (
                <tr
                  key={id_user}
                  className={
                    index % 2 === 0
                      ? "bg-[#332D39] bg-opacity-20"
                      : "bg-[#FFFFFF]"
                  }
                >
                  <td>{id_user}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{pin}</td>
                  <td>{role?.role_name}</td>
                  <td>
                    <div className="flex justify-center gap-1">
                      <DetailUser
                        itemId={id_user}
                        email={email}
                        username={username}
                        pin={pin}
                        detailId={detailId}
                        photo_profile={photo_profile}
                        role_name={role?.role_name}
                      />
                      <EditUser idUser={id_user} onEditSuccess={onUserEdited} />
                      <DeleteUser
                        idUser={id_user}
                        onDeleteSuccess={onUserDeleted}
                      />
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="grid justify-center h-fit w-full pb-5">
        <div className="flex items-center gap-8">
          <button
            onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                ></path>
              </svg>
            </span>
          </button>
          <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
            <strong className="text-gray-900">{totalPages}</strong>
          </p>
          <button
            onClick={() =>
              goToPage(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
            disabled={currentPage === totalPages}
            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
