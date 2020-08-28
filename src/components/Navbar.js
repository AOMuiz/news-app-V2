import React from "react";

function Navbar() {
  return (
    <header>
      <div className='topnav'>
        <a className='active' href='#home'>
          The News Inquirer
        </a>
        <a href='#home'>Home</a>
        <a href='#searchtopic'>Search Topic</a>
      </div>
    </header>
  );
}

export default Navbar;
