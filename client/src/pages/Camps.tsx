import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import UpComingCamps from "./Components/CampComponents/UpcomingCamps";
import "./Camps.css";
import ConFooter from "./Components/ConFooter";

function Camps(){
    const text = "The camps involve 10 sports, all coached by highly experienced atheletes in their field. The aim of the camp is for children to discover and learn a wide range of sports whilst increasing their gross motor skills. A report, following the camp, will provide insigths into each child's strengths and potential sports interests, along with recommendations for local clubs and registration details. Our program is developed and coached by athletes that have excelled in their field aged 19-22, providing a fresh perspective on their sport. We have found that children respond well to wyoung adults and see coaches as positive mentors. Our camp offers as exciting opportunity for young learners to engage in physical activity, develop new skills, and make lasting friendships. We believe that staying active, learning new skills, and building social connects are intefral parts of child development.";
    return (
        <>
            <NavBar />
            <Header title="Holiday Camps" description={text}/>
            <UpComingCamps />
            <ConFooter /> 
        </>
    )
}

export default Camps;