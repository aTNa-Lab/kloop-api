import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  images: {
    height: 300
  }
}));

const Frames = (props) => {
    const classes = useStyles();
    let closestImgs = props.closest.map((tile, i) => {
      return(
      <GridListTile key={i}>
        <img src={tile.image} alt={i} className={classes.images} />
        <GridListTileBar
          title={tile.metadata.distance}
        />
      </GridListTile>
    )})
    let farestImgs = props.farest.map((tile, i) => {
      return(
      <GridListTile key={i}>
        <img src={tile.image} alt={i} className={classes.images} />
        <GridListTileBar
          title={tile.metadata.distance}
        />
      </GridListTile>
    )})
return (
  <div>
    <h2>Closest</h2>
    <GridList className={classes.gridList} cols={props.quantity} cellHeight="auto">
      {closestImgs}
    </GridList>
    <h2>Farest</h2>
    <GridList className={classes.gridList} cols={props.quantity} cellHeight="auto">
      {farestImgs}
    </GridList>
</div>
)
}

export default Frames