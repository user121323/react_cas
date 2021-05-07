import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import * as path from "path";
import Cookies from "js-cookie";

function Car(){
    const history = useHistory();


    const jwtToken = Cookies.get("JwtToken");
    const bearer= "Bearer "+jwtToken;


    const [listCountry, setListCountry] = useState(null);
    const [listBodyWork, setListBodyWork] = useState(null);
    const [listEngine, setListEngine] = useState(null);
    const [listTransmission, setListTransmission] = useState(null);
    const [listSteeringWheel, setListSteeringWheel] = useState(null);
    const [listDrive, setListDrive] = useState(null);
    const [listColor, setListColor] = useState(null);

    const [listRegion, setListRegion] = useState(null);
    const [listBrand, setListBrand] = useState(null);
    const [listModel, setListModel] = useState(null);


    const [region, setRegion] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [countryOrigin, setCountryOrigin] = useState("");
    const [bodyWork, setBodyWork] = useState("");
    const [engine, setEngine] = useState("");
    const [transmission, setTransmission] = useState("");
    const [steeringWheel, setSteeringWheel] = useState("");
    const [drive, setDrive] = useState("");
    const [mileage, setMileage] = useState(0);
    const [engineCapacityFrom, setEngineCapacityFrom] = useState(0.00);
    const [engineCapacityTo, setEngineCapacityTo] = useState(0.00);
    const [color, setColor] = useState("");
    const [releaseYearFrom, setReleaseYearFrom] = useState(0);
    const [releaseYearTo, setReleaseYearTo] = useState(0);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);
    const [isNew, setNew] = useState(false);




    const handleChangeRegion = event =>{
        setRegion(event.target.value);
    }
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
    const handleChangeCountryOrigin = event =>{
        setCountryOrigin(event.target.value);
    }
    const handleChangeBodyWork = event =>{
        setBodyWork(event.target.value);
    }
    const handleChangeEngine = event =>{
        setEngine(event.target.value);
    }
    const handleChangeTransmission = event =>{
        setTransmission(event.target.value);
    }
    const handleChangeSteeringWheel = event =>{
        setSteeringWheel(event.target.value);
    }
    const handleChangeDrive = event =>{
        setDrive(event.target.value);
    }
    const handleChangeMileage = event =>{
        setMileage(event.target.value);
    }
    const handleChangeEngineCapacityFrom = event =>{
        setEngineCapacityFrom(event.target.value);
    }
    const handleChangeEngineCapacityTo = event =>{
        setEngineCapacityTo(event.target.value);
    }
    const handleChangeColor = event =>{
        setColor(event.target.value);
    }
    const handleChangeReleaseYearFrom = event =>{
        setReleaseYearFrom(event.target.value);
    }
    const handleChangeReleaseYearTo = event =>{
        setReleaseYearTo(event.target.value);
    }
    const handleChangePriceFrom = event =>{
        setPriceFrom(event.target.value);
    }
    const handleChangePriceTo = event =>{
        setPriceTo(event.target.value);
    }
    const handleChangeIsNew = event =>{
        setNew(event.target.value);
    }


    useEffect(()=>{
        loadData();
    }, []);

    async function loadData(){
        const responseBody = await fetch("http://localhost:8081/api/carBody/getAllCarBody",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const carBody = await responseBody.json();
        if (carBody.id !== null){
            setListBodyWork(carBody);
        }


        const responseCountryOrigin = await fetch("http://localhost:8081/api/carCountryOrigin/getAllCarCountryOrigin",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const countryOrigin = await responseCountryOrigin.json();
        if (countryOrigin.id !== null){
            setListCountry(countryOrigin);
        }




        const responseEngine = await fetch("http://localhost:8081/api/carEngine/getAllCarEngine",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const carEngine = await responseEngine.json();
        if (carEngine.id !== null){
            setListEngine(carEngine);
        }



        const responseTransmission = await fetch("http://localhost:8081/api/carTransmission/getAllCarTransmission",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const carTransmission = await responseTransmission.json();
        if (carTransmission.id !== null){
            setListTransmission(carTransmission);
        }



        const responseSteeringWheel = await fetch("http://localhost:8081/api/carSteeringWheel/getAllCarSteeringWheel",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const carSteeringWheel = await responseSteeringWheel.json();
        if (carSteeringWheel.id !== null){
            setListSteeringWheel(carSteeringWheel);
        }



        const responseDrive = await fetch("http://localhost:8081/api/carDrive/getAllCarDrive",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const carDrive = await responseDrive.json();
        if (carDrive.id !== null){
            setListDrive(carDrive);
        }



        const responseColor = await fetch("http://localhost:8081/api/carColor/getAllCarColor",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const carColor = await responseColor.json();
        if (carColor.id !== null){
            setListColor(carColor);
        }



        const responseRegion = await fetch("http://localhost:8081/api/carRegion/getAllCarRegion",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const carRegion = await responseRegion.json();
        if (carRegion.id !== null){
            setListRegion(carRegion);
        }



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


    return(<div>
        <div className="filter container mt-5">
            <form action="#">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Where to Search (Region)</h6>
                                            <select className="custom-select mr-sm-2" name="country_origin"
                                                    id="region_id" value={region} onChange={handleChangeRegion}>
                                                <option value={null}>Choose</option>
                                                {listRegion!=null?listRegion?.map(row=>(
                                                    <option value={row.id}>{row.name}</option>
                                                )):"null"}
                                            </select>
                                        </div>
                                    </div>
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
                                                    id="car_model_id">
                                                <option value={null}>Choose</option>
                                                {listModel!=null?listModel?.map(row=>(
                                                    <option value={row.id}>{row.name}</option>
                                                )):"null"}
                                            </select>
                                        </div>
                                    </div>
                                </div>




                                <div className="advanced_search">
                                    <h6>Advanced Details</h6>

                                    <div className="advanced_search_items">
                                        <div className="row1">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="country_origin_id">Country of Origin</label>
                                                        <select className="custom-select mr-sm-2" name="country_origin"
                                                                id="country_origin_id">
                                                            <option value={null}>Choose</option>
                                                            {listCountry!=null?listCountry?.map(row=>(
                                                                <option value={row.id}>{row.name}</option>
                                                            )):"null"}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="body_id">Bodywork</label>
                                                        <select className="custom-select mr-sm-2" name="country_origin"
                                                                id="body_id">
                                                            <option value={null}>Choose</option>

                                                            {listBodyWork!=null?listBodyWork?.map(row=>(
                                                                <option value={row.id}>{row.name}</option>
                                                            )):"null"}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="engine_id">Engine Type</label>
                                                        <select className="custom-select mr-sm-2" name="country_origin"
                                                                id="engine_id">
                                                            <option value={null}>Choose</option>

                                                            {listEngine!=null?listEngine?.map(row=>(
                                                                <option value={row.id}>{row.name}</option>
                                                            )):"null"}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row2">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="transmission_id">Transmission</label>
                                                        <select className="custom-select mr-sm-2" name="country_origin"
                                                                id="transmission_id">
                                                            <option value={null}>Choose</option>
                                                            {listTransmission!=null?listTransmission?.map(row=>(
                                                                <option value={row.id}>{row.name}</option>
                                                            )):"nu;;"}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="steering_wheel_id">Steering wheel position</label>
                                                        <select className="custom-select mr-sm-2" name="country_origin"
                                                                id="steering_wheel_id">
                                                            <option value={null}>Choose</option>
                                                            {listSteeringWheel!=null?listSteeringWheel?.map(row=>(
                                                                <option value={row.id}>{row.name}</option>
                                                            )):"null"}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="drive_id">Drive</label>
                                                        <select className="custom-select mr-sm-2" name="country_origin"
                                                                id="drive_id">
                                                            <option value={null}>Choose</option>
                                                            {listDrive!=null?listDrive?.map(row=>(
                                                                <option value={row.id}>{row.name}</option>
                                                            )):"null"}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row3">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="mileage">Mileage not more than(km)</label>
                                                        <input type="number" className="form-control" id="mileage"
                                                        value={mileage} onChange={handleChangeMileage}/>
                                                    </div>

                                                </div>

                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="engine_capacity">Engine capacity(litr)</label>
                                                        <div className="row" id="engine_capacity">
                                                            <div className="col">
                                                                <label htmlFor="engineCapacityFrom"><span className="text-muted">From</span></label>
                                                                <input type="number" className="form-control" id="engineCapacityFrom"
                                                                       placeholder="from" value={engineCapacityFrom} onChange={handleChangeEngineCapacityFrom}/>
                                                            </div>
                                                            <div className="col">
                                                                <label htmlFor="engineCapacityTo"><span className="text-muted">To</span></label>
                                                                <input type="number" className="form-control" id="engineCapacityTo"
                                                                       placeholder="to" value={engineCapacityTo} onChange={handleChangeEngineCapacityTo}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="color">Color</label>
                                                        <select className="custom-select mr-sm-2" id="color">
                                                            {listColor?.map(row=>(
                                                                <option value={row.id}>{row.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <h6>Year of Release</h6>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="release_year_from"><span className="text-muted">From</span></label>
                                            <input className="form-control" type="number" id="release_year_from"
                                                   max="9999" placeholder="from" value={releaseYearFrom} onChange={releaseYearFrom}/>
                                        </div>

                                        <div className="col">
                                            <label htmlFor="release_year_to"><span className="text-muted">To</span></label>
                                            <input className="form-control" type="number" id="release_year_to"
                                                   max="9999" placeholder="to" value={releaseYearTo} onChange={releaseYearTo} />
                                        </div>
                                    </div>
                                </div>


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
    </div>)
}

export default Car;