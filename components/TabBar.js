import { Paper, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import MapIcon from "@material-ui/icons/Map";
import { useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import MapContainer from './MapContainer';
import GlobalChart from "./GlobalChart";

const useStyles = makeStyles({
  root: {
    justifyContent: "center",    
  }
});

export default function TabBar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab icon={<MapIcon />} aria-label="map" />
        <Tab icon={<EqualizerIcon />} aria-label="graph" />
      </Tabs>
      <SwipeableViews        
        index={value}
        onChangeIndex={handleChangeIndex}
      >        
        <MapContainer index={0}></MapContainer>
        <GlobalChart index={1}></GlobalChart>
      </SwipeableViews>
    </Paper>
  );
}
