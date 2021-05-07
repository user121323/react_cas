import {Button, Container, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

import Cookies from "js-cookie";


function Login(){
    const history = useHistory();
    const JwtToken = Cookies.get("JwtToken");
    const bearer= "Bearer "+JwtToken;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    const [cookiesEmail, setCookieEmail, removeCookieEmail] = useCookies(['email']);
    const [cookiesPassword, setCookiePassword, removeCookiePassword] = useCookies(['password']);
    const [cookiesJwtToken, setCookieJwtToken, removeCookieJwtToken] = useCookies(['JwtToken']);


    async function loadData(){
        if (Cookies.get("email") !=null){
            setEmail(Cookies.get("email"));
            setCheckbox(true);
        }
        if (Cookies.get("password") !=null){
            setPassword(Cookies.get("password"));
            setCheckbox(true);
        }


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


    useEffect(()=>{
        loadData();
    }, []);



    const handleChangeEmail = event=>{
        setEmail(event.target.value)
    }
    const handleChangePassword = event=>{
        setPassword(event.target.value);
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
        const user = {
            id:null,
            fullname: null,
            email:email,
            password:password
        }
        login(user);

        event.preventDefault();
    }

    async function login(data){
        const response = await fetch("http://localhost:8081/auth",{
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
        if (user.jwtToken != null){
            setCookieJwtToken("JwtToken",user.jwtToken,{path:'/'})
                setCookieEmail('email',email,{path:'/'})
                setCookiePassword('password',password,{path:'/'})

                const bearer= "Bearer "+user.jwtToken;
                const response = await fetch("http://localhost:8081/api/user/getUser/"+email,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":bearer
                    },
                });
                const res = await response.json();



            if (checkbox != true){
                // removeCookiePassword('password');
                // removeCookieEmail('email');
            }
            setCheckbox(false);
            setPassword("");
            setEmail("");


            history.push("/");
            window.location.reload();
        }

    }

    return (<div className="mt-5">
        <Container>
            <Row className="justify-content-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required value={email} onChange={handleChangeEmail} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required value={password} onChange={handleChangePassword} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" value={checkbox} onChange={handleChangeCheckbox}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Row>
        </Container>
    </div>);
}

export default Login;