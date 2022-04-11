import { FunctionComponent, useState } from "react";
import { PostalCode } from "./postalCode";
import { Locality } from "./locality";
import "./app.css";
import { Street } from "./street";

import streetsJson from "./streets.json";
const streets = streetsJson as Record<string, string[]>;

export const App: FunctionComponent = () => {
  const [postalCode, setPostalCode] = useState("");
  const [onrp, setOnrp] = useState<number | null>(null);
  const [locality, setLocality] = useState("");
  const [street, setStreet] = useState("");

  const streetSuggestions = onrp === null ? [] : getStreetSuggestions(onrp);

  return (
    <>
      <div className="wrapper">
        <div style={{ gridArea: "postalCode", width: 100 }}>
          <PostalCode
            postalCode={postalCode}
            onSuggestionChange={(suggestion) => {
              setLocality(suggestion.locality[0]);
              setOnrp(suggestion.locality[1]);
            }}
            setPostalCode={setPostalCode}
          />
        </div>
        <div style={{ gridArea: "locality" }}>
          <Locality locality={locality} setLocality={setLocality} />
        </div>
        <div style={{ gridArea: "street" }}>
          <Street
            street={street}
            suggestions={streetSuggestions}
            setStreet={setStreet}
          />
        </div>
      </div>
      <pre>
        {JSON.stringify({ postalCode, locality, street, onrp }, null, 2)}
      </pre>
    </>
  );
};

const getStreetSuggestions = (onrp: number): string[] => {
  const suggestions = streets[onrp];

  if (suggestions === undefined) {
    console.warn(`Unknown onrp \`${onrp}ä\``);
    return [];
  }

  return suggestions;
};
