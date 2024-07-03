import React from 'react'

const Header = () => (
  <header>
    <img src="./logof.png" alt="FACEITVisuals Logo" />
    <h1>Faceit Visuals</h1>

    <style jsx>{`
      header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 15px 0px;
        border-bottom: 1px solid #303030;
      }

      header > img {
        min-height: 48px;
        height: 48px;
      }

      header > h1 {
        margin-top: 10px;
        font-size: 1.5rem;
      }
    `}</style>
  </header>
)

export default Header
