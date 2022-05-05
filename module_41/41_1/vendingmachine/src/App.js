import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import VendingMachine from "./VendingMachine";
import Icecream from "./Icecream";
import Chips from "./Chips";
import Soda from "./Soda";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <VendingMachine />
        </Route>
        <Route path="/soda" exact>
          <Soda />
        </Route>
        <Route path="/chips" exact>
          <Chips />
        </Route>
        <Route path="/icecream" exact>
          <Icecream />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
