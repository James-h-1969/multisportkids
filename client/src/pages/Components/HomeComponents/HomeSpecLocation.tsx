import "../Components.css";
import LinkButton from "../LinkButton";

interface HomeSpecLocationProps{
    location: string;
    camplink: string;
    address: string;
    image: React.ReactElement;
}

const HomeSpecLocation: React.FC<HomeSpecLocationProps> = ({location, camplink, address, image}) => {
    return(
        <div className="spec-location-box">
            <h2><span className="home-location-heading">{location}</span></h2>
            <div className="location-options">
                <a>Holiday Camps</a>
                <div className="button-loc">
                    <LinkButton color="white" textcolor="black" text="Book now" to={camplink}/>
                </div>
            </div>
            <div className="location-options">
                <a>Private Sessions</a>
                <div className="button-loc">
                    <LinkButton color="white" textcolor="black" text="Book now" to="/private"/>
                </div>
            </div>
            <div className="loc-image">{image}</div>
            <a><span className="loc-address">{address}</span></a>
        </div>
    );
}

export default HomeSpecLocation;