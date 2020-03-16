import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  percentageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function StatsCard({ title, amount, delta }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Covid-19
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {amount.toLocaleString()}
        </Typography>
      </CardContent>
      <CardContent className={classes.percentageContainer}>
        {delta && (
          <Typography
            variant="h5"
            component="h3"
            style={{ color: delta >= 0 ? "#4caf50" : "#ff5233" }}
          >
            {delta >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{" "}
            {`${Math.abs(delta).toFixed(2)}%`}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
