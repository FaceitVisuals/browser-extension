import React from "react";
import PropTypes from "prop-types";


const ButtonTint = ({ className, divClassName, text = "Request Physical Card", link }) => {
  return (
    <a href={link} className={`button-tint ${className}`}>
      <div className={`request-physical ${divClassName}`}>{text}</div>
    </a>
  );
};

ButtonTint.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
};

export const Index = () => {
  return (
    <div className="index">
      <div className="div">
        <div className="line" />
        <div className="account-card-because">
          <div className="frame">
            <div className="header">
              <div className="frame-wrapper">
                <div className="div-wrapper">
                  <div className="text-wrapper">FACEIT VISUALS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ButtonTint
          className="button-tint-instance"
          divClassName="design-component-instance-node"
          text="CLAN 100k FP"
          link="https://example.com/clan"
        />
        <ButtonTint
          className="button-tint-2"
          divClassName="button-tint-3"
          text="1v1 Hub"
          link="https://example.com/1v1hub"
        />
        <div className="overlap-group">
          <div className="header-2">
            <div className="frame-2" />
          </div>
          <div className="text-wrapper-2">For the players</div>
          <p className="p">For Ideas, Feature Requests, or Tournament Advertisement , Add or Leave a DM.</p>
        </div>
        <div className="text-wrapper-3">About</div>
        <p className="text-wrapper-4">
          Use 'shadi3' or 'shadi12' For additional 10% discount when buying ESEA 3 months or 12.
        </p>
        <ButtonTint
          className="button-tint-4"
          divClassName="button-tint-3"
          text="Donate to"
          link="https://example.com/donate"
        />
        <ButtonTint
          className="button-tint-5"
          divClassName="button-tint-3"
          text="Socials"
          link="https://example.com/socials"
        />
        <ButtonTint
          className="button-tint-6"
          divClassName="button-tint-3"
          text="Reach out"
          link="https://example.com/reachout"
        />
        <ButtonTint
          className="button-tint-7"
          divClassName="button-tint-3"
          text="Creator"
          link="https://example.com/creator"
        />
        <div className="text-wrapper-5">Discount Codes:</div>
      </div>
    </div>
  );
};
