import React from 'react'

import Section from '../components/Section'
import SectionDescription from '../components/SectionDescription'
import SectionHeader from './SectionHeader'
import Link from '../components/Link'

const AboutColumn = ({ title, children }) => (
  <>
    <div className="about-column-container">
      <h3>{title}</h3>
      {children}
    </div>

    <style jsx>{`
      .about-column-container {
        width: 90px;
      }
      .about-column-container h3 {
        margin-bottom: 5px;
        font-size: 0.877rem;
      }
    `}</style>
  </>
)

const PlayerMapStats = () => (
  <Section>
    <SectionHeader>FACEIT Official Resources</SectionHeader>
    <SectionDescription description="Get in touch with FACEIT faster thru their official channels" />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <AboutColumn title="Faceit Discord">
        <Link
          href="https://discord.gg/faceit"
          title="Official Faceit Discord "
          text="Discord"
          img="./discord.png"
        />
      </AboutColumn>
      <AboutColumn title="Send a ticket ">
        <Link
          href="https://support.faceit.com/hc/en-us/requests/new"
          title="Send a Faceit Ticket "
          text="Send a ticket"
          img="./faceit.png"
        />
      </AboutColumn>
      <AboutColumn title="Orgs Discord">
        <Link
          href="https://discord.gg/faceitcreators"
          title="Creators Discord "
          text="Discord"
          img="./discord.png"
        />
      </AboutColumn>
    </div>
  </Section>
)

export default PlayerMapStats
