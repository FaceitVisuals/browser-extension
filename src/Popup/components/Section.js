/* eslint react/react-in-jsx-scope: 0 */
import React from 'react'

const Section = ({ children }) => (
  <>
    <section>{children}</section>

    <style jsx>{`
      section {
        display: flex;
        flex-direction: column;
        padding: 15px 20px;
        border-bottom: 1px solid #303030;
      }

      section:last-of-type {
        border: none;
      }
    `}</style>
  </>
)

export default Section
