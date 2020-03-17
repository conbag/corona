import { useState } from "react";
import ReactTooltip from "react-tooltip";
import CountryMap from "../components/CountryMap";
import Stats from "../components/Stats";
import { withRedux } from "../utils/redux";

function IndexPage() {
  const [content, setContent] = useState("");

  return (
    <div>
      <Stats></Stats>
      <CountryMap setTooltipContent={setContent}></CountryMap>
      <ReactTooltip html={true} multiline={true}>
        {content}
      </ReactTooltip>
    </div>
  );
}

export default withRedux(IndexPage);
