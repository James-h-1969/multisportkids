import { Link } from "react-router-dom"
import { Image } from "react-bootstrap"
import { Telephone, Envelope } from "react-bootstrap-icons"

export default function ConFooter() {
    return(
        <div className="d-flex justify-content-center gap-5 pb-5" style={{fontWeight:"bold", fontSize:"30px"}}>
            <div><Envelope />Tomoleary@allsportkids.com.au</div>
            <div><Telephone />+61 448 408 920</div>
            <Link to="https://www.instagram.com/allsportkids_/"><Image src="/assets/instagram.png" style={{width:"50px", height:"50px"}}/></Link>
            {/* <Link to=""><Image src="/assets/facebook.png" style={{width:"50px", height:"50px"}}/></Link> */}
        </div>
    )
}