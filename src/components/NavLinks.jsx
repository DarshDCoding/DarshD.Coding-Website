import {NavigationMenuLink} from "@/components/ui/navigation-menu.jsx";


export const NavLinks = ({link, text}) => {
    return (
    <NavigationMenuLink href={`/${link}`} className="font-primary font-[600]"> {text} </NavigationMenuLink>
        )
}