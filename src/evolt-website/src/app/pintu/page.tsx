"use client";
import DetailModal from "@/components/detailModal";
import DeletePintu from "@/components/deleteuser";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import {
  ButtonDelete,
  ButtonEdit,
  ButtonTambahPintu,
} from "@/components/buttonHalamanPintu";
import DetailPintu from "@/components/detailPintu";
import axios from "axios";

export default function Dashboard() {

  return (
    <div>
      <div className="grid h-fit">
        {/* Navbar */}
        <Navbar />
      </div>
      <div className="justify-center items-center gap-y-12">
        <LogTable itemsPerPage={5} />
      </div>
    </div>
  );
}

function LogTable({ itemsPerPage }: any) {
  const [doors, setDoors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDoors = async (page:any) =>{
    try{
      const response = await fetch(`http://localhost:8000/api/doors?page=${page}`);
      const result = await response.json();
      setDoors(result.data.data);
      setTotalPages(result.data.last_page);
      setCurrentPage(result.data.current_page);
    } catch (error){
      console.error("Failed ", error);
    }

  }

  const goToPage = (page: any) => {
    fetchDoors(page);
  };

  useEffect(() => {
    fetchDoors(currentPage);
  }, []);

  return (
    <div className="text-center text-palette-1 mt-5  ml-5 mr-5 bg-palette-3 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.20)] rounded-md">
      <div className="h-fit w-full pt-2 pb-1 text-2xl font-medium">
        Data Pintu
      </div>

      <div className="flex justify-end mr-5 mt-0">
        <ButtonTambahPintu />
      </div>

      <div className="mx-5 mt-2 mb-5 text-center bg-palette-3 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.25)] rounded-md overflow-hidden">
        <table className="table-fixed w-full h-auto ">
          <thead className="tes bg-palette-2 text-palette-3">
            <tr>
              <th className="py-3">ID Pintu</th>
              <th>Nama Pintu</th>
              <th>Deskripsi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody className="">
            {doors.map(
              (door:any, index) => (
                <tr
                  key={door.id}
                  className={
                    index % 2 === 0
                      ? "bg-[#332D39] bg-opacity-20"
                      : "bg-[#FFFFFF]"
                  }
                >
                  <td>{door.id_door}</td>
                  <td>{door.door_name}</td>
                  <td>{door.door_description}</td>
                  <td>{door.door_status}</td>
                  <td>
                    <div className="flex justify-center gap-4">
                      {/* <DetailPintu
                        pintu={door.door_name}
                        user={listUser}
                        detailId={detailId}
                      /> */}
                      <ButtonEdit />
                      <ButtonDelete />
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
