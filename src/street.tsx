import { FunctionComponent, useState } from "react";
import Autosuggest, { InputProps } from "react-autosuggest";
import "./theme.css";

interface ILocalityProps {
  street: string;
  suggestions: string[];
  setStreet: (street: string) => void;
}

export const Street: FunctionComponent<ILocalityProps> = ({
  street,
  suggestions: allSuggestions,
  setStreet,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSuggestions = (value: string): string[] => {
    const inputValue = value.trim().toLowerCase();

    return allSuggestions.filter((s) => s.toLowerCase().includes(inputValue));
  };

  const onChange = (_: unknown, { newValue }) => {
    setStreet(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps: InputProps<string> = {
    value: street,
    onChange,
  };

  return (
    <label>
      <span>Street</span>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </label>
  );
};

const getSuggestionValue = (suggestion: string) => suggestion;

const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;
