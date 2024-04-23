import Link from "next/link";

export default function LoginForm(){
    return(
        <div>
            <div className="container min-w-[320px] sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 mt-[3em] mr-[23em] font-robotoMono">
                <div className="flex justify-end">
                    <div className="text-5xl text-black tracking-widest">WELCOME</div>
                </div>
                <div className="mt-5">
                    <TextBox fill="Username" />
                </div>
                <div className="mt-5 mb-4">
                    <TextBox fill="Password" />
                </div>
                <div className="grid justify-content-center w-fit h-fit">
                    <div className="place-self-center content-center -ml-1 justify-self-center font-robotoMono text-palette-1 text-[11px] absolute bg-palette-3">
                        OR
                    </div>
                    <div className="bg-pallete-3 ml-1 absolute">
                        <input type="checkbox" name="" id="" />
                    </div>
                    <div className="flex text-palette-1">
                        <div className="mr-0.5">
                            <Options fill="&nbsp;&nbsp;Remember me" />
                        </div>
                        <div className="ml-0.5">
                            <Options fill="Create Account" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <ButtonLogin />
                </div>
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
        <button className="text-palette-3 bg-palette-1 w-fit py-1 rounded-lg text-sm px-2.5">
            <Link href='/dashboard'>Login</Link>
        </button>
    )
}

export function Options({fill}:any){
    return(
        <div className="border-[1.5px] border-palette-1 w-fit h-fit pl-2 pr-2 pt-1 pb-1 text-[8px]">
            {fill}
        </div>
    )
}