"use client";
import DetailModal from "@/components/detailModal";
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';

export default function Dashboard() {
  const [totalDoors, setTotalDoors] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalLogs, setTotallogs] = useState(0);
  const [user, setUser] = useState("");

  const fetchAll = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/doors`);
      const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/users`);
      const response3 = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/log`);

      const result = await response.json();
      const result2 = await response2.json();
      const result3 = await response3.json();
      setTotalDoors(result.data.total);
      setTotalUsers(result2.data.length);
      setTotallogs(result3.data.total);
      // setLogs(result3.data.data);
      // setTotalPages(result3.data.last_page);
      // setCurrentPage(result3.data.current_page);
    } catch (error) {
      console.error("Failed ", error);
    }
  }

  const fetchUser = async (idUser:any) =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/users/${idUser}`);
    const result = await response.json();
    setUser(result.data.username);
  }

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin');
    const idLogin = localStorage.getItem('idUser');
    fetchUser(idLogin);

    const isLogin = loginStatus == 'true';

    if (!isLogin) {
        window.location.href = '/';
    }
  }, []);

  useEffect(()=>{
    fetchAll();
  },[]);

  return (
    <div>
      {/* Dashboard */}
      <div className="absolute h-[50vh] w-full bg-palette-1"></div>
      <div className="grid h-fit w-full">
        <div className="z-10 text-5xl text-palette-3 mt-10 ml-5 h-fit w-fit">
          Dashboard
          <hr className="border-t-2 border-pallete-4 my-1" />
          <div className="text-3xl text-palette-3 h-fit w-fit">Hi, {user}</div>
        </div>

        <div className="grid h-fit">
          {/* Ringkasan */}
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-5 h-fit w-full ml-5 mr-5 mt-5">
              <CardInformation
                nameVar="Doors"
                jumlah={totalDoors}
                svg='<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="logo text-palette-3 group-hover:text-palette-1" viewBox="0 0 16 16">
                                                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                                            </svg>'
              />
              <CardInformation
                nameVar="Users"
                jumlah={totalUsers}
                svg='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                                </svg>
                                            '
              />
              <CardInformation
                nameVar="Logs"
                jumlah={totalLogs}
                svg='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                            '
              />
            </div>
          </div>
        </div>
        <LogTable />
      </div>
    </div>
  );
}

function LogTable() {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [logs, setLogs] = useState([]);
  const [username, setUsername] = useState("");

  const goToPage = (page: any) => {
    fetchLog(username, page);
  };

  const fetchLog = async (username: any, page: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/log?username=${username}&page=${page}`);
      const result = await response.json();
      setLogs(result.data.data);
      setTotalPages(result.data.last_page);
      setCurrentPage(result.data.current_page);
    } catch (error) {
      console.error("Failed ", error);
    }
  }

  useEffect(() => {
    fetchLog(username, currentPage);
  }, []);

  useEffect(()=>{
    fetchLog(username, currentPage);
  }, [username]);

  return (
    <div className="text-center text-palette-1 mt-5  ml-5 mr-5 bg-palette-3 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.20)] rounded-md">
      <div className="h-fit w-full pt-2 pb-1 text-2xl font-medium">
        Log Aktivitas
      </div>

      <div className="grid justify-start ml-5 mt-2">
        <form className="flex items-center max-w-md mx-auto" onSubmit={(e) => {e.preventDefault()}}>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative lg:w-72 sm:w-32">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-pallete-4 rounded-lg border "

          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button> */}
        </form>
      </div>

      <div className="mx-5 mt-2 mb-5 text-center bg-palette-3 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.25)] rounded-md overflow-hidden">
        <table className="table-fixed w-full h-auto ">
          <thead className="tes bg-palette-2 text-palette-3">
            <tr>
              <th className="py-3">ID</th>
              <th>STATUS</th>
              <th>TIME</th>
              <th>USERNAME</th>
              <th>PINTU</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody className="">
            {logs.map(
              (
                { id_log, log_status, door_name, username, image_name, created_at, updated_at }: any,
                index: any
              ) => {
                const formattedDate = format(new Date(created_at), 'dd-MM-yyyy HH:mm');
                return(
                  <tr
                    key={id_log}
                    className={
                      index % 2 === 0
                        ? "bg-[#332D39] bg-opacity-20"
                        : "bg-[#FFFFFF]"
                    }
                  >
                    <td>{id_log}</td>
                    <td>{log_status}</td>
                    <td>{formattedDate}</td>
                    <td>{username}</td>
                    <td>{door_name}</td>
                    <td>
                      <DetailModal
                        itemId={id_log}
                        time={formattedDate}
                        username={username}
                        pintu={door_name}
                        detailId={id_log}
                        imageName={image_name}
                      />
                    </td>
                  </tr>
                )
              }
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

function CardInformation({ nameVar, jumlah, svg }: any) {
  return (
    <div className="group">
      <div className="flex h-fit bg-palette-3 drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25)] rounded-md  text-palette-1 transition ease-out  hover:-translate-y-0.5 hover:scale-105 group-hover:bg-pallete-4 hover:text-palette-3 duration-500">
        <div className="absolute right-3 top-2 bottom-2 grid place-content-center">
          <div className="logo bg-pallete-4 p-3 rounded-md group-hover:bg-palette-3 transition ease-out duration-500 group-hover:text-palette-1 text-palette-3">
            {svg && <div dangerouslySetInnerHTML={{ __html: svg }}></div>}
          </div>
        </div>
        <div className="grid">
          <div className="text text-2xl font-semibold ml-[20px] mt-2">
            {jumlah}
          </div>

          <div className="text text-md flex justify-start ml-[20px] font-medium -mt-1 mb-2">
            {nameVar}
          </div>
        </div>
      </div>
    </div>
  );
}
