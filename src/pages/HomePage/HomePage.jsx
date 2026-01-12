import NavBar from "@/components/NavigationBar.jsx";
import Footer from "@/components/Footer.jsx"
import CodeSnippet from "@/components/CodeSnippet.jsx";
import HeroSection from "@/pages/HomePage/HeroSection.jsx";

export default function HomePage() {
    return (
        <div>
            <NavBar/>
            <div className="w-[100vw] flex justify-center items-center">
            <div className="w-[95vw] md:w-[80vw]  md:max-w-[600px] lg:max-w-[1000px] justify-center">
            <HeroSection/>
            </div>
            </div>
        </div>
    )
}