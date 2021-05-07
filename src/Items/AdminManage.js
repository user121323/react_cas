import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import Region from "./CarDetails/Region";
import Body from "./CarDetails/Body";
import Brand from "./CarDetails/Brand";
import Color from "./CarDetails/Color";
import CountryOrigin from "./CarDetails/CountryOrigin";
import Drive from "./CarDetails/Drive";
import Engine from "./CarDetails/Engine";
import SteeringWheel from "./CarDetails/SteeringWheel";
import Transmission from "./CarDetails/Transmission";
import Media from "./CarAdvancedDetails/Media";
import Options from "./CarAdvancedDetails/Options";
import Optics from "./CarAdvancedDetails/Optics";
import Salon from "./CarAdvancedDetails/Salon";
import Outsides from "./CarAdvancedDetails/Outsides";
import Model from "./CarDetails/Model";
import Users from "./Users";
import CarSparePartsAdmin from "./CarSparePartsAdmin";


function AdminManage(){
    const history = useHistory();
    const JwtToken = Cookies.get("JwtToken");
    const bearer= "Bearer "+JwtToken;
    const userEmail = Cookies.get("email");
    const [isAdmin,setAdmin] = useState(false);

    const currentUrl = window.location.href;

    const [detail,setDetail] = useState("");



    useEffect(()=>{
        loadData();
    }, [isAdmin]);

    async function loadData(){
        if (JwtToken != null){
            const response = await fetch("http://localhost:8081/api/user/isadmin/"+userEmail,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":bearer
                },
            });

            const user = await response.json();


            setAdmin(user.email == userEmail);

            if (user.email != userEmail){
                history.push("/");
            }
        }

        let carDetails = "";
        for (let i = currentUrl.length-1;i>=0;i--){
            if (currentUrl[i] == '/'){
                break;
            }
            carDetails+=currentUrl[i];
        }
        setDetail(carDetails.split("").reverse().join(""));

    }

    if (detail === "region"){
        return <Region/>
    } else if(detail === "bodywork"){
        return <Body/>
    } else if(detail === "brand"){
        return <Brand/>
    } else if(detail === "model"){
        return <Model/>
    } else if(detail === "color"){
        return <Color/>
    } else if(detail === "countryorigin"){
        return <CountryOrigin/>
    } else if(detail === "drive"){
        return <Drive/>
    } else if(detail === "engine"){
        return <Engine/>
    } else if(detail === "steeringwheel"){
        return <SteeringWheel/>
    } else if(detail === "transmission"){
        return <Transmission/>
    } else if(detail === "media"){
        return <Media/>
    } else if(detail === "options"){
        return <Options/>
    } else if(detail === "optics"){
        return <Optics/>
    } else if(detail === "salon"){
        return <Salon/>
    } else if(detail === "outsides"){
        return <Outsides/>
    } else if(detail === "users"){
        return <Users/>
    } else if(detail === "spareparts"){
        return <CarSparePartsAdmin/>
    } else {
        return <div></div>
    }
}

export default AdminManage;