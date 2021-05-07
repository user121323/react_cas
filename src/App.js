import logo from './logo.svg';
import './App.css';
import Header from "./Items/Header";
import PaginationItem from "./Items/Pagination";
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Login from "./Items/Login";
import Registration from "./Items/Registration";
import Car from "./Items/Car";
import AdminManage from "./Items/AdminManage";
import CarSpareParts from "./Items/CarSpareParts";

function App() {


  return (<div>
          <BrowserRouter>
              <Header />

              <Route exact path="/signin">
                  <Login/>
              </Route>

              <Route exact path ="/signup">
                  <Registration/>
              </Route>

              <Route exact path="/">
                  <Car/>
              </Route>


              <Route exact path="/spareparts">
                  <CarSpareParts/>
              </Route>

              <Route path="/api/admin">
                  <AdminManage />
              </Route>


          </BrowserRouter>

      </div>
  );
}

export default App;
