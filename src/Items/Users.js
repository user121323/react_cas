import {Button, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {NavLink, useHistory} from "react-router-dom";

function Users(){
    const history = useHistory();
    const JwtToken = Cookies.get("JwtToken");
    const bearer= "Bearer "+JwtToken;
    const userEmail = Cookies.get("email");


    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);

    const handleShowDelete = event => {
        setShowDelete(true);
        const userId = event.target.getAttribute("data-userId")
        setDeleteUserId(userId)
    }

    const [listUser, setListUser] = useState(null);
    const [deleteUserId, setDeleteUserId] = useState("");
    const [changedUser, setChangedUser] = useState(0);

    useEffect(()=>{
        loadData();
    }, [changedUser]);



    async function loadData(){
        if (JwtToken != null) {
            const response = await fetch("http://localhost:8081/api/user/isadmin/" + userEmail, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                },
            });

            const user = await response.json();


            console.log(user)

            if (user.email != userEmail) {
                history.push("/");
            }

            const responseRegion = await fetch("http://localhost:8081/api/user/getAllUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                },
            });


            const users = await responseRegion.json();
            if (users.id !== null) {
                setListUser(users);
            }

        } else{
            history.push("/");
        }
    }


    const handleDeleteBody = event =>{
        const user = {
            id:deleteUserId,
            name:null
        };

        deleteUser(user);

        setShowDelete(false);
        event.preventDefault();
    }

    async function deleteUser(data){
        const response = await fetch("http://localhost:8081/api/user/deleteUser",{
            method:"DELETE",
            mode:"cors",
            cache:"no-cache",
            credentials:"same-origin",
            headers:{
                "Content-Type":"application/json",
                "Authorization":bearer
            },
            redirect:"follow",
            referrerPolicy:"no-referrer",
            body:JSON.stringify(data)
        });

        const body = await response.json();
        if (body.id !== null){
            setChangedUser(1)
        }
    }

    function findUser(id){
        let user = null;
        for (let i =0;i<listUser.length;i++){
            if (listUser[i].id == id){
                user = listUser[i]
            }
        }

        return user;
    }



    return(<div className="mt-5">
        <Container>
            <Row className="mt-5">
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Roles</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {listUser?.map((row,index)=>(
                        <tr>
                            <td>{index}</td>
                            <td>{row.id}</td>
                            <td>{row.email}</td>
                            <td>{row.fullname}</td>
                            <td>
                                {row.roles?.map((items,ind)=>(
                                    <span>{items.role} {row.roles[ind+1]!=null?", ":""}</span>
                                ))}
                            </td>
                            <td>
                                <Button variant="secondary" onClick={handleShowDelete} data-userId={row.id} >Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>


            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Users</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleDeleteBody}>
                    <Modal.Body>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Are you sure?</Form.Label>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            No
                        </Button>
                        <Button variant="primary" type="submit">
                            Yes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    </div>)
}

export default Users;