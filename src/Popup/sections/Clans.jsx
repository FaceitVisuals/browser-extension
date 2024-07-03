import React from 'react'




const AboutColumn = ({ title, children }) => (
  <React.Fragment>
    <div className="about-column-container">
      <h3>{title}</h3>
      {children}
    </div>
    <style jsx>{`
      .about-rows-container {
        width: 90%;
      }
      .about-column-container {
        width: 25%; /* Adjust the width of the columns */
        padding: 0 10px; /* Add padding for spacing */
      }
      .about-column-container h3 {
        color: white;
        margin-bottom: 10px;
        font-size: 1rem;
      }
    `}</style>
  </React.Fragment>
)

const About = () => (
  <Section>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <AboutColumn title="CLAN">
          <Link
            url="https://www.faceit.com/en/inv/xb7l4wE"
            title="Join our Faceit Clan"
            text="Clan"
            img="./faceit.png"
            imgStyle={{ width: '80px', height: '80px' }}
          />
        </AboutColumn>
        <AboutColumn title="Website">
          <Link
            url="https://faceit.shadi.dev"
            title="Visit the web for badges"
            text="Web"
            img="./faceit.png"
            imgStyle={{ width: '80px', height: '80px' }}
          />
        </AboutColumn>
        <AboutColumn title="Buy a coffee">
          <Link
            url="https://www.paypal.com/paypalme/outlawzcsnet"
            title="Leave your faceit profile name or link for a gift :)"
            text="Donate"
            img="./paypal.png"
            imgStyle={{ width: '80px', height: '80px' }}
          />
        </AboutColumn>

        <AboutColumn title="Creator">
          <Link
            url="https://twitter.com/shadigm_"
            title="Twitter"
            img="./twitter.png"
            imgStyle={{ width: '80px', height: '80px' }}
          />
        </AboutColumn>
      </div>
    </div>
  </Section>
)

export default About
