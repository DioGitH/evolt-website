"use client"

import PasswordInput from "./passwordInput";
import { useState } from "react";
import axios from "axios";
import ShowError from "./loginErrorModal";

export default function LoginForm(){

    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [showLoginError, setShowLoginError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loginUser = async (e: any) => {
        e.preventDefault();
  
        //define formData
        const formData = new FormData();
  
        //append data to "formData"
        formData.append('username', username);
        formData.append('pin', pin);
        
        //send data to server
        try {
            setIsLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData);

            if (response.status == 401) {
                // alert('User Tidak Memiliki Akses')
                setShowLoginError(true);
            } else if (response.status == 404) {
                // alert('User Tidak Dikenali')\
                setShowLoginError(true);
            }

            localStorage.setItem('isLogin', response.data.isLogin);
            localStorage.setItem('idRole', response.data.idRole);
            localStorage.setItem('idUser', response.data.idUser);
            setIsLoading(false);

            window.location.href = '/dashboard'
        } catch (error) {
            // alert(error)
            setIsLoading(false);
            setShowLoginError(true);
        }
    };

    return(
        <div>
            <div className="container min-w-[320px] sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 mt-[3em] mr-[23em] font-robotoMono">
                <div className="flex justify-end">
                    <div className="text-5xl text-black tracking-widest">WELCOME</div>
                </div>
                <form onSubmit={loginUser}>
                    <div className="mt-5 text-white">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="text-[pallete] w-full h-[50px] bg-palette-1 rounded-xl p-3 focus:outline-none"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-5 mb-4 text-white">
                        <input
                            type="password"
                            id="pin"
                            name="pin"
                            className="text-[pallete] w-full h-[50px] bg-palette-1 rounded-xl p-3 focus:outline-none"
                            value={pin}
                            placeholder="PIN"
                            onChange={(e) => setPin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="text-palette-3 bg-palette-1 w-fit py-1 rounded-lg text-sm px-2.5">
                            {isLoading ? (
                                <>
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Loading
                                </>
                            ) : (
                                <>
                                    Login
                                </>
                            )}
                            {showLoginError && <ShowError onClose={() => setShowLoginError(false)} text="Username atau Password salah, silahkan coba lagi!!" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export function TextBox({fill}:any){
    return(
        <input type="text" className="text-[pallete] w-full h-[50px] bg-palette-1 rounded-xl p-3 focus:outline-none" placeholder={fill}/>
    )
}