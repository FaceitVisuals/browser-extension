/* eslint-disable react/no-danger */
import React from 'dom-chef'

const reqSkillLevel = require.context('../../containers/skill-levels', false, /\.svg$/)

export default ({ level, size = 32, style = {} }) => (
  <span
    title={`Skill Level ${level}`}
    style={{ width: size, height: size, display: 'inline-block', ...style }}
    dangerouslySetInnerHTML={{ __html: reqSkillLevel(`./${level}.svg`) }}
  />
)
