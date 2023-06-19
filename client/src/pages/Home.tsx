import LinkButton from "./Components/LinkButton";
import NavBar from "./Components/NavBar";
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
                <LinkButton to="/private" color="#46768E" />
            </div>
        </>
    )
}

export default Home;