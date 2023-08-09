
type CoachInfoProps = {
    role: string,
    position: string,
    phone: string,
    quote: string
}

export default function CoachInfo({role,position,phone,quote}:CoachInfoProps){
    return(
        <div className="" style={{width:"70%"}}>
            <div className=" p-2 text-center" style={{backgroundColor: "#46768E", borderRadius:"15px", cursor:"pointer"}}>
                <div style={{fontWeight:"bold"}}>{role}</div>
                <div className="d-flex justify-content-between ps-4 pe-4 pb-4" style={{fontSize:"20px"}}>                
                    <div>{position}</div>
                    <div>{phone}</div>
                </div>

                <div style={{fontWeight:"lighter"}}>{quote}</div>
            </div>
        </div>
    )
}