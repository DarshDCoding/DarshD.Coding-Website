import NavBar from "@/components/NavigationBar.jsx";
import FrontendCard from "@/components/FrontendCard.jsx";
import cards from "@/lib/cardDetails.js"
import Footer from "@/components/Footer.jsx";

export default function FrontEndGallery() {
    return(
        <>
        <NavBar/>
        <main className="m-auto w-[80vw] md:max-w-[600px] lg:max-w-[1000px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-items-center ">
            {cards.map((card) => (
                <FrontendCard card={card} />
            ))}
        </main>
            <Footer/>
        </>
    )
}