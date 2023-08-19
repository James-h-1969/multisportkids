
type TeamProps = {
    name:string,
    player: string,
    changePlayer: (name:string) => void,
}

export default function TeamCard({name, player, changePlayer}:TeamProps){
    return(
        <div className="d-flex justify-content-between">
            <div onClick={() => changePlayer(name)} className=" p-2 text-center" style={{backgroundColor: name === player ?"#46768E":"", borderRadius:"15px", cursor:"pointer"}}>
                <div>{name}</div>
            </div>
        </div>
    )
}
