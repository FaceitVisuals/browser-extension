/* eslint react/react-in-jsx-scope: 0 */
import React from 'react'

const SectionDescription = ({ description }) => (
  <>
    <p>{description}</p>

    <style jsx>{`
      p {
        color: #a0a0a0;
        margin-bottom: 8px;
        font-size: 0.75rem;
      }
    `}</style>
  </>
)

export default SectionDescription
