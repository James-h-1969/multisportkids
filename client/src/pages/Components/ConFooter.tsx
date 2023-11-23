import { Link } from "react-router-dom"
import { Image } from "react-bootstrap"
import { Telephone, Envelope } from "react-bootstrap-icons"
import useMediaQueries from "media-queries-in-react";


export default function ConFooter() {
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
    }); 
    return(
        <div className="d-flex justify-content-center gap-5" style={{fontWeight:"bold", fontSize:mediaQueries.mobile?"2.5vw":"30px", width:"100vw"}}>
            <div><Envelope />Tomoleary@allsportkids.com.au</div>
            <div><Telephone />+61 448 408 920</div>
            <Link to="https://www.instagram.com/allsportkids_/"><Image src="/assets/instagram.png" style={{width:mediaQueries.mobile?"20px":"50px", height:mediaQueries.mobile?"20px":"50px"}}/></Link>
            {/* <Link to=""><Image src="/assets/facebook.png" style={{width:"50px", height:"50px"}}/></Link> */}
        </div>
    )
}