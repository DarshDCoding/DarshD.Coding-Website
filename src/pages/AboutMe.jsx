import {NavLink} from "react-router";

export default function AboutMe() {
    return (
        <>
            <h1 className="text-center">
                This is about me section
            </h1>
            <NavLink to="/">Go to home page</NavLink>
        </>

    )
}