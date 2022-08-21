import React from "react";
import Container from 'react-bootstrap/Container';
import NavigationMenu from './NavigationMenu';
import {
    Routes,
    Route
  } from "react-router-dom";

import AddExpense from "./components/addexpense/AddExpense";
import Expenses from "./components/expense/Expenses";

const App = () => {
    return (
        <>
        <NavigationMenu />
        <Container>
            <Routes>
            <Route path="/home" element={<Expenses category={"items"} />} />
            <Route path="/add" element={<AddExpense  />} />
            </Routes>
        </Container>
        </>
    );
};

export default App;