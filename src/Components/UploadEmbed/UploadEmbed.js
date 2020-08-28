import React from 'react'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const UploadEmbed = (props) => (
    <TextareaAutosize
    onChange={props.handleChange}
    value={props.value}
    label="Embedding"
    placeholder="Enter your embedding"
    variant="outlined"
    rowsMin={9}
    rowsMax={9}
    style={{width: '100%', height: '100%'}}
    />
)

export default UploadEmbed