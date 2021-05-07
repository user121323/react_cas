import {Button, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";

function CarSparePartsAdmin(){
    const jwtToken = Cookies.get("JwtToken");
    const bearer= "Bearer "+jwtToken;
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);


    const handleShowEdit = event => {
        setShowEdit(true);
        const spareId = event.target.getAttribute("data-spareId")
        setEditSpareId(spareId)
        const spare = findSpare(spareId);
        setEditSpareName(spare.name)
        setEditSpareBrandId(spare.carBrand.id);
        setEditSpareModelId(spare.carModel.id);
        setEditSpareDescription(spare.description);
        setEditSparePrice(spare.price);
        setEditSpareIsNew(spare.new);
    }
    const handleShowDelete = event => {
        setShowDelete(true);
        const spareId = event.target.getAttribute("data-spareId")
        setDeleteSpareId(spareId)
    }

    const [listSpare, setListSpare] = useState(null);
    const [listBrand, setListBrand] = useState(null);
    const [listModel, setListModel] = useState(null);


    const [editSpareName, setEditSpareName] = useState("");
    const [editSpareId, setEditSpareId] = useState("");
    const [editSpareBrandId, setEditSpareBrandId] = useState("");
    const [editSpareModelId, setEditSpareModelId] = useState("");
    const [editSpareDescription, setEditSpareDescription] = useState("");
    const [editSparePrice, setEditSparePrice] = useState("");
    const [editSpareIsNew, setEditSpareIsNew] = useState("");

    const [deleteSpareId, setDeleteSpareId] = useState("");

    const handleChangeEditSpareName = event =>{
        setEditSpareName(event.target.value);
    }
    const handleChangeEditSpareBrandId = event =>{
        setEditSpareBrandId(event.target.value);
        loadModels(event.target.value);

    }
    const handleChangeEditSpareModelId = event =>{
        setEditSpareModelId(event.target.value);
    }
    const handleChangeEditSpareDescription = event =>{
        setEditSpareDescription(event.target.value);
    }
    const handleChangeEditSparePrice = event =>{
        setEditSparePrice(event.target.value);
    }
    const handleChangeEditSpareIsNew = event =>{
        setEditSpareIsNew(event.target.value);
    }

    const [changedSpare, setChangedSpare] = useState(0);

    useEffect(()=>{
        loadData();
    }, [changedSpare]);


    async function loadModels(brandId){
        const responseModel = await fetch("http://localhost:8081/api/carModel/getAllCarModelByBrand/"+brandId,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":bearer
            },
        });
        const carModel = await responseModel.json();
        if (carModel.id !== null){
            setListModel(carModel);
        }

    }

    async function loadData(){
        const responseSpare = await fetch("http://localhost:8081/api/carSpareParts/getAllCarSpareParts",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":bearer
            },
        });
        const carSpare = await responseSpare.json();
        if (carSpare.id !== null){
            setListSpare(carSpare);
        }


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

    const handleEditSpare = event =>{
        const spare = {
            id:editSpareId,
            name:editSpareName,
            carBrand:{
                id:editSpareBrandId,
                name:null
            },
            carModel:{
                id:editSpareModelId,
                name:null
            },
            new:editSpareIsNew,
            description:editSpareDescription,
            price:editSparePrice
        };


        if (spare.carBrand.id != "" && spare.new != ""){
            if (spare.carModel.id ==""){
                spare.carModel.id = null;
            }
            editSpare(spare);
        }



        setEditSpareId(0);
        setEditSpareName("");
        setEditSpareDescription("");
        setEditSpareIsNew("");
        setShowEdit(false);
        event.preventDefault();
    }

    async function editSpare(data){
        const response = await fetch("http://localhost:8081/api/carSpareParts/saveCarSpareParts",{
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
            setChangedSpare(1)
        }
    }

    const handleDeleteBody = event =>{
        const body = {
            id:deleteSpareId,
            name:null
        };

        deleteBody(body);

        setShowDelete(false);
        event.preventDefault();
    }

    async function deleteBody(data){
        const response = await fetch("http://localhost:8081/api/carSpareParts/deleteCarSpareParts",{
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
            setChangedSpare(1)
        }
    }

    function findSpare(id){
        let body = null;
        for (let i =0;i<listSpare.length;i++){
            if (listSpare[i].id == id){
                body = listSpare[i]
            }
        }

        return body;
    }
    function findBrand(id){
        let body = null;
        for (let i =0;i<listSpare.length;i++){
            if (listBrand[i].id == id){
                body = listBrand[i]
            }
        }

        return body;
    }

    return(<div className="mt-5">
        <Container>
            <Row className="mt-5">
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Car Spare Parts name</th>
                        <th>Car Brand</th>
                        <th>Car Model</th>
                        <th>Is New</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {listSpare?.map((row,index)=>(
                        <tr>
                            <td>{index}</td>
                            <td>{row.id?row.id:""}</td>
                            <td>{row.name?row.name:""}</td>
                            <td>{row.carBrand.name?row.carBrand.name:""}</td>
                            <td>{row.carModel?row.carModel.name:""}</td>
                            <td>{row.new?"Yes":"No"}</td>
                            <td>{row.description?row.description:""}</td>
                            <td>{row.price?row.price:""} tg</td>
                            <td>
                                <Button variant="light" onClick={handleShowEdit} data-spareId={row.id}>Edit</Button>
                                <span style={{visibility:"hidden"}}>probel</span>
                                <Button variant="secondary" onClick={handleShowDelete} data-spareId={row.id} >Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>


            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Car Car Spare Parts</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleEditSpare}>
                    <Modal.Body>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Car Spare Parts" value={editSpareName} onChange={handleChangeEditSpareName}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicBrand">
                            <Form.Label>Car Brand</Form.Label>
                            <Form.Control as="select" value={editSpareBrandId} onChange={handleChangeEditSpareBrandId}>
                                <option value="">Choose Brand</option>
                                {listBrand?.map((row)=>(
                                    <option value={row.id}>{row.name} {row.id}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicBrand">
                            <Form.Label>Car Model</Form.Label>
                            <Form.Control as="select" value={editSpareModelId} onChange={handleChangeEditSpareModelId}>
                                <option value="">Choose Model</option>
                                {listModel?.map((row)=>(
                                    <option value={row.id}>{row.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Is New</Form.Label>
                            <Form.Control as="select" value={editSpareIsNew} onChange={handleChangeEditSpareIsNew}>
                                <option value="">Choose</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder="Car Spare Parts" value={editSparePrice} onChange={handleChangeEditSparePrice}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Car Spare Parts" value={editSpareDescription} onChange={handleChangeEditSpareDescription}/>
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
                    <Modal.Title>Delete Car Spare Parts</Modal.Title>
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

export default CarSparePartsAdmin;