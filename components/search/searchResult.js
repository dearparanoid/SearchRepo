import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import isEmpty from 'lodash/isEmpty';

import { colors, typography } from '../theme/common_var';
import { fadeIn } from '../theme/animation';

const _ = {
  isEmpty,
}

const Container = styled(Flex)``;

const RepoWrapper = styled(Flex)`
  width: 80%;
  margin: 0.5em;
  animation: ${fadeIn} 1s linear;
`;


const RepoTitle = styled.div`
  color: ${colors.gray.grayA4};
  font-size: ${typography.font.size.larger};
`;

const SearchResult = ({ parentState }) => {
  console.log(parentState.items);

  return _.isEmpty(parentState.items) ?
    <Container center column full>Wait....</Container> :
    <Container center column full>
      {parentState.items.map(item => (
        <RepoWrapper key={item.id} justifyStart alignCenter>
          <RepoTitle>{item.name}</RepoTitle>
        </RepoWrapper>
      ))}
    </Container>
}

export default SearchResult;
