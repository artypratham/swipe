import "../HomeBg/HomeBg.css";
import Vintage from "../../assets/vintage.jpeg";


export default function HomeBg(){
    return(
        <div className="home-background">
            <div className="earth">
            <div className="vintage-pc-div">
                <img src={Vintage} alt="" srcset="" className="vintage-pc jitter-forward jitter-reverse" />
            </div>
            </div>
        </div>
       
    )
}