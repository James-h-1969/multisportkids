import useMediaQueries from "media-queries-in-react";

type TeamProps = {
    name:string,
    player: string,
    changePlayer: (name:string) => void,
}



export default function TeamCard({name, player, changePlayer}:TeamProps){
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });
    return(
        <div className="d-flex justify-content-center">
            <div onClick={() => changePlayer(name)} className="text-center" style={{backgroundColor: name === player ?"#46768E":"", borderRadius:"15px", cursor:"pointer" }}>
                <div><span style={{fontSize:mediaQueries.mobile?"10px":"20px"}}>{name}</span></div>
            </div>
        </div>
    )
}
