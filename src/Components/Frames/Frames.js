import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  images: {
    // height: 300,
    // width: 350
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10
  },
  header : {
      marginBottom: 0,
      paddingLeft: 20
  }
}));

const Frames = (props) => {
    const classes = useStyles();
    let closestImgs = props.closest.map((tile, i) => {
      return(
      <GridListTile key={i} style={{minWidth: 375}}>
        <img src={tile.image} alt={i} style={{height: 300}} />
        <GridListTileBar
          title={tile.metadata.distance}
        />
      </GridListTile>
    )})
    let farestImgs = props.farest.map((tile, i) => {
      return(
      <GridListTile key={i} style={{minWidth: 375}}>
        <img src={tile.image} alt={i} style={{height: 300}}/>
        <GridListTileBar
          title={tile.metadata.distance}
        />
      </GridListTile>
    )})
return (
  <div>
    <h2 className={classes.header}>Closest</h2>
    <GridList className={classes.gridList} cols={props.quantity || 1} cellHeight={300}>
      {closestImgs}
    </GridList>
    <h2 className={classes.header}>Farthest</h2>
    <GridList className={classes.gridList} cols={props.quantity || 1} cellHeight={300}>
      {farestImgs}
    </GridList>
</div>
)
}

export default Frames