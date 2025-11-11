import {Button} from "@/components/ui/button"
import {NavLink} from "react-router";

export default function PageNotFound(){

    return (
        <>
            <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-8">
                <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="font-decorative font-extrabold text-6xl">404</h1>
                <h2 className="font-decorative font-extrabold text-2xl">Page Not Found.</h2>
                </div>
                <NavLink to="/" className="font-decorative"><Button>Home Page</Button></NavLink>
            </div>
        </>
    )
}