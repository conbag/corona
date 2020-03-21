import { useState } from "react";
import ReactTooltip from "react-tooltip";
import CountryMap from "../components/CountryMap";

export default function MapContainer() {
  const [content, setContent] = useState("");

  return (
    <div>
      <CountryMap setTooltipContent={setContent}></CountryMap>
      <ReactTooltip html={true} multiline={true}>
        {content}
      </ReactTooltip>
    </div>
  );
}
