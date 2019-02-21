import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import TextField from '@material-ui/core/TextField';

import { createURL } from '../../utils/net';
import { colors } from '../theme/common_var';
import './_searchInput.scss';

const H2 = styled.h2`
  color: ${colors.gray.gray80};
`;

const SearchBox = styled.div``;

class SearchContainer extends Component {

  state = {
    searchPattern: '',
  }

  handleChange = searchPattern => e => {
    this.setState({ [searchPattern]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    alert(`search ${this.state.searchPattern}`);
  }

  render() {
    return (
      <Flex full center column>
        <H2>Search repository in Github</H2>
        <form onSubmit={this.handleSubmit}>
          <SearchBox className="search-box">
            <TextField
              id="Search"
              label="Search"
              value={this.state.searchPattern}
              onChange={this.handleChange('searchPattern')}
              margin="normal"
            />
          </SearchBox>
        </form>
      </Flex>
    )
  }
}

export default SearchContainer
