import Category from './category';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import colors from '../../util/colors';
import styled from '@emotion/styled';
import {Link, withPrefix} from 'gatsby';

const StyledList = styled.ul({
  marginLeft: 0,
  listStyle: 'none'
});

const StyledListItem = styled.li({
  fontSize: '1rem',
  a: {
    color: 'inherit',
    textDecoration: 'none'
  }
});

export default class SidebarNav extends Component {
  static propTypes = {
    alwaysExpanded: PropTypes.bool,
    contents: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired
  };

  isPageSelected = ({path}) =>
    withPrefix(path) === this.props.pathname.replace(/\/$/, '');

  renderPages(pages, key) {
    return (
      <StyledList key={key}>
        {pages.map(page => (
          <StyledListItem key={page.path}>
            {page.anchor ? (
              <a href={page.path}>{page.title}</a>
            ) : (
              <Link
                style={
                  this.isPageSelected(page) ? {color: colors.primary} : null
                }
                to={page.path}
              >
                {page.title}
              </Link>
            )}
          </StyledListItem>
        ))}
      </StyledList>
    );
  }

  render() {
    return (
      <Fragment>
        {this.props.contents.map(({title, path, pages}) => {
          const contents = this.renderPages(pages, title);
          if (!title) {
            return contents;
          }

          return (
            <Category
              key={title}
              title={title}
              path={path}
              active={pages.some(this.isPageSelected)}
              alwaysExpanded={this.props.alwaysExpanded}
            >
              {contents}
            </Category>
          );
        })}
      </Fragment>
    );
  }
}
