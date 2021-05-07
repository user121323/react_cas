import {Button, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";

function Region(){
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
        const regionId = event.target.getAttribute("data-regionId")
        setEditRegionId(regionId)
        setEditRegionName(findRegion(regionId).name)
    }
    const handleShowDelete = event => {
        setShowDelete(true);
        const regionId = event.target.getAttribute("data-regionId")
        setDeleteRegionId(regionId)
    }

    const [listRegion, setListRegion] = useState(null);


    const [newRegionName, setNewRegionName] = useState("");
    const [editRegionName, setEditRegionName] = useState("");
    const [editRegionId, setEditRegionId] = useState("");
    const [deleteRegionId, setDeleteRegionId] = useState("");

    const handleChangeNewRegionName = event =>{
        setNewRegionName(event.target.value);
    }
    const handleChangeEditRegionName = event =>{
        setEditRegionName(event.target.value);
    }

    const [addedRegion, setAddedRegion] = useState(0);

    useEffect(()=>{
        loadData();
    }, [addedRegion]);



    async function loadData(){
        const responseRegion = await fetch("http://localhost:8081/api/carRegion/getAllCarRegion",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":bearer
            },
        });
        const carRegion = await responseRegion.json();
        if (carRegion.id !== null){
            setListRegion(carRegion);
        }
    }


    const handleCreateRegion = event =>{
        setShowCreate(false);

        const region = {
            id:null,
            name:newRegionName
        }
        createRegion(region);

        setNewRegionName("");
        event.preventDefault();
    }

    async function createRegion(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carRegion/addCarRegion",{
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

        const region = await response.json();
        if (region.id !== null){
            setAddedRegion(region.id)
        }
    }

    const handleEditRegion = event =>{
        const region = {
            id:editRegionId,
            name:editRegionName
        };

        editRegion(region);

        setShowEdit(false);
        event.preventDefault();
    }

    async function editRegion(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carRegion/saveCarRegion",{
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

        const region = await response.json();
        if (region.id !== null){
            setAddedRegion(region.id)
        }
    }

    const handleDeleteRegion = event =>{
        const region = {
            id:deleteRegionId,
            name:null
        };

        deleteRegion(region);

        setShowDelete(false);
        event.preventDefault();
    }

    async function deleteRegion(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carRegion/deleteCarRegion",{
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

        const region = await response.json();
        if (region.id !== null){
            setAddedRegion(region.id)
        }
    }

    function findRegion(id){
        let region = null;
        for (let i =0;i<listRegion.length;i++){
            if (listRegion[i].id == id){
                region = listRegion[i]
            }
        }

        return region;
    }


    return(<div className="mt-5">
        <Container>
            <Row className="justify-content-center">
                <Button variant="primary" onClick={handleShowCreate}>Create Region</Button>

                <Modal show={showCreate} onHide={handleCloseCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Region</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleCreateRegion}>
                        <Modal.Body>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Region Name</Form.Label>
                                <Form.Control type="text" placeholder="Almaty" value={newRegionName} onChange={handleChangeNewRegionName}/>
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
                    {listRegion?.map((row,index)=>(
                        <tr>
                            <td>{index}</td>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>
                                <Button variant="light" onClick={handleShowEdit} data-regionId={row.id}>Edit</Button>
                                <span style={{visibility:"hidden"}}>probel</span>
                                <Button variant="secondary" onClick={handleShowDelete} data-regionId={row.id} >Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>


            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Region</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleEditRegion}>
                    <Modal.Body>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Region Name</Form.Label>
                            <Form.Control type="text" placeholder="Almaty" value={editRegionName} onChange={handleChangeEditRegionName}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Region</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleDeleteRegion}>
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

export default Region;