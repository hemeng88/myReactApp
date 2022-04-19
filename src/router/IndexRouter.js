import React from "react"
import {HashRouter, Route} from "react-router-dom";
import Login from '../views/login/Login'
import NewsSandBox from "../views/sandbox/NewsSandBox";
import {Routes} from "react-router";

export default function IndexRouter() {
    return (<HashRouter>
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="*" element={<NewsSandBox />}></Route>
        </Routes>
    </HashRouter>)
}