"use client";
import AddUser from "@/components/adduser";
import DeleteUser from "@/components/deleteuser";
import DetailUser from "@/components/detailUser";
import EditUser from "@/components/edituser";
import Navbar from "@/components/navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

async function getServerSideProps() {

  //http request
  const req  = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/users`)
  const users  = await req.data.data

  return users
}

const timestamp = Date.now();
const formatDt = Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
}).format(timestamp);

const dummy = [
  {
    id: 1,
    username: "Maulidio",
    email: "maulidio@example.com",
    pin: "1234",
    detailId: 1,
    additionalDetailId: 101,
  },
  {
    id: 2,
    username: "Raden",
    email: "Raden@example.com",
    pin: "5678",
    detailId: 2,
    additionalDetailId: 102,
  },
  {
    id: 3,
    username: "Maulidio",
    email: "maulidio@example.com",
    pin: "1234",
    detailId: 1,
    additionalDetailId: 103,
  },
  {
    id: 4,
    username: "Raden",
    email: "Raden@example.com",
    pin: "5678",
    detailId: 2,
    additionalDetailId: 104,
  },
];

export default async function Dashboard() {

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin');

    const isLogin = loginStatus == 'true';

    if (!isLogin) {
        window.location.href = '/';
    }
  }, []);

  const userData = await getServerSideProps();

  return (
    <div>
      <div className="grid h-fit">
        {/* Navbar */}
        <Navbar />
      </div>
      <div className="justify-center items-center gap-y-12">
        <LogTable data={userData} itemsPerPage={5} />
      </div>
    </div>
  );
}

function LogTable({ data, itemsPerPage }: any) {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const goToPage = (page: any) => {
    setCurrentPage(page);
  };

  const handleAdditionalDetail = (additionalDetailId: number) => {
    // Lakukan sesuatu dengan additionalDetailId
    console.log("Additional Detail Id:", additionalDetailId);
  };

  return (
    <div className="text-center text-palette-1 mt-5  ml-5 mr-5 bg-palette-3 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.20)] rounded-md">
      <div className="h-fit w-full pt-2 pb-1 text-2xl font-medium">
        Data User
      </div>

      <div className="grid justify-between ml-5 mt-2">
        <form className="flex items-center max-w-md justify-between flex">
          {" "}
          {/* Tambahkan kelas 'flex' */}
          {/* <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative lg:w-72 sm:w-32">
                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by username..." required />
                    </div>
                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-pallete-4 rounded-lg border">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button> */}
        </form>
      </div>
      <div className="flex justify-end">
        <AddUser />
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
          <tbody className="">
            {getCurrentPageData().map(
              (
                { id_user, username, email, pin, detailId, photo_profile, role }: any,
                index: any
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
                  <td>{role.role_name}</td>
                  <td>
                    <div className="flex justify-center gap-4">
                      <DetailUser
                        itemId={id_user}
                        email={email}
                        username={username}
                        pin={pin}
                        detailId={detailId}
                        photo_profile={photo_profile}
                        role_name={role.role_name}
                      />
                      <EditUser idUser={id_user}/>
                      <DeleteUser idUser={id_user}/>
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
            Page <strong className="text-gray-900">{currentPage}</strong> of
            <strong className="text-gray-900"> {totalPages}</strong>
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
