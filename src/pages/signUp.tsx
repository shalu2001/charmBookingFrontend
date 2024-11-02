import {Button,Input} from "@nextui-org/react";


export default function SignUp() {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 h-full p-5 flex items-center justify-center">
                <div className="w-5/6 text-center mx-50 my-10 bg-white shadow-xl rounded-3xl py-8 px-5">
                    <div className="text-center text-primary font-extrabold text-5xl mb-10">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="flex flex-col gap-4 space-y-3 mr-6 ml-6">
                        <div className="flex justify-between gap-4">
                            <Input type="text" label="First Name" />
                            <Input type="text" label="Last Name" />
                        </div>
                        <Input type= "date" label="Date of Birth" />
                        <Input type="username" label="User Name" />
                        <Input type="email" label="Email" />
                        <div className="flex justify-between gap-4">
                            <Input type="password" label="Password" />
                            <Input type="password" label="Confirm Password" /> 
                        </div>
                        <p><a href="/login" className="text-blue-400">Already have an Account?</a></p>
                    </div>
                    <Button color="secondary" radius="lg" variant="shadow" className="mt-5 text-center">
                        Sign Up
                    </Button>
                </div>
            </div>
            <div className="w-1/2 h-full">
                <img className="object-cover w-full h-full" src="signup-drawing.avif"></img>
            </div>
        </div>
    );
}
