import RegisterForm from "@/components/login/RegisterForm";

export default function RegisterPage() {
    return <div>
        <h1 className="text-3xl text-center mb-5">Register</h1>
        <div className="bg-foreground p-1.5 md:p-2 md:w-96 rounded-md m-auto">
            <RegisterForm/>
        </div>
    </div>
}
