import React, { Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import isEmpty from 'lodash/isEmpty';

import { colors, typography } from '../theme/common_var';
import { fadeIn } from '../theme/animation';

const _ = {
  isEmpty,
}

const Container = styled(Flex)``;

const RepoWrapper = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items:center;
  width: 80%;
  margin: 0.5em;
  animation: ${fadeIn} 1s linear;
  cursor: pointer;
  text-decoration: none;
`;

const AvatarWrapper = styled.div``;

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
        <Fragment key={item.id}>
          <RepoWrapper key={item.id} justifyStart alignCenter className="paper" href={item.svn_url} target="_blank">
            <AvatarWrapper className="avartar-circle">
              <img src={item.owner.avatar_url} />
            </AvatarWrapper>
            <RepoTitle>{item.name}</RepoTitle>
          </RepoWrapper>
        </Fragment>
      ))}
    </Container>
}

export default SearchResult;
