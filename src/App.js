import React, { useState } from 'react';
import Dropzone from './Components/UploadFile/Dropzone'
import UploadEmbed from './Components/UploadEmbed/UploadEmbed'
import './App.css';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
}));

function App() {
  const classes = useStyles();

  const [embed, setEmbed] = useState('')
  const [file, setFile] = useState(null)

  const handleEmbedChange = (event) => {
    setEmbed(event.target.value)
  }

  const handleFileChange = (file) => {
    console.log(file)
    setFile(file)
  }

  const handlePostData = async () => {
    console.log("Sending data")
    console.log(file)
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
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const result = await response;
      console.log(response)
      console.log('Успех:', result);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
      <Grid container justify="center" className={classes.gridItem}><Dropzone handleChange={handleFileChange} /></Grid>
      <Grid container justify="center" className={classes.gridItem}><UploadEmbed handleChange={handleEmbedChange} value={embed}/></Grid>
      <Grid container justify="center" className={classes.gridItem}><button onClick={handlePostData}>Send Data</button></Grid>
    </Grid>
  );
}

export default App;
