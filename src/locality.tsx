import { FunctionComponent } from "react";

interface ILocalityProps {
  locality: string;
  setLocality: (locality: string) => void;
}

export const Locality: FunctionComponent<ILocalityProps> = ({
  locality,
  setLocality,
}) => (
  <label>
    <span style={{ display: "block" }}>City</span>
    <input
      value={locality}
      onChange={(event) => setLocality(event.target.value)}
    />
  </label>
);
