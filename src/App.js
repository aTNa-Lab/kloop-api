import React, { useState, useEffect } from 'react';
import Dropzone from './Components/UploadFile/Dropzone'
import UploadEmbed from './Components/UploadEmbed/UploadEmbed'
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Charts from './Components/Charts/Charts'
import Frames from './Components/Frames/Frames'
import './App.css';
import {extent, timeFormat, range, sum, max, timeParse, scaleTime, timeDays} from 'd3'
import {nest} from 'd3-collection'
import * as test from './test.json'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from './Components/Snackbar/Snackbar'
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
  spinner: {
    color: 'grey',
    right: 0,
    top: 0,
    margin: '15px',
    position: "absolute"
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
  const [quantity, setQuantity] = useState(3)
  const [showSpinner, setSpinner] = useState(false)
  const [dates, setDates] = useState(null)
  const [timeRange, setTimeRange] = useState(null)
  const [charts, setCharts] = useState(false)
  const [radius, setRadius] = useState(0.93)

  // useEffect(() => {
  //   setData(test.default)
  // }, [])

  const [openSnackbar, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value)
  }

  const handleEmbedChange = (event) => {
    setEmbed(event.target.value)
  }

  const handleFileChange = (file) => {
    console.log(file)
    setFile(file)
  }

  const handlePostData = async () => {
    if (!file) {
      alert("No file to upload")
      return 0
    }
    setSpinner(true)
    console.log("Sending data")
    const formData = new FormData();

    formData.append('token', 'TDlRJi8ORMGVrMedVkZDXsUDK')
    formData.append('action', 'faiss_search')
    formData.append('table_name', 'lukoshko_with_arr_norm')
    formData.append('index_filename', 'ktrk_index.faiss')
    formData.append('radius', radius)
    formData.append('file1', file, 'image.jpg');

    
    try {
      const response = await fetch('https://9e94093f8750.sn.mynetname.net:5000/', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      setData(result)
      console.log(result)
      sortData(result)
        
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

  const sortData = (array) => {
    let metadata = Object.values(array[0].metadata)
    console.log(metadata)
    const sortedArr = [...metadata].sort((a, b) => a.distance - b.distance)
    setSorted(sortedArr)
    getFrames(sortedArr)
    nestData(sortedArr)
  }

  const getFrames = async (array) => {
    // let closestFrames = sortedMetadata.slice(sortedMetadata.length-n)
    // let farestFrames = sortedMetadata.slice(0, n)
    let closestFrames = array.slice(array.length-quantity)
    let farestFrames = array.slice(0, quantity)
    console.log("closest", closestFrames)
    console.log("farest", farestFrames)
    let closestFramesData = []
    let farestFramesData = []
    await closestFrames.forEach(frame => handleGetData(frame).then(d => closestFramesData.push(d)))
    await farestFrames.forEach(frame => handleGetData(frame).then(d => farestFramesData.push(d)))
    setClosest(closestFramesData)
    setFarest(farestFramesData)
    setTimeout(() => setSpinner(false), 2000);
  }

  const nestData = (array) => {
    let week = timeFormat("%U");
    let hour = timeFormat("%Y-%m-%d");
    let flatdata = array
    let dateExtent = extent(flatdata, d => week(Date.parse(d.appearance_time)));
    console.log("Time extent", dateExtent)
    let timeRange = range(dateExtent[0], dateExtent[1]).concat(dateExtent[1]);
    console.log(timeRange)
    let nested = nest().key(d => week(Date.parse(d.appearance_time)))
                       .rollup(values => sum(values, d => +1))
                       .map(flatdata)
    console.log("NESTED", nested)
    let nestHour = nest().key(d => hour(Date.parse(d.appearance_time)))
                       .rollup(values => sum(values, d => +1))
                       .map(flatdata)
    console.log("HOUR NEST", nestHour)
    let extentHours = extent(nestHour.keys())
    console.log(extentHours)
    let timeScale = timeDays(new Date(extentHours[0]), new Date(extentHours[1]))
    let hourScale = timeScale.map(d => hour(d))

    let dates = timeRange.map(d => (d < 10 ? nested.get('0' + d) : nested.get(d)) || 0)
    let hourDates = hourScale.map(d => nestHour.get(d) || 0)
    let test1 = nestHour.get(hourScale[0])
    console.log(hourScale[3])
    console.log("TEST", test1)
    console.log(dates)
    console.log(hourDates)
    // setDates(dates)
    // setTimeRange(timeRange)
    setDates(hourDates)
    setTimeRange(hourScale)
  }

  const showImages = () => {
    setReady(!ready)
  }

  const showCharts = () => {
    setCharts(!charts)
  }


  return (
    <div className="App">
    <div className={classes.spinner}>{showSpinner ? <CircularProgress size={32} style={{color: 'grey'}} /> : null}</div>
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid container justify="center" className={classes.gridItem}>
        <Dropzone handleChange={handleFileChange} handleClick={handleSnackbarClick} />
      </Grid>
      <Grid container justify="center" className={classes.gridItem}><UploadEmbed handleChange={handleEmbedChange} value={embed}/></Grid>
      <Grid container justify="center" className={classes.gridItem}>
        <TextField id="radius" size="small" label="Radius" value={radius} onChange={handleRadiusChange} />
        <button onClick={() => handlePostData()}>Send Data</button>
      </Grid>
      <Grid container justify="center" className={classes.gridItem}><button onClick={() => showImages(3)}>Show Images</button></Grid>
      <Grid container justify="center" className={classes.gridItem}><button onClick={() => showCharts()}>Show Charts</button></Grid>
      {ready ? <Frames farest={farest} closest={closest} quantity={quantity} /> : null}
    </Grid>
      {charts ? <Charts timeRange={timeRange} dates={dates}/> : null }
      <Snackbar handleClose={handleSnackbarClose} open={openSnackbar} />
      <button onClick={() => console.log(scaleTime().domain())}>SCALE TIME TEST</button>
    </div>
  );
}

export default App;
