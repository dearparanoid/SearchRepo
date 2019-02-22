import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import { REPO } from '../../common/constant';
import { createURL } from '../../utils/net';
import { colors } from '../theme/common_var';
import './_searchInput.scss';

import SearchResult from './searchResult';

const _ = {
  throttle,
}

const H2 = styled.h2`
  color: ${colors.gray.gray80};
`;

const SearchBox = styled.div``;

class SearchContainer extends Component {
  state = {
    ...this.state,
    searchPattern: '',
    page: 1,
    height: 0,
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
      per_page: 100,
      page: this.state.page
    });
    axios.get(requestUrl)
      .then(response => {
        this.setState(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({ page: this.state.page + 1 }, () => {
        const requestUrl = createURL(REPO, {
          q: this.state.searchPattern,
          sort: 'stars',
          order: 'desc',
          per_page: 100,
          page: this.state.page
        });
        axios.get(requestUrl)
          .then(response => {
            this.setState({ items: [...this.state.items, ...response.data.items] });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", _.throttle((this.handleScroll), 1000));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", _.throttle((this.handleScroll), 1000));
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
