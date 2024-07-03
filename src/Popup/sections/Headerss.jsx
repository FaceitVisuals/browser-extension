import React from "react";



const Header = () => (
  <>
    <header>
      <img src="./logof.png" alt="FACEIT Visuals Logo" />
      <h1>FACEIT Visuals</h1>
    </header>

    <style jsx>{`
      header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2px 0px;
        border-bottom: 1px solid;
      }

      header > img {
        min-height: 80px;
        height: 80px;
      }

      header > h1 {
        margin-top: 10px;
        font-size: 1.5rem;
      }
    `}</style>
  </>
)

export default Header;
