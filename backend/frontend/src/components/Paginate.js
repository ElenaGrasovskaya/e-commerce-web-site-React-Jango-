import React, { useEffect } from "react";
import Pagination from "react-bootstrap-4-pagination";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Paginate(props) {
  let { page, pages, isAdmin } = props;
  let currentLocation = window.location;
  console.log("currentLocation", currentLocation);

  const location = useLocation();
  const navigate = useNavigate();

  console.log("location", location);

  useEffect(() => {
    if (currentLocation.search === "") {
      navigate(currentLocation.pathname + "?page=1");
    }
  }, [currentLocation.href]);

  let paginationConfig = {
    totalPages: pages,
    currentPage: page,
    showMax: pages - 1,
    size: "md",
    threeDots: false,
    prevNext: false,
    href: `${currentLocation.origin}${
      currentLocation.pathname
    }${location.search.substring(0, location.search.length - 1)}*`, // * will be replaced by the page number
    pageOneHref: currentLocation.origin + currentLocation.pathname,

    disabledColor: "green",
    circle: false,
    shadow: false,
  };

  return pages > 1 && <Pagination {...paginationConfig}></Pagination>;
}

export default Paginate;
