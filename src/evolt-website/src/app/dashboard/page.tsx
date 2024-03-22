import Navbar from "@/components/navbar";

const dummy = [
    {itemId: 1, time: "10.10", username: "Maulidio", image: "path/to/img", detailId: 1},
    { itemId: 1, time: "10.10", username: "Maulidio", image: "path/to/img", detailId: 1 },
    { itemId: 1, time: "10.10", username: "Maulidio", image: "path/to/img", detailId: 1 },
    { itemId: 1, time: "10.10", username: "Maulidio", image: "path/to/img", detailId: 1 },
]

export default function Dashboard(){
    return(
        <div>
            <div className="relative">
                <div className="container sticky top-0 w-full z-20">
                    <Navbar/>
                </div>
                <div className="container mx-auto bg-palette-3">
                    {/* Dashboard */}
                    <div className="absolute h-[100vh] w-full bg-gradient-to-b from-palette-1">

                    </div>
                    <div className="grid h-[90vh] w-full">
                        <div className="z-10 text-5xl text-palette-3 mt-10 ml-10 h-fit w-fit">
                            Dashboard
                            <hr className="border-t-2 border-pallete-4 my-1" />

                            <div className="text-3xl text-palette-3 h-fit w-fit">
                                Hi, User
                            </div>
                        </div>
                        {/* Ringkasan */}
                        <div className="flex justify-center">
                            <div className="grid grid-cols-2 gap-16 text-center h-fit w-6/12">
                                <div className="grid h-28 place-content-center bg-palette-3 drop-shadow-[12px_12px_10px_rgba(0,0,0,0.25)] rounded-2xl  border-b-[6px] border-pallete-4 text-palette-1">
                                    2
                                </div>
                                <div className="grid h-28 place-content-center bg-palette-3 drop-shadow-[12px_12px_10px_rgba(0,0,0,0.25)] rounded-2xl  border-b-[6px] border-pallete-4 text-palette-1">
                                    2
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Table Log Aktivitas*/}
                    <div className="relative min-h-screen text-palette-1">
                        <LogTable log={dummy}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function LogTable({log}:any){
    return(
        <div className="absolute inset-x-20 top-20 text-center bg-palette-3 drop-shadow-[15px_15px_12px_rgba(0,0,0,0.25)] rounded-md overflow-hidden">
            <table className="table-fixed w-full h-auto ">
                <thead className="tes bg-palette-2">
                    <tr>
                        <th>Id</th>
                        <th>Waktu</th>
                        <th>Username</th>
                        <th>Gambar</th>
                        <th>Detail</th>
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
                                <button
                                    className="text-xs bg-blue-400 rounded p-1 m-2 text-black">
                                    Detail {detailId}
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
    )
}