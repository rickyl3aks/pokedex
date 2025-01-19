import React, { ChangeEvent } from "react";
import { FilterSelectWrapper, Select } from "../filter-select/filterSelect";

interface HandleLanguageProps {
  setSelectedLanguage: (vaule: string) => void;
}

const Flag = ({ setSelectedLanguage }: HandleLanguageProps) => {
  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <FilterSelectWrapper>
      <Select id="language-dropdown" onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="it">Italian</option>
        <option value="fr">French</option>
      </Select>
    </FilterSelectWrapper>
  );
};

export default Flag;
