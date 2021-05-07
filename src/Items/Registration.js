import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useHistory} from "react-router-dom";


function Registration(){
    const history = useHistory();
    const JwtToken = Cookies.get("JwtToken");
    const bearer= "Bearer "+JwtToken;

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    const handleChangeFullname = event=>{
        setFullname(event.target.value);
    }
    const handleChangeEmail = event=>{
        setEmail(event.target.value)
    }
    const handleChangePassword = event=>{
        setPassword(event.target.value);
    }
    const handleChangeRepassword = event=>{
        setRepassword(event.target.value);
    }
    const handleChangeCheckbox = event=>{
        if (checkbox == true){
            setCheckbox(false);
        }
        else {
            setCheckbox(true);
        }
    }


    const handleSubmit = event =>{
        if (password.valueOf() === repassword.valueOf() && checkbox == true){
            const user = {
                id:null,
                email:email,
                fullname:fullname,
                password:password
            }

            register(user);
        }

        event.preventDefault();
    }
    async function register(data){
        const response = await fetch("http://localhost:8081/register",{
            method:"POST",
            mode:"cors",
            cache:"no-cache",
            credentials:"same-origin",
            headers:{
                "Content-Type":"application/json"
            },
            redirect:"follow",
            referrerPolicy:"no-referrer",
            body:JSON.stringify(data)
        });

        const user = await response.json();
        if (user.id !== null){
            setCheckbox(false);
            setRepassword("");
            setPassword("");
            setFullname("");
            setEmail("");

            alert("Success")
        }


    }


    useEffect(()=>{
        loadData();
    }, []);

    async function loadData(){
        if (JwtToken != null){
            const response = await fetch("http://localhost:8081/api/checkAuth",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":bearer
                },
            });
            if (response.status == 200){
                history.push("/");
            }
        }
    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-2">
                    <h2>Create new account</h2><br/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" required value={fullname} onChange={handleChangeFullname} aria-describedby="emailHelp" placeholder="Full Name"/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" required value={email} onChange={handleChangeEmail} placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" required value={password} onChange={handleChangePassword} placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" required value={repassword} onChange={handleChangeRepassword} placeholder="Repeat password"/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" required value={checkbox} onChange={handleChangeCheckbox} id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">I have read and accepted the terms and conditions</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;