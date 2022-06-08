import React, {useState, useEffect} from "react";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../api/api";
import SearchForm  from "../common/SearchForm";


function CompanyList(){
    // need to get all company information
    // loope over Companies to add CompanyCards
    const [companies, setCompanies] = useState(null);

    async function search(name){
        let companies_local = await JoblyApi.getCompanies(name);
        setCompanies(companies_local);
    }

    useEffect(function getCompaniesOnMount(){
        search();
    }, [])

    if (!companies) return <LoadingSpinner/>;

    return (
      <div className="CompanyList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {companies.length
            ? (
                <div className="CompanyList-list">
                  {companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
  );
}

export default CompanyList;