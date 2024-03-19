export default function LoginForm(){
    return(
        <div>
            <div className="container border-2 border-black sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12">
                <div className="flex justify-end">
                    <div className="font-robotoMono text-5xl text-black tracking-widest">WELCOME</div>
                </div>
                <div className="mt-5">
                    <TextBox fill="Username" />
                </div>
                <div className="mt-5 mb-4">
                    <TextBox fill="Password" />
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
        <input type="text" className="font-robotoMono text-[pallete] w-full h-[50px] bg-palette-1 rounded-xl p-3 focus:outline-none" placeholder={fill}/>
    )
}

export function ButtonLogin(){
    return(
        <div className="text-palette-3 bg-palette-1 w-fit p-1 rounded-lg text-sm">
            Login
        </div>
    )
}