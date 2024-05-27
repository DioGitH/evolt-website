"use client"

import PasswordInput from "./passwordInput";
import { useState } from "react";
import axios from "axios";

export default function LoginForm(){

    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');

    const loginUser = async (e: any) => {
        e.preventDefault();
  
        //define formData
        const formData = new FormData();
  
        //append data to "formData"
        formData.append('username', username);
        formData.append('pin', pin);
        
        //send data to server
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData);

            localStorage.setItem('isLogin', response.data.isLogin);
            localStorage.setItem('idRole', response.data.idRole);

            window.location.href = '/dashboard'
        } catch (error) {
            if (error.response.status == 401) {
                alert('User Tidak Memiliki Akses')
            } else if (error.response.status == 404) {
                alert('User Tidak Dikenali')
            }
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
                        <ButtonLogin />
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

export function ButtonLogin(){
    return(
        <button type="submit" className="text-palette-3 bg-palette-1 w-fit py-1 rounded-lg text-sm px-2.5">
            <p>Login</p>
        </button>
    )
}