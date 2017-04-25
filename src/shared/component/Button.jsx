// @flow

import React from 'react'

type Props = {
  label: string,
  handleClick: Function
}

const Button = ({ label, handleClick }: Props) =>
  <button
    className="btn btn-primary"
    type="button"
    role="button"
    onClick={handleClick}
  >
    {label}
  </button>

export default Button
