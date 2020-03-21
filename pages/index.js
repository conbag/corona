import MapContainer from "../components/MapContainer";
import Stats from "../components/Stats";
import { withRedux } from "../utils/redux";

function IndexPage() {
  return (
    <div>
      <Stats></Stats>
      <MapContainer></MapContainer>
    </div>
  );
}

export default withRedux(IndexPage);
