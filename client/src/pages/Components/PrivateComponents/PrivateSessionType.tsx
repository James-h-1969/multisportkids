import SessionType from "./SessionType";

function PrivateSessionType(){
    return(
        <div className="private-session-type-box">
            <h1><span className='step1'>Step 3: Pick Session Type</span></h1>
            <SessionType />
        </div>
    )
}

export default PrivateSessionType;