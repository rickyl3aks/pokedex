import React from "react";
import { styled } from "styled-components";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 25px;
  border: 2px solid #ccc;
  width: 300px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
  return (
    <InputWrapper>
      <InputField type="text" placeholder="Search Pokémon" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    </InputWrapper>
  );
};

export default SearchInput;
