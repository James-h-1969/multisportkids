import { Image } from "react-bootstrap";

type CoachInfoProps = {
    role: string,
    position: string,
    phone: string,
    quote: string,
    image: string,
    coachingExperience: Array<string>,
    playingExperience: Array<string>
}

export default function CoachInfo({role,position,phone,quote, image, coachingExperience, playingExperience}:CoachInfoProps){
    return(
        <div className="pt-3" style={{width:"100%"}}>
            <div className=" p-2 text-center">
                <div style={{fontWeight:"bold"}}>{role}</div>
                <div className="d-flex justify-content-between ps-4 pe-4 pb-4 pt-3" style={{fontSize:"20px"}}>                
                    <div>{position}</div>
                    <div>{phone}</div>
                </div>
                <div style={{fontWeight:"lighter"}}>"{quote}"</div>
            </div>
            <div className="d-flex justify-content-between">
                <Image src={image} className="mt-5 ms-4" style={{width:"300px", height:"300px", objectFit:"cover", borderRadius:"10px"}}/>
                <div className="pt-3" style={{width:"53%"}}>
                    Coaching Experience:
                    <span style={{fontSize:"15px"}}>
                    {coachingExperience.map((val) => {
                        return (
                            <><br />- {val}</>
                        )
                    })}</span>
                    <br />
                    Playing Experience:
                    <span style={{fontSize:"15px"}}>
                    {playingExperience.map((val) => {
                        return (
                            <><br />- {val}</>
                        )
                    })}</span>

                </div>
            </div>
            
        </div>
    )
}