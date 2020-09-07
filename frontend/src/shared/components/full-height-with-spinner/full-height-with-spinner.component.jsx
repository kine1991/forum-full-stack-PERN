import React from 'react';


import { FullHeightWithSpinnerContainer } from './full-height-with-spinner.styles';
import { Loader } from 'semantic-ui-react';

const FullHeightWithSpinner = () => {
  return (
    <FullHeightWithSpinnerContainer>
      <Loader active />
    </FullHeightWithSpinnerContainer>
  )
}

export default FullHeightWithSpinner;