import { Link, NavLink } from "react-router";
import Input from "../UI/Input";

function Login({ handleSubmit }: any) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                Login
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                        <Input name="email" type="email" placeholder="example@exa.com" label="Your email" />
                        <Input name="password" type="password" placeholder="password" label="Your password" />
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            Login
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Dont have an account yet?
                            <NavLink to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Sign up
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;