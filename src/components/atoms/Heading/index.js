import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

export const fontSize = ({ level }) => `${1 + (1.625 * (1 / level))}rem`

const styles = css`
  font-family: ${font('primary')};
  font-weight: 500;
  font-size: ${fontSize};
  margin: 0;
  margin-top: 0.85714em;
  margin-bottom: 0.57142em;
  color: ${palette({ grayscale: 0 }, 1)};
`

const Heading = styled(({ level, children, reverse, theme, palette, ...props }) => {
  return React.createElement(`h${level}`, props, children)
})`${styles}`

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node,
  palette: PropTypes.string,
  reverse: PropTypes.bool
}

Heading.defaultProps = {
  level: 1,
  palette: 'grayscale'
}

export default Heading
