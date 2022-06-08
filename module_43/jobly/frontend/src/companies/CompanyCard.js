import React from "react";
import {Link} from "react-router-dom";
// company card will be rendered within a company list
// which will pass down as props all information needed about the company
function CompanyCard({name, description, logoUrl, handle}){
    // display company data in a card-structure.
    return (
        <Link className="CompanyCard card" to={`/companies/${handle}`}>
            <div className="card-body">
                <h6 className="card-title">
                    {name}
                    {logoUrl && <img src={logoUrl}
                        alt={name}
                        className="float-right ml-5" />}
                </h6>
                <p><small>{description}</small></p>
            </div>
        </Link>
    )
}

export default CompanyCard;