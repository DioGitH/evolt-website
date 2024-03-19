import LoginForm from "@/components/loginform"

export default function LoginPage(){
    return(
        <div>
            <div className="container mx-auto bg-[#EFEEEC]">
                <div className="grid bg-login-page-bg h-[100vh] w-full">
                    <div className="grid justify-end items-start h-full">
                        <LoginForm></LoginForm>
                    </div>
                </div>            
            </div>
        </div>
    )
}