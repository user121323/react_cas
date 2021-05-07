import {Button, Form, FormControl, Nav, Navbar, NavDropdown, NavLink} from "react-bootstrap";
import Cookies from "js-cookie";
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";


function Header(){
    const history = useHistory();
    const JwtToken = Cookies.get("JwtToken");
    const bearer= "Bearer "+JwtToken;

    const userEmail = Cookies.get("email");
    const [cookiesJwtToken, setCookieJwtToken, removeCookieJwtToken] = useCookies(['JwtToken']);

    const [isAdmin,setAdmin] = useState(false);

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

            setAdmin(response.status != 404)
        }
    }

    const handleSubmit = event =>{
        logout();
        event.preventDefault();
    }

    function logout() {
        if (JwtToken != null) {

            removeCookieJwtToken("JwtToken", {path:'/'});

        }
        history.push("/");
        setAdmin(10<1);
    }

    const admin_nav = (<div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Car Service App</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Car</Nav.Link>
                <Nav.Link href="/spareparts">Car Spare Parts</Nav.Link>
                <Nav.Link href="/api/createad">Create Ad</Nav.Link>
                <Nav.Link href="/api/admin/car">Car Manage</Nav.Link>
                <Nav.Link href="/api/admin/spareparts">Car Spare Parts Manage</Nav.Link>
                <Nav.Link href="/api/admin/users">Users Manage</Nav.Link>
                <NavDropdown title="Car Details" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/api/admin/brand">Car Brand</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/model">Car Model</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/countryorigin">Car Country Origin</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/bodywork">Car BodyWork</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/color">Car Color</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/engine">Car Engine</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/drive">Car Drive</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/region">Car Region</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/steeringwheel">Car Steering Wheel</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/transmission">Car Transmission</NavDropdown.Item>
                    <NavDropdown.Divider />
                </NavDropdown>

                <NavDropdown title="Car Advanced Details" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/api/admin/media">Media</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/options">Options</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/optics">Optics</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/salon">Salon</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/admin/outsides">Outsides</NavDropdown.Item>
                    <NavDropdown.Divider />
                </NavDropdown>
            </Nav>


            <Nav>
                <Nav.Link onClick={handleSubmit}>Log Out</Nav.Link>
            </Nav>
        </Navbar>
    </div>);

    const user_nav_auth=(<div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Car Service App</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Car</Nav.Link>
                <Nav.Link href="/spareparts">Car Spare Parts</Nav.Link>
                <Nav.Link href="/createad">Create Ad</Nav.Link>
            </Nav>

            <Nav>

                <Nav.Link onClick={handleSubmit}>Sign Out</Nav.Link>
            </Nav>

        </Navbar>
    </div>);

    const user_nav=(<div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Car Service App</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Car</Nav.Link>
                <Nav.Link href="/spareparts">Car Spare Parts</Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/signin" className="float-right">Sign In</Nav.Link>
                <Nav.Link href="/signup" className="float-right">Sign Up</Nav.Link>
            </Nav>

        </Navbar>
    </div>);

    if (JwtToken != null){
        if (isAdmin){
            return admin_nav;
        } else {
            return user_nav_auth;
        }
    } else {
        return user_nav;
    }
}

export default Header;