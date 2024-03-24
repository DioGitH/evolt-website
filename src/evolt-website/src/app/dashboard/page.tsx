"use client";
import DetailModal from "@/components/detailModal";
import Navbar from "@/components/navbar";

const dummy = [
    {itemId: 1, time: "10.10", username: "Maulidio", image: "path/to/img", detailId: 1},
    { itemId: 2, time: "10.10", username: "Maulidio", image: "path/to/img", detailId: 2 },
    { itemId: 3, time: "10.10", username: "Maulidio", image: "path/to/img", detailId: 3 },
    { itemId: 4, time: "10.10", username: "Maulidio", image: "path/to/img", detailId: 4 },
]

export default function Dashboard(){
    return(
        <div>
            <div className="relative font-montserrat min-h-[150vh] bg-slate-200">
                <div className="container sticky top-0 w-full z-20">
                    <Navbar/>
                </div>
                <div className="container mx-auto ">
                    {/* Dashboard */}
                    <div className="absolute h-[50vh] w-full bg-palette-1">

                    </div>
                    <div className="grid h-fit w-full">
                        <div className="z-10 text-5xl text-palette-3 mt-10 ml-5 h-fit w-fit">
                            Dashboard
                            <hr className="border-t-2 border-pallete-4 my-1" />

                            <div className="text-3xl text-palette-3 h-fit w-fit">
                                Hi, User
                            </div>
                        </div>

                        <div className="grid h-fit">

                            {/* Ringkasan */}
                            <div className="flex justify-center">
                                <div className="grid grid-cols-3 gap-5 h-fit w-full ml-5 mr-5 mt-5">
                                    <CardInformation nameVar="Doors" jumlah={dummy.length}
                                        svg='<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="logo text-palette-3 group-hover:text-palette-1" viewBox="0 0 16 16">
                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                        </svg>' />
                                    <CardInformation nameVar="Users" jumlah={dummy.length} svg='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>
' />
                                    <CardInformation nameVar="Logs" jumlah={dummy.length} svg='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
' />

                                </div>
                            </div>
                        </div>
                        <div className="text-center text-palette-1 mt-5  ml-5 mr-5 bg-palette-3 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.20)] rounded-md">
                            <div className="h-fit w-full pt-1 pb-1 text-2xl font-medium">
                                Log Aktivitas
                            </div>
                            <div className="h-fit text-palette-1">
                                <LogTable log={dummy} />
                            </div>

                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export function LogTable({log}:any){
    return(
        <div className="mx-5 mt-2 mb-5 text-center bg-palette-3 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.25)] rounded-md overflow-hidden">
            <table className="table-fixed w-full h-auto ">
                <thead className="tes bg-palette-2 text-palette-1">
                    <tr>
                        <th className="py-3">ID</th>
                        <th>TIME</th>
                        <th>USERNAME</th>
                        <th>IMAGE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody className="">
                    {log.map(({ itemId, time, username, image, detailId }: any, index: any) =>
                        <tr key={itemId} className={index % 2 === 0 ? 'bg-[#332D39] bg-opacity-20' : 'bg-[#FFFFFF]'}>
                            <td>{itemId}</td>
                            <td>{time}</td>
                            <td>{username}</td>
                            <td>{image}</td>
                            <td>
                                <DetailModal itemId={itemId} time={time} username={username} image={image} detailId={detailId}/>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
    )
}

export function CardInformation({nameVar, jumlah, svg}: any){
    return(
       <div className="group">
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

