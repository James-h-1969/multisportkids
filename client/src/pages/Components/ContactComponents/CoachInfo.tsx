import { Image } from "react-bootstrap";
import useMediaQueries from "media-queries-in-react";

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
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });
    return(
        <div className="pt-3" style={{width:"100%"}}>
            <div className=" p-2 text-center">
                <div style={{fontWeight:"bold", fontSize:mediaQueries.mobile?"14px":"30px"}}>{role}</div>
                <div className="d-flex justify-content-between ps-4 pe-4 pb-4 pt-3" style={{fontSize:mediaQueries.mobile?"10px":"30px"}}>                
                    <div>{position}</div>
                    <div>{phone}</div>
                </div>
                <div style={{fontWeight:"lighter", fontSize:mediaQueries.mobile?"10px":"30px"}}>"{quote}"</div>
            </div>
            <div className="d-flex justify-content-between">
                {!mediaQueries.mobile?
                    <Image src={image} className="mt-5 ms-4" style={{width:"300px", height:"300px", objectFit:"cover", borderRadius:"10px"}}/>
                :<></>}
                <div className="d-block pt-3 ps-3" style={{width:mediaQueries.mobile?"80%":"53%"}}>
                    <span style={{fontSize:mediaQueries.mobile?"15px":"20px", fontWeight:"bold"}}>Coaching Experience:</span>
                    <span style={{fontSize:mediaQueries.mobile?"10px":"15px", lineHeight:"0px"}}>
                    {coachingExperience.map((val) => {
                        return (
                            <><br />- {val}</>
                        )
                    })}</span>
                    <br />
                    <span style={{fontSize:mediaQueries.mobile?"15px":"20px", fontWeight:"bold"}}>Playing Experience</span>:
                    <span style={{fontSize:mediaQueries.mobile?"10px":"15px", lineHeight:"0px"}}>
                    {playingExperience.map((val) => {
                        return (
                            <><br />- {val}</>
                        )
                    })}</span>
                {mediaQueries.mobile?
                    <Image src={image} className="" style={{width:"150px", height:"120px", objectFit:"cover", borderRadius:"10px"}}/>
                :<></>}
                </div>

            </div>
            
        </div>
    )
}