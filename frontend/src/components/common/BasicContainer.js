import React from 'react'
import {Container} from '@material-ui/core'

export const BasicContainer = ({extraCssClass, children}) => {

  return (
    <Container maxWidth="false"
      className={`basic-container ${extraCssClass ? extraCssClass : ''}`}>
      {children}
    </Container>
  );
}
