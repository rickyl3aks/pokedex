import React from "react";
import { styled } from "styled-components";

interface FilterSearchProps {
  filterQuery: string;
  setFilterQuery: (value: string) => void;
}

export const FilterSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const FilterSelect = ({ filterQuery, setFilterQuery }: FilterSearchProps) => {
  return (
    <FilterSelectWrapper>
      <Select name="pokemon" id="pokemon" value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)}>
        <option value="ascendent">Ascending (A-Z)</option>
        <option value="descendent">Descending (Z-A)</option>
        <option value="high_attack">High Attack</option>
        <option value="high_defense">High Defense</option>
      </Select>
    </FilterSelectWrapper>
  );
};

export default FilterSelect;
