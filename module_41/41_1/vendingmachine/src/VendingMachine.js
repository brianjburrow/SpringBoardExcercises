import React from "react";
import { Link } from "react-router-dom";

function VendingMachine() {
  return(
    <div>
        Vending Machine
        <div><Link to='/soda'>Soda</Link></div>
        <div><Link to='/chips'>Chips</Link></div>
        <div><Link to='/icecream'>Icecream</Link></div>
    </div>
  );
}

export default VendingMachine;
