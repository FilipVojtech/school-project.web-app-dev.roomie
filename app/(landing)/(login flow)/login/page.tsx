import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
    return <div>
        <h1 className="text-3xl text-center mb-5">Login</h1>
        <div className="bg-foreground p-1.5 md:p-2 md:w-96 rounded-md m-auto">
            <LoginForm/>
        </div>
    </div>;
};


