import Input from "../UI/Input";

function Register({handleSubmit}:any) {
    return (
        <div  className="flex h-screen items-center">
            <form  onSubmit={handleSubmit} className="flex  flex-col gap-1 min-w-80 mx-auto p-10  shadow-2xl rounded-lg">
                <h3 className="text-center font-bold ">Create new Account </h3>
                <Input name="name" type="text" placeholder="your name" label="name" />
                <Input name="email" type="email" placeholder="your email" label="email" />
                <Input name="password" type="password" placeholder="your password" label="password" />
                <Input name="password_confirmation" type="password" placeholder="repeat password" label="repeat  password" />
                <div className="flex gap-2 justify-center mt-4">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    <button  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                </div>
            </form>

        </div>
    );
}

export default Register;