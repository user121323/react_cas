import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import * as path from "path";
import Cookies from "js-cookie";
import SparePartsCard from "./SparePartsCard";
import {Form} from "react-bootstrap";

function SearchFilter(){
    const history = useHistory();


    const jwtToken = Cookies.get("JwtToken");
    const bearer= "Bearer "+jwtToken;


    const [listBrand, setListBrand] = useState(null);
    const [listModel, setListModel] = useState(null);
    const [listCarSpare, setListCarSpare] = useState(null);


    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState(null);

    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);
    const [isNew, setNew] = useState(null);


    const handleChangeBrand = event =>{
        setBrand(event.target.value);

        if (event.target.value != "Choose"){
            loadModels(event.target.value);
        } else{
            setListModel(null)
        }

    }
    const handleChangeModel = event =>{
        setModel(event.target.value);
    }
    const handleChangePriceFrom = event =>{
        setPriceFrom(event.target.value);
    }
    const handleChangePriceTo = event =>{
        setPriceTo(event.target.value);
    }
    const handleChangeIsNew = event =>{
        setNew(event.target.value == "yes");
    }


    useEffect(()=>{
        loadData();
    }, []);

    async function loadData(){
        const responseBrand = await fetch("http://localhost:8081/api/carBrand/getAllCarBrand",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const carBrand = await responseBrand.json();
        if (carBrand.id !== null){
            setListBrand(carBrand);
        }

    }

    async function loadModels(brandId){
        const responseModel = await fetch("http://localhost:8081/api/carModel/getAllCarModelByBrand/"+brandId,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const carModel = await responseModel.json();
        if (carModel.id !== null){
            setListModel(carModel);
        }
    }


    const handleSubmitSearch = event =>{

        let pTo = priceTo
        let pFrom = priceFrom
        if (priceFrom == ""){
            pFrom = 0
            setPriceFrom(0)
        }
        if (priceTo == ""){
            pTo = 0
            setPriceTo(0)
        }

        const carSparePart = {

            id:null,
            name:null,
            carBrand:{
                id:brand,
                name:null
            },
            carModel:{
                id:model,
                name:null
            },
            new:isNew,
            description:null,
            price:pFrom
        }


        loadCarSpareParts(carSparePart,pTo);
        event.preventDefault();
    }

    async function loadCarSpareParts(data, pTo){

        const response = await fetch("http://localhost:8081/api/carSpareParts/getAllCarSpareByPoints/"+pTo,{
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

        const body = await response.json();

        setListCarSpare(body)
    }

    function renderCarSpares(){
        if (listCarSpare != null){

        }
        return <div></div>
    }

    return(<div>
        <div className="filter container mt-5">
            <form onSubmit={handleSubmitSearch}>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">

                                <div className="col">
                                    <div className="form-group">
                                        <h6>Car Brand</h6>
                                        <select className="custom-select mr-sm-2" name="country_origin"
                                                id="car_brand_id" value={brand} onChange={handleChangeBrand}>
                                            <option value={null}>Choose</option>
                                            {listBrand!=null?listBrand?.map(row=>(
                                                <option value={row.id}>{row.name}</option>
                                            )):"null"}
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <h6>Car Model</h6>
                                        <select className="custom-select mr-sm-2" name="country_origin"
                                                id="car_model_id" value={model} onChange={handleChangeModel}>
                                            <option value={null}>Choose</option>
                                            {listModel!=null?listModel?.map(row=>(
                                                <option value={row.id}>{row.name}</option>
                                            )):"null"}
                                        </select>
                                    </div>
                                </div>




                            </div>


                            <div className="col-md-4">
                                <div className="form-group">
                                    <h6>Price</h6>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="price_from"><span className="text-muted">From</span></label>
                                            <input className="form-control" type="number" id="price_from"
                                                   placeholder="from" value={priceFrom} onChange={handleChangePriceFrom}/>
                                        </div>

                                        <div className="col">
                                            <label htmlFor="price_to"><span className="text-muted">To</span></label>
                                            <input className="form-control" type="number" id="price_to"
                                                   placeholder="to" value={priceTo} onChange={handleChangePriceTo}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <h6>Status</h6>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="exampleRadios"
                                                               id="exampleRadios1" value="yes" onChange={handleChangeIsNew}/>
                                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                                            New
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="exampleRadios"
                                                               id="exampleRadios2" value="no" onChange={handleChangeIsNew}/>
                                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                                            Old
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>



        {listCarSpare?.map((row)=>(
            <SparePartsCard carspare={row}/>
        ))}
    </div>)
}

export default SearchFilter;