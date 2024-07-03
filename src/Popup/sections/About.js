/* eslint react/react-in-jsx-scope: 0 */
import React from 'react'
import Link from '../components/Link'
import Section from '../components/Section'
import SectionDescription from '../components/SectionDescription'
import SectionHeader from '../components/SectionHeader'

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

const About = () => (
  <Section>
    <SectionHeader title="About" />
    <SectionDescription description="Donators will get a special VIP  badge(Link ur faceit profile)" />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <AboutColumn title="Donate To">
        <Link
          href="https://streamelements.com/shadi_gm/tip"
          title="Donators will get a special VIP Badge "
          text="donate"
          img="./donate.png"
        />
        <Link
          href="https://faceit.shadi.dev"
          title="Web Badges"
          img="./web.png"
        />
      </AboutColumn>
      <AboutColumn title="Reach Out">
        <Link
          href="https://discord.gg/ngYHDcQfNm"
          title="FACEIT VisualsDiscord"
          text="Discord"
          img="discord.png"
        />
      </AboutColumn>
      <AboutColumn title="Join our Clan">
        <Link
          href="https://www.faceit.com/en/inv/xb7l4wE"
          title="Clan"
          text="shadi"
          img="./faceit.png"
        />
      </AboutColumn>
      <AboutColumn title="Creator">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link
            href="https://steamcommunity.com/id/ShaDyFlo/"
            title="Creator"
            text="shadi"
            img="./faceit.png"
          />
        </div>
      </AboutColumn>
    </div>
    <SectionDescription description="version: 3.4.6" />
  </Section>
)

export default About
