import { Image } from "react-bootstrap";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import ConFooter from "./Components/ConFooter";
import useMediaQueries from "media-queries-in-react";

export default function Sports() {
  const sports = [
    ["AFL", "/assets/sportLogos/afl.png"],
    ["Touch Footy", "/assets/sportLogos/rugby.png"],
    ["Athletics", "/assets/sportLogos/athletics.png"],
    ["Basketball", "/assets/sportLogos/basketball.png"],
    ["Cricket", "/assets/sportLogos/cricket.png"],
    ["Hockey", "/assets/sportLogos/hockey.png"],
    ["Soccer", "/assets/sportLogos/soccer.png"],
    ["Teeball", "/assets/sportLogos/softball.png"],
    ["Tennis", "/assets/sportLogos/tennis.png"],
    ["Netball", "/assets/sportLogos/volleyball.png"],
  ];

  const mediaQueries = useMediaQueries({ 
    mobile: "(max-width: 480px)",
    })


  return (
    <>
      <NavBar />
      <Header
        title="Our Sports"
        description="MultiSportKids offers a wide range of sports to try out and enjoy. The following sports are included."
      />
      <div className="d-flex flex-wrap mb-5 justify-content-center">
        {sports.map((value, index) => (
          <div key={index} className="d-flex flex-column align-items-center p-3">
            <Image src={value[1]} alt={value[0]} style={{width:mediaQueries.mobile?"60px":"200px", height:mediaQueries.mobile?"60px":"200px"}} />
            <div style={{fontWeight:"bold", fontSize:"30px"}}>
                 {value[0]} 
            </div>
          </div>
        ))}
      </div>
      <ConFooter />
    </>
  );
}
