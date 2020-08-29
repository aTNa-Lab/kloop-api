import React, { useState, useEffect } from 'react';
import Dropzone from './Components/UploadFile/Dropzone'
import UploadEmbed from './Components/UploadEmbed/UploadEmbed'
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Charts from './Components/Charts/Charts'
import ReactEcharts from "echarts-for-react";
import './App.css';
import {extent, timeFormat, range} from 'd3'
import * as test from './test.json'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  gridItem: {
    padding: theme.spacing(1),
    width: '50%'
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  images: {
    height: 300
  }
}));

function App() {
  const classes = useStyles();

  const [embed, setEmbed] = useState('')
  const [file, setFile] = useState(null)
  const [data, setData] = useState(null)
  const [sortedMetadata, setSorted] = useState(null)
  const [closest, setClosest] = useState([])
  const [farest, setFarest] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setData(test.default)
  }, [])
  

  const handleEmbedChange = (event) => {
    setEmbed(event.target.value)
  }

  const handleFileChange = (file) => {
    console.log(file)
    setFile(file)
  }

  const handlePostData = async () => {
    console.log("Sending data")
    const formData = new FormData();

    formData.append('token', 'TDlRJi8ORMGVrMedVkZDXsUDK')
    formData.append('action', 'faiss_search')
    formData.append('table_name', 'lukoshko_with_arr_norm')
    formData.append('index_filename', 'ktrk_index.faiss')
    formData.append('radius', 0.93)
    formData.append('file1', file, 'image.jpg');

    
    try {
      const response = await fetch('https://9e94093f8750.sn.mynetname.net:5000/', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      setData(result)
      console.log(result)
      sortData()
        
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  const handleGetData = async (frame) => {
    console.log("Getting image")
    let urlCreator = window.URL || window.webkitURL;
    const formData = new FormData();
    formData.append('token', 'TDlRJi8ORMGVrMedVkZDXsUDK')
    formData.append('action', 'extract_frame')
    formData.append('file_path', frame.file_path)
    formData.append('frame_index', frame.frame_index)

    try {
      const response = await fetch('https://9e94093f8750.sn.mynetname.net:5000/', {
        method: 'POST',
        body: formData
      });
      
      let result = await response.blob();
      let imageUrl = urlCreator.createObjectURL(result);
      console.log("RESPONSE", result)
      return {metadata: frame, image: imageUrl}

    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  const sortData = () => {
    let metadata = Object.values(data[0].metadata)
    console.log(metadata)
    const sortedArr = [...metadata].sort((a, b) => a.distance - b.distance)
    setSorted(sortedArr)
  }

  const getFrames = (n) => {
    let closestFrames = sortedMetadata.slice(sortedMetadata.length-n)
    let farestFrames = sortedMetadata.slice(0, n)
    console.log("closest", closestFrames)
    console.log("farest", farestFrames)
    let closestFramesData = []
    let farestFramesData = []
    closestFrames.forEach(frame => handleGetData(frame).then(d => closestFramesData.push(d)))
    farestFrames.forEach(frame => handleGetData(frame).then(d => farestFramesData.push(d)))
    setClosest(closestFramesData)
    setFarest(farestFramesData)
  }



  const nestData = () => {
    let day = timeFormat("%U");
    let flatdata = Object.values(data)
    let dataExtent = extent(flatdata, d => day(d.date));
    console.log(dataExtent)
    let timeRange = range(dataExtent[0], dataExtent[1]);
    console.log(timeRange)
  }

  const returnImages = (n) => {
    console.log("img fired")
        let closestImgs = closest.map((tile, i) => {
          console.log("TILE", tile)
          return(
          <GridListTile key={i}>
            <img src={tile.image} alt={i} className={classes.images} />
            <GridListTileBar
              title={tile.metadata.distance}
            />
          </GridListTile>
        )})
        let farestImgs = farest.map((tile, i) => {
          console.log("TILE", tile)
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
        <GridList className={classes.gridList} cols={3} cellHeight="auto">
          {closestImgs}
        </GridList>
        <h2>Farest</h2>
        <GridList className={classes.gridList} cols={3} cellHeight="auto">
          {farestImgs}
        </GridList>
    </div>
    )
  }

  const showImages = (n) => {
    getFrames(n)
    returnImages(n)
    setReady(true)
  }


  return (
    <div className="App">
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid container justify="center" className={classes.gridItem}><Dropzone handleChange={handleFileChange} /></Grid>
      <Grid container justify="center" className={classes.gridItem}><UploadEmbed handleChange={handleEmbedChange} value={embed}/></Grid>
      <Grid container justify="center" className={classes.gridItem}><button onClick={() => handlePostData()}>Send Data</button></Grid>
      <Grid container justify="center" className={classes.gridItem}><button onClick={() => showImages(3)}>Show Images</button></Grid>
        {ready ? returnImages() : null}
    </Grid>
    <button onClick={() => console.log(data)}>result</button>
    <button onClick={() => nestData()}>nest</button>
    <button onClick={() => sortData()}>sort</button>
    <button onClick={() => getFrames(3)}>frames</button>
    <button onClick={() => console.log(closest)}>console closest</button>
    {/* <Charts /> */}
    

    </div>
  );
}

export default App;
