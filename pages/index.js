import MapContainer from "../components/MapContainer";
import Stats from "../components/Stats";
import { withRedux } from "../utils/redux";
import TabBar from "../components/TabBar";

function IndexPage() {
  return (
    <div>
      <Stats></Stats>
      <TabBar></TabBar>      
    </div>
  );
}

export default withRedux(IndexPage);
