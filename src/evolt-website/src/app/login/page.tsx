import LoginForm from "@/components/loginform"

export default function LoginPage(){
    return(
        <div>
            <div className="container mx-auto bg-[#EFEEEC]">
                <div className="grid content-center bg-login-page-bg h-[100vh] w-auto">
                    <LoginForm></LoginForm>
                </div>            
            </div>
        </div>
    )
}