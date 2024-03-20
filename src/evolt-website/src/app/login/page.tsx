import LoginForm from "@/components/loginform"

export default function LoginPage(){
    return(
        <div>
            <div className="container mx-auto bg-[#EFEEEC]">
                <div className="grid bg-cover bg-no-repeat bg-login-page-bg h-screen w-full">
                    <div className="grid justify-end items-start h-full">
                        <LoginForm></LoginForm>
                    </div>
                </div>            
            </div>
        </div>
    )
}