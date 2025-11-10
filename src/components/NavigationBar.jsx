import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuLink
} from "@/components/ui/navigation-menu";
import {NavLink} from "react-router";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button.jsx";
import {Menu} from "lucide-react";
import logo from '../assets/DDC-name-black-cropped.png';

export default function NavBar() {
    const links =[
        {to:'/', label:'Home'},
        {to:'/about', label:'About'},
        {to:'/contact', label:'Contact'}
    ]
    return(
        <header className="w-[100vw] h-[20vh] flex justify-center items-center">
            <nav className="w-[80vw] md:max-w-[600px] lg:max-w-[1000px] flex justify-between items-center navbar">
                <div id="web-logo-container">
                    <img className="h-14" src={logo} alt="Logo" />
                </div>

                {/*For Desktop*/}
                <NavigationMenu className=" self-flex-end">
                 <NavigationMenuList>
                     {links.map(link => (
                         <NavLink to={link.to} className="hidden md:block"> <NavigationMenuLink className="font-primary font-[600] h-full w-full "> {link.label} </NavigationMenuLink> </NavLink>
                     ))}
                 </NavigationMenuList>
                </NavigationMenu>

                {/*For Mobile*/}
                <Sheet>
                    <SheetTrigger className="md:hidden">
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Open Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="md:hidden">
                        <div className="mt-20 ml-4 flex flex-col gap-3">
                        {links.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    ` text-lg font-medium transition-colors hover:text-primary ${
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    )
}