import LinkButton from "./Components/LinkButton";
import NavBar from "./Components/NavBar";
import HomeDeals from "./Components/HomeComponents/HomeDeals";
import HomeLocation from "./Components/HomeComponents/HomeLocation";
import Footer from "./Components/Footer";
import "./Home.css";

function Home(){
    return (
        <>
            <NavBar />
            <div className="heading">
                <h1><span className="home-heading">Helping kids reach their<br /> full <span className="blue">AFL</span> potential</span></h1>
            </div>
            <div className="description">
                <a><span className="description-text">AFL Holiday Camps, classes, and personal coaching</span></a>
            </div>
            <div className="home-desc-button">
                <LinkButton to="/private" color="#46768E" textcolor="white" text="Book now" />
            </div>
            <div className="home-deals">
                <HomeDeals />
            </div>
            {/* <div className="home-location">
                <HomeLocation />
            </div> */}
            {/* <div><Footer /></div> */}
        </>
    )
}

export default Home;