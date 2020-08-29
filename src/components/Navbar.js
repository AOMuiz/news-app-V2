import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className='topnav'>
      <ul>
        <Link to='/news-app-V2'>
          <li className='active' href='#home'>
            The News Inquirer
          </li>
        </Link>
        <Link to='/news-app-V2/latestnews'>
          <li href='#home'>Home</li>
        </Link>
        <Link to='/news-app-V2/search'>
          <li href='#searchtopic'>Search Topic</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
