import LinkButton from "../LinkButton";

interface CampboxProps{
    location: string;
}

const Campbox: React.FC<CampboxProps> = ({location}) => {
    return(
        <div className="campbox-box">
            <div className="campbox-values">
                <a><span className="campbox-location">{location}</span></a>
                <div className="campbox-button">
                    <LinkButton to="/" color="white" textcolor="#46768E" text="View now"/>
                </div>
            </div>

            
        </div>
    )
}

export default Campbox;