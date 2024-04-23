"use client";
import DetailModal from "@/components/detailModal";
import Navbar from "@/components/navbar";
import React, { useState } from "react";
import {
  ButtonDelete,
  ButtonEdit,
  ButtonTambahPintu,
} from "@/components/button";

const dummy = [
  {
    itemId: 1,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 1,
  },
  {
    itemId: 2,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 2,
  },
  {
    itemId: 3,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 3,
  },
  {
    itemId: 4,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 4,
  },
  {
    itemId: 5,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 1,
  },
  {
    itemId: 6,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 2,
  },
  {
    itemId: 7,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 3,
  },
  {
    itemId: 8,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 4,
  },
  {
    itemId: 9,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 1,
  },
  {
    itemId: 10,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 2,
  },
  {
    itemId: 11,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 3,
  },
  {
    itemId: 12,
    namaPintu: "PintuKu",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate interdum finibus.",
    detailId: 4,
  },
];

export default function Dashboard() {
  return (
    <div>
      <div className="grid h-fit">
        {/* Navbar */}
        <Navbar />
      </div>
      <div className="justify-center items-center gap-y-12">
        <LogTable data={dummy} itemsPerPage={5} />
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
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody className="">
            {getCurrentPageData().map(
              ({ itemId, namaPintu, deskripsi, detailId }: any, index: any) => (
                <tr
                  key={itemId}
                  className={
                    index % 2 === 0
                      ? "bg-[#332D39] bg-opacity-20"
                      : "bg-[#FFFFFF]"
                  }
                >
                  <td>{itemId}</td>
                  <td>{namaPintu}</td>
                  <td>{deskripsi}</td>
                  <td>
                    <div className="flex justify-center gap-4">
                      <ButtonDelete />
                      <ButtonEdit />
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
function tambahPintu({nameVar, jumlah, svg}: any){
  return(
     <div className="Tambah Pintu">
          <div className="flex h-fit bg-palette-3 drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25)] rounded-md  text-palette-1 transition ease-out  hover:-translate-y-0.5 hover:scale-105 group-hover:bg-pallete-4 hover:text-palette-3 duration-500">
              <div className="absolute right-3 top-2 bottom-2 grid place-content-center">
                  <div className="logo bg-pallete-4 p-3 rounded-md group-hover:bg-palette-3 transition ease-out duration-500 group-hover:text-palette-1 text-palette-3">
                      {svg && <div dangerouslySetInnerHTML={{ __html:svg }}></div>}
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
  )

  function UpdatePintu({nameVar, jumlah, svg}: any){
  return(
     <div className="Update Pintu">
          <div className="flex h-fit bg-palette-3 drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25)] rounded-md  text-palette-1 transition ease-out  hover:-translate-y-0.5 hover:scale-105 group-hover:bg-pallete-4 hover:text-palette-3 duration-500">
              <div className="absolute right-3 top-2 bottom-2 grid place-content-center">
                  <div className="logo bg-pallete-4 p-3 rounded-md group-hover:bg-palette-3 transition ease-out duration-500 group-hover:text-palette-1 text-palette-3">
                      {svg && <div dangerouslySetInnerHTML={{ __html:svg }}></div>}
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
)
function DeletePintu({nameVar, jumlah, svg}: any){
  return(
     <div className="Delete Pintu">
          <div className="flex h-fit bg-palette-3 drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25)] rounded-md  text-palette-1 transition ease-out  hover:-translate-y-0.5 hover:scale-105 group-hover:bg-pallete-4 hover:text-palette-3 duration-500">
              <div className="absolute right-3 top-2 bottom-2 grid place-content-center">
                  <div className="logo bg-pallete-4 p-3 rounded-md group-hover:bg-palette-3 transition ease-out duration-500 group-hover:text-palette-1 text-palette-3">
                      {svg && <div dangerouslySetInnerHTML={{ __html:svg }}></div>}
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
  )
 }
}
}


