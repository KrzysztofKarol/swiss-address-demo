import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Autosuggest, {
  InputProps,
  OnSuggestionSelected,
} from "react-autosuggest";
import "./theme.css";

import postalCodesXlocalities from "./postalCodesXlocalities";

type Suggestion = {
  postalCode: number;
  locality: [locality: string, onrp: number];
};

const allSuggestions: Suggestion[] = Object.entries(
  postalCodesXlocalities
).flatMap(([postalCode, localities]) =>
  localities.map((locality) => ({ postalCode: Number(postalCode), locality }))
);

const getSuggestions = (value: string): Suggestion[] => {
  if (value.length !== 4) {
    return [];
  }

  return allSuggestions.filter(
    (suggestion) => suggestion.postalCode.toString() === value
  );
};

const getSuggestionValue = (suggestion: Suggestion) =>
  suggestion.postalCode.toString();

const renderSuggestion = (suggestion: Suggestion) => (
  <div>
    <b>{suggestion.postalCode}</b> {suggestion.locality[0]}
  </div>
);

interface IPostalCodeProps {
  postalCode: string;
  onSuggestionChange: (suggestion: Suggestion) => void;
  setPostalCode: (postalCode: string) => void;
}

export const PostalCode: FunctionComponent<IPostalCodeProps> = ({
  postalCode,
  onSuggestionChange,
  setPostalCode,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const onChange = (_: unknown, { newValue }) => {
    setPostalCode(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected: OnSuggestionSelected<Suggestion> = useCallback(
    (_event, data) => onSuggestionChange(data.suggestion),
    [onSuggestionChange]
  );

  const inputProps: InputProps<Suggestion> = {
    type: "number",
    value: postalCode,
    onChange,
  };

  useEffect(() => {
    if (suggestions.length === 1) {
      onSuggestionChange(suggestions[0]);
    }
  }, [suggestions]);

  return (
    <label>
      Postal Code
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        shouldRenderSuggestions={() => suggestions.length !== 1}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </label>
  );
};
