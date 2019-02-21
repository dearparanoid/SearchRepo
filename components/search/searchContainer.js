import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import { REPO } from '../../common/constant';
import { createURL } from '../../utils/net';
import { colors } from '../theme/common_var';
import './_searchInput.scss';

import SearchResult from './searchResult';

const H2 = styled.h2`
  color: ${colors.gray.gray80};
`;

const SearchBox = styled.div``;

class SearchContainer extends Component {
  state = {
    ...this.state,
    searchPattern: '',
    page: 1,
  }

  handleChange = e => {
    this.setState({ searchPattern: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const requestUrl = createURL(REPO, {
      q: this.state.searchPattern,
      sort: 'stars',
      order: 'desc',
      per_page: 10,
      page: this.state.page
    });
    axios.get(requestUrl)
      .then(response => {
        console.log(response);
        this.setState(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Flex full center column>
        <H2>Search repositories in Github</H2>
        <form onSubmit={this.handleSubmit} className="search-form">
          <SearchBox className="search-box">
            <TextField
              id="Search"
              label="Search"
              value={this.state.searchPattern}
              onChange={this.handleChange}
              margin="normal"
            />
          </SearchBox>
        </form>
        <SearchResult parentState={this.state} />
      </Flex>
    )
  }
}

export default SearchContainer
