import {Button, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";

function Drive(){
    const jwtToken = Cookies.get("JwtToken");
    const bearer= "Bearer "+jwtToken;
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseCreate = () => setShowCreate(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowCreate = () => setShowCreate(true);
    const handleShowEdit = event => {
        setShowEdit(true);
        const regionId = event.target.getAttribute("data-bodyId")
        setEditBodyId(regionId)
        setEditBodyName(findBodyWork(regionId).name)
    }
    const handleShowDelete = event => {
        setShowDelete(true);
        const regionId = event.target.getAttribute("data-bodyId")
        setDeleteBodyId(regionId)
    }

    const [listBody, setListbody] = useState(null);


    const [newBodyName, setNewBodyName] = useState("");
    const [editBodyName, setEditBodyName] = useState("");
    const [editBodyId, setEditBodyId] = useState("");
    const [deleteBodyId, setDeleteBodyId] = useState("");

    const handleChangeNewBodyName = event =>{
        setNewBodyName(event.target.value);
    }
    const handleChangeEditBodyName = event =>{
        setEditBodyName(event.target.value);
    }

    const [addedBody, setAddedBody] = useState(0);

    useEffect(()=>{
        loadData();
    }, [addedBody]);



    async function loadData(){
        const responseRegion = await fetch("http://localhost:8081/api/carDrive/getAllCarDrive",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":bearer
            },
        });
        const carRegion = await responseRegion.json();
        if (carRegion.id !== null){
            setListbody(carRegion);
        }
        console.log("loadboy")
    }


    const handleCreateBody = event =>{
        setShowCreate(false);

        const body = {
            id:null,
            name:newBodyName
        }
        createBody(body);

        setNewBodyName("");
        event.preventDefault();
    }

    async function createBody(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carDrive/addCarDrive",{
            method:"POST",
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
            setAddedBody(body.id)
        }
    }

    const handleEditBody = event =>{
        const body = {
            id:editBodyId,
            name:editBodyName
        };

        editBody(body);


        setEditBodyId(0);
        setEditBodyName("");
        setShowEdit(false);
        event.preventDefault();
    }

    async function editBody(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carDrive/saveCarDrive",{
            method:"PUT",
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
            setAddedBody(1)
        }
    }

    const handleDeleteBody = event =>{
        const body = {
            id:deleteBodyId,
            name:null
        };

        deleteBody(body);

        setShowDelete(false);
        event.preventDefault();
    }

    async function deleteBody(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carDrive/deleteCarDrive",{
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
            setAddedBody(1)
        }
    }

    function findBodyWork(id){
        let body = null;
        for (let i =0;i<listBody.length;i++){
            if (listBody[i].id == id){
                body = listBody[i]
            }
        }

        return body;
    }


    return(<div className="mt-5">
        <Container>
            <Row className="justify-content-center">
                <Button variant="primary" onClick={handleShowCreate}>Create Drive</Button>

                <Modal show={showCreate} onHide={handleCloseCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Drive</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleCreateBody}>
                        <Modal.Body>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Drive Name</Form.Label>
                                <Form.Control type="text" placeholder="Drive" value={newBodyName} onChange={handleChangeNewBodyName}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseCreate}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Row>

            <Row className="mt-5">
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {listBody?.map((row,index)=>(
                        <tr>
                            <td>{index}</td>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>
                                <Button variant="light" onClick={handleShowEdit} data-bodyId={row.id}>Edit</Button>
                                <span style={{visibility:"hidden"}}>probel</span>
                                <Button variant="secondary" onClick={handleShowDelete} data-bodyId={row.id} >Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>


            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Car Drive</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleEditBody}>
                    <Modal.Body>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Drive Name</Form.Label>
                            <Form.Control type="text" placeholder="Country Origin" value={editBodyName} onChange={handleChangeEditBodyName}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Drive</Modal.Title>
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

export default Drive;