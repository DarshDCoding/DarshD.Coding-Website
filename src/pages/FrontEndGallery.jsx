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
// import digiCard from "/ImageGallery/DigiCard.png"
import backgroundImg from "/ImageGallery/backgroundImgBg.png"
import {NavLink} from "react-router";

import cards from "@/lib/cardDetails.js"

export default function FrontEndGallery() {

    return(
        <>
        <NavBar/>
        <main className="m-auto w-[80vw] md:max-w-[600px] lg:max-w-[1000px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-items-center ">
            {cards.map((card) => (
                <Card
                    key={card.title}
                    className="relative w-full p-0 border border-gray-650 rounded-t-xl"
                >
                    <CardHeader className=" overflow-contain p-0">
                        <div
                            className="relative w-full py-8 px-4 rounded-t-xl overflow-hidden"
                            style={{
                                backgroundImage: `url(${backgroundImg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="h-[150px] flex justify-center items-center rounded overflow-contain hover:scale-110 duration-200">
                                <a href={card.url} rel="noopener noreferrer">
                                <img
                                    src={`/ImageGallery/${card.file}`}
                                    alt="DigiCard"
                                    className="relative z-10 mx-auto"
                                    loading="lazy"
                                />
                                </a>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col w-full gap-2">
                        <CardTitle className="text-[25px] font-bold font-primary">
                            {card.title}
                        </CardTitle>

                        <div id="tech-stack">
                            {card.techStack.map((techStack) => (
                                <span key={techStack} className="text-[15px]">
            {techStack}
          </span>
                            ))}
                        </div>

                        <CardDescription className="text-[12px]">
                            {card.description}
                        </CardDescription>
                    </CardContent>

                    <CardFooter className="flex justify-start gap-2 mb-4">
                        <CardAction>
                            <a href={card.url} target="_blank" rel="noopener noreferrer">
                                <Button className="bg-red-600 hover:bg-red-400 hover:text-gray-800">
                                    <HiArrowUpRight /> Visit Site
                                </Button>
                            </a>
                        </CardAction>

                        <CardAction>
                            <a href={card.SourceLink} rel="noopener noreferrer">
                                <Button>
                                    <FaGithub /> Source Code
                                </Button>
                            </a>
                        </CardAction>
                    </CardFooter>
                </Card>
            ))}

        </main>
        </>
    )
}