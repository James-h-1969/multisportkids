import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import UpComingCamps from "./Components/CampComponents/UpcomingCamps";
import "./Camps.css";
import useMediaQueries from "media-queries-in-react";
import campVideo from "/assets/aflkidsvid.mp4";
import Footer from "./Components/Footer"

function Camps(){
    const text = "Our camps combine a mix of skill drills and games to create a fun environment for AFL kids. Guarenteed to learn new skills and make friends!";
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });
    return (
        <>
            <NavBar />
            <Header title="Holiday Camps" description={text}/>
            <UpComingCamps />
            <Footer />
        </>
    )
}

export default Camps;