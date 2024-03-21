import LoginForm from "@/components/loginform"

export default function LoginPage(){
    return(
        <div>
            <div className="container mx-auto bg-palette-1">
                <div className="grid relative h-screen w-full">
                    {/* Background */}
                    <div className="grid w-full h-screen">
                        <div className=" bg-palette-1 h-[60vh] w-full">
                        </div>
                        <div className=" bg-pallete-4 h-[40vh] w-full rounded-tr-[160px] ">
                            
                        </div>
                    </div>
                    {/* Bodycard */}
                    <div className="absolute bg-palette-3 inset-x-16 inset-y-16 rounded-[50px] drop-shadow-[2px_6px_6px_rgba(0,0,0,0.3)] overflow-hidden">
                        <div className="absolute bg-palette-2 opacity-40 h-[250px] w-[250px] bottom-0 right-0 rounded-tl-full">
                            
                        </div>
                        <div className="absolute bg-palette-2 opacity-70 h-[210px] w-[210px] bottom-0 right-0 rounded-tl-full">

                        </div>
                        <div className="absolute bg-palette-2 h-[170px] w-[170px] bottom-0 right-0 rounded-tl-full">

                        </div>
                        <div className="absolute xl:left-96 lg:left-72 md:left-40 sm:left-28 xl:top-10 lg:top-10 md:top-10 sm:top-20">
                            <div className="grid justify-end items-start h-full">
                                <LoginForm></LoginForm>
                            </div>
                        </div>
                    </div>
                    {/* Logo */}
                    <div className="absolute bg-pallete-4 w-48 h-48 rounded-full top-6 left-6 border-[20px] border-palette-1 drop-shadow-[2px_6px_6px_rgba(0,0,0,0.3)]">
                        <img src="/assets/img/LogoEvolt.svg" alt="" />
                    </div>
                </div>            
            </div>
        </div>
    )
}