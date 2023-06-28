import "../Components.css";
import HomeSpecLocation from "./HomeSpecLocation";
import weldon from "../../assets/weldon.png";
import accron from "../../assets/accron.png";

function HomeLocation(){
    return(
        <div className="homelocation-box">
            <HomeSpecLocation location="Northern Beaches" address="Weldon Oval, Curl Curl NSW 2096" camplink="/camps" image={
                <img src={weldon} style={{"width":"300px", "height": "300px","objectFit": "cover", "borderRadius": "30px", }}/>
            }/>
            <HomeSpecLocation location="North Shore" address="Acron Oval, St Ives NSW 2075" camplink="/camps" image={
                <img src={accron} style={{"width":"300px", "height": "300px", "objectFit": "cover", "borderRadius": "30px"}}/>
            }/>
        </div>
    );
}

export default HomeLocation;