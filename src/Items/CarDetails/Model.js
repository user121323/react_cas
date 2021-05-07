import {Button, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";

function Model(){
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
        const modelId = event.target.getAttribute("data-modelId")
        setEditModelId(modelId)
        setEditModelName(findModel(modelId).name)
        setEditModelBrandId(findBrand(findModel(modelId).carBrand.id).id);
    }
    const handleShowDelete = event => {
        setShowDelete(true);
        const modelId = event.target.getAttribute("data-modelId")
        setDeleteModelId(modelId)
    }

    const [listModel, setListModel] = useState(null);
    const [listBrand, setListBrand] = useState(null);


    const [newModelName, setNewModelName] = useState("");
    const [newModelBrandId, setNewModelBrandId] = useState("");

    const [editModelName, setEditModelName] = useState("");
    const [editModelId, setEditModelId] = useState("");
    const [editModelBrandId, setEditModelBrandId] = useState("");

    const [deleteModelId, setDeleteModelId] = useState("");
    const [deleteModelBrandId, setDeleteModelBrandId] = useState("");

    const handleChangeNewModelName = event =>{
        setNewModelName(event.target.value);
    }
    const handleChangeNewModelBrandID = event =>{
        setNewModelBrandId(event.target.value);
    }
    const handleChangeEditModelName = event =>{
        setEditModelName(event.target.value);
    }
    const handleChangeEditModelBrandId = event =>{
        setEditModelBrandId(event.target.value);
    }

    const [addedModel, setAddedModel] = useState(0);

    useEffect(()=>{
        loadData();
    }, [addedModel]);



    async function loadData(){
        const responseRegion = await fetch("http://localhost:8081/api/carModel/getAllCarModel",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":bearer
            },
        });
        const carRegion = await responseRegion.json();
        if (carRegion.id !== null){
            setListModel(carRegion);
        }
        console.log(listModel)
        const responseBrand = await fetch("http://localhost:8081/api/carBrand/getAllCarBrand",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":bearer
            },
        });
        const carBrand = await responseBrand.json();
        if (carBrand.id !== null){
            setListBrand(carBrand);
        }
    }


    const handleCreateModel = event =>{
        setShowCreate(false);

        const model = {
            id:null,
            name:newModelName,
            carBrand:{
                id:newModelBrandId,
                name:null
            }
        }
        if (model.carBrand.id != ""){
            createModel(model);
        }


        setNewModelName("");
        event.preventDefault();
    }

    async function createModel(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carModel/addCarModel",{
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

        const model = await response.json();
        if (model.id !== null){
            setAddedModel(model.id)
        }
    }

    const handleEditModel = event =>{
        const model = {
            id:editModelId,
            name:editModelName,
            carBrand: {
                id:editModelBrandId,
                name:null
            }
        };

        if (model.carBrand.id != ""){
            editModel(model);
        }


        setEditModelId(0);
        setEditModelName("");
        setShowEdit(false);
        event.preventDefault();
    }

    async function editModel(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carModel/saveCarModel",{
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

        const model = await response.json();
        if (model.id !== null){
            setAddedModel(1)
        }
    }

    const handleDeleteModel = event =>{
        const model = {
            id:deleteModelId,
            name:null,
            carBrand:{
                id:null,
                name:null
            }
        };

        deleteModel(model);

        setShowDelete(false);
        event.preventDefault();
    }

    async function deleteModel(data){
        console.log(data)
        const response = await fetch("http://localhost:8081/api/carModel/deleteCarModel",{
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

        const model = await response.json();
        if (model.id !== null){
            setAddedModel(1)
        }
    }

    function findModel(id){
        let model = null;
        for (let i =0;i<listModel.length;i++){
            if (listModel[i].id == id){
                model = listModel[i]
            }
        }

        return model;
    }
    function findBrand(id){
        let brand = null;
        for (let i =0;i<listBrand.length;i++){
            if (listBrand[i].id == id){
                brand = listBrand[i]
            }
        }

        return brand;
    }


    return(<div className="mt-5">
        <Container>
            <Row className="justify-content-center">
                <Button variant="primary" onClick={handleShowCreate}>Create Model</Button>

                <Modal show={showCreate} onHide={handleCloseCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Model</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleCreateModel}>
                        <Modal.Body>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Model Name</Form.Label>
                                <Form.Control type="text" placeholder="Model" value={newModelName} onChange={handleChangeNewModelName}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicBrand">
                                <Form.Control as="select" value={newModelBrandId} onChange={handleChangeNewModelBrandID}>
                                    <option value="">Choose Brand</option>
                                    {listBrand?.map((row)=>(
                                        <option value={row.id}>{row.name}</option>
                                    ))}
                                </Form.Control>
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
                        <th>Brand</th>
                        <th>Model Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {listModel?.map((row,index)=>(
                        <tr>
                            <td>{index}</td>
                            <td>{row.id}</td>
                            <td>{row.carBrand.name}</td>
                            <td>{row.name}</td>
                            <td>
                                <Button variant="light" onClick={handleShowEdit} data-modelId={row.id}>Edit</Button>
                                <span style={{visibility:"hidden"}}>probel</span>
                                <Button variant="secondary" onClick={handleShowDelete} data-modelId={row.id} >Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>


            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Car Model</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleEditModel}>
                    <Modal.Body>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Model Name</Form.Label>
                            <Form.Control type="text" placeholder="Model" value={editModelName} onChange={handleChangeEditModelName}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicBrand">
                            <Form.Control as="select" value={editModelBrandId} onChange={handleChangeEditModelBrandId}>
                                <option value="">Choose Brand</option>
                                {listBrand?.map((row)=>(
                                    <option value={row.id}>{row.name}</option>
                                ))}
                            </Form.Control>
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
                    <Modal.Title>Delete Model</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleDeleteModel}>
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

export default Model;