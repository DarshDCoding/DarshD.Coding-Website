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
import {NavLink} from "react-router";

import cards from "@/lib/cardDetails.js"

export default function FrontEndGallery() {

    return(
        <>
        <NavBar/>
            <div id="container" className="w-[100vw] flex justify-center">
            <div id="cards-container" className="w-[80vw] md:max-w-[600px] lg:max-w-[100px] flex flex-col md:flex-row justify-center gap-2 ">
                {cards.map((card) => (
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
                    <CardTitle className="text-[25px] font-bold font-primary">{card.title}</CardTitle>
                    <div id="tech-stack">
                        {card.techStack.map((techStack, index) => (
                        <span className="text-[15px]">{techStack}</span>
                        ))}
                    </div>
                    <CardDescription className="text-[12px]">{card.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start gap-2 mb-4">
                    <CardAction>
                        <a
                        href="https://www.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Button className="bg-red-600 hover:bg-red-400 hover:text-gray-800">{HiArrowUpRight()} Visit Site</Button>
                    </a>
                    </CardAction>
                    <CardAction>
                        <a
                            href="https://www.google.com"
                            rel="noopener noreferrer"
                        >
                        <Button>{FaGithub()} Source Code</Button>
                        </a>
                        </CardAction>
                </CardFooter>
            </Card>
                ))}
            </div>
            </div>
        </>
    )
}