import React from 'react'
import Pagination from 'react-bootstrap-4-pagination';
import {Link, useNavigate,  useLocation} from 'react-router-dom'

function Paginate (props) {

    let {page, pages, isAdmin} = props;
    let currentLocation = window.location;
    console.log("currentLocation", currentLocation)

    const location = useLocation();
    const navigate = useNavigate();
    console.log("location", location)
    if(location.search==="")
    navigate("\?page=1");
   

    let paginationConfig = {
        totalPages: pages,
        currentPage: page,
        showMax: pages-1,
        size: "md",
        threeDots: false,
        prevNext: false,
        href: `${currentLocation.origin}${location.search.substring(0, location.search.length - 1)}*`, // * will be replaced by the page number
        pageOneHref: currentLocation.origin,
        
        disabledColor: 'green',
        circle: false,
        shadow: false
      };

   

    return (
pages > 1 && (
    <Pagination  {...paginationConfig}>
       
    </Pagination>
)
    )
}

export default Paginate
