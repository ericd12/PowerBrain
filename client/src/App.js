import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "@atlaskit/css-reset";
import "bootstrap/dist/css/bootstrap.min.css";

import NavbarMain from "./components/NavbarMain";

import CreateElement from "./components/Elements/CreateElement";
import ManageElement from "./components/Elements/ManageElement";
import ElementsTable from "./components/Elements/ElementsTable";

import CreateFormat from "./components/Elements/DropdownItems/Formats/CreateFormat";
import ManageFormat from "./components/Elements/DropdownItems/Formats/ManageFormat";

import CreateCategory from "./components/Elements/DropdownItems/Categories/CreateCategory";
import ManageCategory from "./components/Elements/DropdownItems/Categories/ManageCategory";

import CreateMarket from "./components/Elements/DropdownItems/Markets/CreateMarket";
import ManageMarket from "./components/Elements/DropdownItems/Markets/ManageMarket";

import CreateTrack from "./components/Tracks/CreateTrack";
import ManageTrack from "./components/Tracks/ManageTrack";
import TracksTable from "./components/Tracks/TracksTable";

import CreateProgram from "./components/Programs/CreateProgram";
import ManageProgram from "./components/Programs/ManageProgram";
import ProgramsTable from "./components/Programs/ProgramsTable";

const App = () => {
  return (
    <Router>
      <div id="App">
        <NavbarMain />
        <br />
        <Route component={ElementsTable} exact path="/-elements" />
        <Route component={CreateElement} exact path="/-elements/create" />
        <Route component={ManageElement} exact path="/-elements/edit/:id" />

        <Route component={CreateFormat} exact path="/-formats" />
        <Route component={ManageFormat} exact path="/-formats/edit/:id" />

        <Route component={CreateCategory} exact path="/-categories" />
        <Route component={ManageCategory} exact path="/-categories/edit/:id" />

        <Route component={CreateMarket} exact path="/-markets" />
        <Route component={ManageMarket} exact path="/-markets/edit/:id" />

        <Route component={TracksTable} exact path="/-tracks" />
        <Route component={CreateTrack} exact path="/-tracks/create" />
        <Route component={ManageTrack} exact path="/-tracks/edit/:id" />

        <Route component={ProgramsTable} exact path="/-programs" />
        <Route component={CreateProgram} exact path="/-programs/create" />
        <Route component={ManageProgram} exact path="/-programs/edit/:id" />
      </div>
    </Router>
  );
};

export default App;
