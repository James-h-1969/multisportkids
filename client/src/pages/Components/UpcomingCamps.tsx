import { Container } from "react-bootstrap";


function upComingCamps(){
    const currentCamps = {
        camp1: {
            location: "Northern Beaches",
            week: 1,
            date: "17/1/23"
        },
        camp2: {
            location: "North Shore",
            week: 1,
            date: "18/1/23"
        },
        camp3: {
            location: "Northern Beaches",
            week: 2,
            date: "23/1/23"
        },
    };


    return (
        <>
            <div className="camp-background-box">
                <div className="upcoming-box">
                    <h1><span className="camp-title">Upcoming Camps</span></h1>
                    <div className="camp-titles">
                        <a><span className="camp-location">Location</span></a>
                        <a><span className="camp-week">Week</span></a>
                        <a><span className="camp-date">Date</span></a>
                    </ div>
                </div>
            </div>
        </>
    );
}

export default upComingCamps