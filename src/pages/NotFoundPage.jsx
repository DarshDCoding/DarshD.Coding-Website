import {Button} from "@/components/ui/button"
import {NavLink} from "react-router";

export default function PageNotFound(){

    return (
        <>
            <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
                <div className="relative flex flex-col justify-center items-center gap-2">
                <h1 className="font-primary font-extrabold text-[14rem]">404</h1>
                <h2 className="absolute font-decorative font-extrabold text-[1.2rem] -rotate-60 bg-gray-50">Page Not Found.</h2>
                </div>
                <NavLink to="/" className="font-decorative -mt-12 "><Button>Home Page</Button></NavLink>
            </div>
        </>
    )
}