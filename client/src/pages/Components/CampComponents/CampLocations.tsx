import LinkButton from "../LinkButton";


function CampLocation(){
    return (
        <div className="camp-location">
            <h1><span className="camp-loc-heading">Location</span></h1>
            <a><span className="camp-loc-desc">Find a camp based on your location</span></a>
            <div className="location-box">
                <h1><span className="beach-heading">Northern Beaches</span></h1>
                <div className="beach-button">
                    <LinkButton to="/" color="#46768E" text="Visit now" textcolor="white"/>
                </div>
            </div>
            <div className="location-box">
                <h1><span className="north-heading">North Shore</span></h1>
                <div className="north-button">
                    <LinkButton to="/" color="#46768E" text="Visit now" textcolor="white"/>
                </div>
            </div>
        </div>
    )
}

export default CampLocation;