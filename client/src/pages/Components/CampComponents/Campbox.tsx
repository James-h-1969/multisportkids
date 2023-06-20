import LinkButton from "../LinkButton";

interface CampboxProps{
    location: string;
    week: number;
    date: string,
}

const Campbox: React.FC<CampboxProps> = ({location, week, date}) => {
    return(
        <div className="campbox-box">
            <div className="campbox-values">
                <a><span className="campbox-location">{location}</span></a>
                <a><span className="campbox-week">{week}</span></a>
                <a><span className="campbox-date">{date}</span></a>
                <div className="campbox-button">
                    <LinkButton to="/" color="white" textcolor="#46768E" text="View now"/>
                </div>
            </div>

            
        </div>
    )
}

export default Campbox;