import "./Components.css";
import LinkButton from "./LinkButton";
import tigers from "/assets/Tigers.png";
import stives from "/assets/stives.jpeg";
import swans from "/assets/swans.png";
import lions from "/assets/Lions.jpeg";
import bombers from "/assets/bombers.jpeg";
import ontop from "/assets/ontop.png";
import code5 from "/assets/code5.png";



function Footer(){
    const teams = [tigers, stives, swans, lions, bombers];

    return(
        <div className="footer">
            <LinkButton to="/" text="Contact Us" textcolor="#46768E" color="white"/>
            <div className="footer-headings">
                <h1>Sponsers</h1>
                <div className="sponsors">
                    <img src={ontop} style={{"width":"500px", "height": "150px", "objectFit": "cover", "borderRadius": "15px", marginRight: "50px"}}/>
                    <img src={code5} style={{"width":"400px", "height": "150px", "objectFit": "cover", "borderRadius": "15px"}}/>
                </div>
                <h1>Partnered Clubs</h1>
                <div className="clubs-logos">
                    {teams.map((item, index) => (
                        <div className="club-logo">
                            <img src={item} style={{"width":"100px", "height": "100px", "objectFit": "cover", "borderRadius": "15px"}}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Footer;