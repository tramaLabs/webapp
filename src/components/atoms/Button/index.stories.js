import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Button } from 'components'

storiesOf('Button', module)
  .add('default', () => (
    <Button>Hello</Button>
  ))
  .add('reverse', () => (
    <Button reverse>Hello</Button>
  ))
  .add('another color', () => (
    <Button color="secondary">Hello</Button>
  ))
  .add('disabled', () => (
    <Button disabled>Hello</Button>
  ))
  .add('transparent', () => (
    <Button transparent>Hello</Button>
  ))
  .add('height', () => (
    <Button height={100}>Hello</Button>
  ))
  .add('loading', () => (
    <Button loading>Hello</Button>
  ))
  .add('link', () => (
    <Button href="https://github.com/diegohaz/arc">ARc repository</Button>
  ))
