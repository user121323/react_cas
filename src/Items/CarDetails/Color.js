import {Button, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";

function Color(){
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
        const regionId = event.target.getAttribute("data-brandId")
        setEditBrandId(regionId)
        setEditColorName(findBrand(regionId).name)
    }
    const handleShowDelete = event => {
        setShowDelete(true);
        const regionId = event.target.getAttribute("data-brandId")
        setDeleteBrandId(regionId)
    }

    const [listColor, setListColor] = useState(null);


    const [newColorName, setNewColorName] = useState("");
    const [editColorName, setEditColorName] = useState("");
    const [editBrandId, setEditBrandId] = useState("");
    const [deleteBrandId, setDeleteBrandId] = useState("");

    const handleChangeNewBrandName = event =>{
        setNewColorName(event.target.value);
    }
    const handleChangeEditBrandName = event =>{
        setEditColorName(event.target.value);
    }

    const [addedBrand, setAddedBrand] = useState(0);

    useEffect(()=>{
        loadData();
    }, [addedBrand]);



    async function loadData(){
        const responseRegion = await fetch("http://localhost:8081/api/carColor/getAllCarColor",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":bearer
            },
        });
        const carRegion = await responseRegion.json();
        if (carRegion.id !== null){
            setListColor(carRegion);
        }
        console.log("loadboy")
    }


    const handleCreateBrand = event =>{
        setShowCreate(false);

        const body = {
            id:null,
            name:newColorName
        }
        createBrand(body);

        setNewColorName("");
        event.preventDefault();
    }

    async function createBrand(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carColor/addCarColor",{
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

        const brand = await response.json();
        if (brand.id !== null){
            setAddedBrand(brand.id)
        }
    }

    const handleEditBrand = event =>{
        const brand = {
            id:editBrandId,
            name:editColorName
        };

        editBrand(brand);


        setEditBrandId(0);
        setEditColorName("");
        setShowEdit(false);
        event.preventDefault();
    }

    async function editBrand(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carColor/saveCarColor",{
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

        const brand = await response.json();
        if (brand.id !== null){
            setAddedBrand(1)
        }
    }

    const handleDeleteBrand = event =>{
        const brand = {
            id:deleteBrandId,
            name:null
        };

        deleteBrand(brand);

        setShowDelete(false);
        event.preventDefault();
    }

    async function deleteBrand(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carColor/deleteCarColor",{
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

        const brand = await response.json();
        if (brand.id !== null){
            setAddedBrand(1)
        }
    }

    function findBrand(id){
        let body = null;
        for (let i =0;i<listColor.length;i++){
            if (listColor[i].id == id){
                body = listColor[i]
            }
        }

        return body;
    }


    return(<div className="mt-5">
        <Container>
            <Row className="justify-content-center">
                <Button variant="primary" onClick={handleShowCreate}>Create Color</Button>

                <Modal show={showCreate} onHide={handleCloseCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Color</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleCreateBrand}>
                        <Modal.Body>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Color Name</Form.Label>
                                <Form.Control type="text" placeholder="BodyWork" value={newColorName} onChange={handleChangeNewBrandName}/>
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
                    {listColor?.map((row,index)=>(
                        <tr>
                            <td>{index}</td>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>
                                <Button variant="light" onClick={handleShowEdit} data-brandId={row.id}>Edit</Button>
                                <span style={{visibility:"hidden"}}>probel</span>
                                <Button variant="secondary" onClick={handleShowDelete} data-brandId={row.id} >Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>


            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Color</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleEditBrand}>
                    <Modal.Body>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Color Name</Form.Label>
                            <Form.Control type="text" placeholder="Color" value={editColorName} onChange={handleChangeEditBrandName}/>
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
                    <Modal.Title>Color Brand</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleDeleteBrand}>
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

export default Color;