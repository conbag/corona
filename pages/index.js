import Stats from "../components/Stats";
import CountryMap from "../components/CountryMap";
import { useState } from "react";
import ReactTooltip from "react-tooltip";

export default function IndexPage() {
    const[content, setContent] = useState("");

    return (
        <div>
            <Stats></Stats>
            <CountryMap setTooltipContent={setContent}></CountryMap>
            <ReactTooltip html={true} multiline={true}>{content}</ReactTooltip>
        </div>
    )
}