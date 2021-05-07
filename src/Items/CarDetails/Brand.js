import {Button, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";

function Brand(){
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
        setEditBrandName(findBrand(regionId).name)
    }
    const handleShowDelete = event => {
        setShowDelete(true);
        const regionId = event.target.getAttribute("data-brandId")
        setDeleteBrandId(regionId)
    }

    const [listBrand, setListBrand] = useState(null);


    const [newBrandName, setNewBrandName] = useState("");
    const [editBrandName, setEditBrandName] = useState("");
    const [editBrandId, setEditBrandId] = useState("");
    const [deleteBrandId, setDeleteBrandId] = useState("");

    const handleChangeNewBrandName = event =>{
        setNewBrandName(event.target.value);
    }
    const handleChangeEditBrandName = event =>{
        setEditBrandName(event.target.value);
    }

    const [addedBrand, setAddedBrand] = useState(0);

    useEffect(()=>{
        loadData();
    }, [addedBrand]);



    async function loadData(){
        const responseRegion = await fetch("http://localhost:8081/api/carBrand/getAllCarBrand",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":bearer
            },
        });
        const carRegion = await responseRegion.json();
        if (carRegion.id !== null){
            setListBrand(carRegion);
        }
        console.log("loadboy")
    }


    const handleCreateBrand = event =>{
        setShowCreate(false);

        const body = {
            id:null,
            name:newBrandName
        }
        createBrand(body);

        setNewBrandName("");
        event.preventDefault();
    }

    async function createBrand(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carBrand/addCarBrand",{
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
            name:editBrandName
        };

        editBrand(brand);


        setEditBrandId(0);
        setEditBrandName("");
        setShowEdit(false);
        event.preventDefault();
    }

    async function editBrand(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carBrand/saveCarBrand",{
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
        const response = await fetch("http://localhost:8081/api/carBrand/deleteCarBrand",{
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
        for (let i =0;i<listBrand.length;i++){
            if (listBrand[i].id == id){
                body = listBrand[i]
            }
        }

        return body;
    }


    return(<div className="mt-5">
        <Container>
            <Row className="justify-content-center">
                <Button variant="primary" onClick={handleShowCreate}>Create Brand</Button>

                <Modal show={showCreate} onHide={handleCloseCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Brand</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleCreateBrand}>
                        <Modal.Body>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text" placeholder="Brand" value={newBrandName} onChange={handleChangeNewBrandName}/>
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
                    {listBrand?.map((row,index)=>(
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
                    <Modal.Title>Brand</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleEditBrand}>
                    <Modal.Body>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control type="text" placeholder="Brand" value={editBrandName} onChange={handleChangeEditBrandName}/>
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
                    <Modal.Title>Delete Brand</Modal.Title>
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

export default Brand;