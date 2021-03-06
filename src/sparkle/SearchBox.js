import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import AutoSuggest from 'react-autosuggest'

import Input from './Input'
import SearchIcon from './SearchIcon'

import { DropdownContainer, DropdownItem } from './DropdownMenu'

const SearchBox = (props) => {

  const {
    items, inputProps,
    onFetchRequest, onClearRequest,
    onItemSelected
  } = props

  return (
    <SearchBoxWrapper>
      <AutoSuggest
        suggestions={items}
        onSuggestionsFetchRequested={onFetchRequest}
        onSuggestionsClearRequested={onClearRequest}
        onSuggestionSelected={onItemSelected}
        getSuggestionValue={item => item.title}
        renderInputComponent={renderInputComponent}
        renderSuggestion={renderItem}
        renderSuggestionsContainer={renderSuggestionsContainer}
        alwaysRenderSuggestions={false}
        focusInputOnSuggestionClick={false}
        inputProps={inputProps}
      />
    </SearchBoxWrapper>
  )
}

SearchBox.defaultProps = {
  onFetchRequest() {},
  onClearRequest() {},
  onItemSelected() {},
}

const invertedText = p => p.theme.colors.gray2

const StyledInput = styled(Input)`
  width: ${p => p.width}px;
  transition: background 0.1s ease;

  &:focus {
    background-color: ${p => p.theme.colors.white};
    border-color: ${p => p.theme.colors.blue};
    color: ${p => p.theme.colors.gray2};

    &::-webkit-input-placeholder { color: ${invertedText}; font-weight: 300; }
    &:-moz-placeholder { color: ${invertedText}; font-weight: 300; opacity: 1; }
    &::-moz-placeholder { color: ${invertedText}; font-weight: 300; opacity: 1; }
    &:-ms-input-placeholder { color: ${invertedText}; font-weight: 300; }

    & + div path {
      fill: ${invertedText};
    }
  }
`

StyledInput.defaultProps = {
  width: 500
}

const InputWrapper = styled.div`
  position: relative;
`

const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SearchInput = ({ inputProps }) => (
  <InputWrapper>
    <StyledInput {...inputProps} />
    <IconWrapper>
      <SearchIcon size={16} />
    </IconWrapper>
  </InputWrapper>
)

const SearchBoxWrapper = styled.div`
  .react-autosuggest__container--open {
    .react-autosuggest__suggestions-container {
      opacity: 1;
      border-color: ${p => p.theme.colors.blue}
    }

    input:focus {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom-color: transparent;
    }
  }
`

const renderInputComponent = (props) => (
  <SearchInput inputProps={props} />
)

const renderItem = (item) => (
  <DropdownItem>{item.title}</DropdownItem>
)

const SuggestionContainer = styled(DropdownContainer)`
  position: absolute;
  width: 500px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  opacity: 0;
  transition: opacity .2s ease;
  border-color: transparent;

  .react-autosuggest__suggestions-list {
    padding-left: 0;
    margin: 0;
    list-style: none;
  }

  .react-autosuggest__suggestion--focused {
    background-color: ${p => p.theme.colors.blue} !important;
    color: #fff;
    > div {
      background-color: ${p => p.theme.colors.blue} !important;
    }
  }
`

const renderSuggestionsContainer = (props) => (
  <SuggestionContainer {...props} />
)

export default SearchBox
