import NavBar from "@/components/NavigationBar.jsx";
import {Button} from "@/components/ui/button";
import {FaGithub} from "react-icons/fa";
import {HiArrowUpRight} from "react-icons/hi2";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import digiCard from "/ImageGallery/DigiCard.png"
import backgroundImg from "/ImageGallery/backgroundImgBg.png"

export default function FrontEndGallery() {
    return(
        <>
        <NavBar/>
            <Card className="w-[20rem] p-0 border-1 border-gray-650 rounded-t-xl">
                <CardHeader className='w-full p-0'>
                    <div
                        className="relative w-full py-8 px-4 rounded-t-xl overflow-hidden"
                        style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        <div className="absolute inset-0 bg-black/40 " /> {/* overlay */}
                        <div className="rounded overflow-hidden  hover:transform-(--scale-up) duration-200 ">
                        <img src={digiCard} alt="DigiCard" className="relative z-10 mx-auto "
                        loading="lazy"/>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col w-full gap-2">
                    <CardTitle className="text-[25px] font-bold font-primary">Digital Visiting Card</CardTitle>
                    <div id="tech-stack">
                        <span className="text-[15px]">HTML</span>
                        <span className="text-[15px]">CSS</span>
                        <span className="text-[15px]">JS</span>
                    </div>
                    <CardDescription className="text-[12px]">
                        This is something i dont know what am i typing please don't mind it, it happens all the time i am thinking of doing something about it but i am too lazy to even think now this much text should be enough to cheack how it is looking.
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start gap-2 mb-4">
                    <CardAction> <Button className="bg-red-600 hover:bg-red-400 hover:text-gray-800">{HiArrowUpRight()} Visit Site</Button></CardAction>
                    <CardAction> <Button>{FaGithub()} Source Code</Button></CardAction>
                </CardFooter>
            </Card>
        </>
    )
}