import "../Components.css";

export default function HomeQuotes(){
    return(
        <>
            <div className="d-flex flex-column justify-content-center" style={{"backgroundColor":"#46768E", textAlign:"center", fontFamily:"'Rubik', sans-serif"}}>
                <div className="d-flex flex-column">
                    <h1><span style={{fontSize:"35px", color:"rgb(170, 200, 224)"}}>"As a parent, watching his game improve was a pleasure to watch"</span></h1>
                    <a><span style={{fontWeight:"bold", fontSize:"20px"}}>- about Archer, U10s</span></a>
                </div>
                <div className="d-flex flex-column">
                    <h1><span style={{fontSize:"35px", color:"rgb(140, 170, 194)"}}>" We strongly encourage other parents to participate to improve their kids skills and confidence"</span></h1>
                    <a><span style={{fontWeight:"bold", fontSize:"20px"}}>- about Patrick, U12s</span></a>
                </div>
            </div>
        </>
    )
}