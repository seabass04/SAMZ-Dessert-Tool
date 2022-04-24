import React, { Component, useState } from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Popover from '@mui/material/Popover';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import Donut from "../components/donutChart";
import XLSX from "xlsx";
import styles from "../styles/samz.module.css";
import { Outbound } from "@mui/icons-material";
import default_performance_graph from '../public/default_performance_graph.jpg';
import default_clustered_image from '../public/default_clustered_image.jpg';
import default_georeferenced_image from '../public/default_georeferenced_image.jpg';
import { width } from "@mui/system";
import { FormHelperText } from '@mui/material';
import { Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
//import { getOverlayDirection } from "react-bootstrap";

//Firebase imports
import { doc, setDoc, collection, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../Firebase";
import { ResponsiveContainer } from "recharts";

const Input = styled("input")({
  display: "none",
});

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const ListText = {
  fontFamily: "Quicksand",
  fontName: "sans-serif",
  color: "#BBE1FA",
};
export class Samz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      noResults: true,
      fetchInProgress: false,
      resultsReceived: false,
      mean: 0,
      max: 0,
      min: 0,
      std: 0,
      ndvi_range: 0,
      clusters: 0,
      message: "Waiting on file upload",
      delineationImage: "0",
      performanceGraphImage: "0",
      georeferencedImage: "0",
      filename: 0,
      file: 0,
      length: 0,
      width: 0,
      longitude: null,
      latitude: null,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onLengthChange = this.onLengthChange.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
    this.onLatitudeChange = this.onLatitudeChange.bind(this);
    this.onLongitudeChange = this.onLongitudeChange.bind(this);
    this.geoTitle = React.createRef();
  }
  handleClickOpen = () => {
    this.setState({
        modalOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      modalOpen: false
  });
  };
  downloadSampleData = () => {
    console.log("top of test");
    var workbook = XLSX.read(
      "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",
      { type: "base64", WTF: false }
    );

    var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[0]);
    var result = [];
    result.push(csv);
    result.join("\n");
    console.log("after");
    console.log(result);
    XLSX.writeFile(workbook, "sampleData.xlsx");
  };

  changeHandler = (event) => {
      console.log(event.target.files[0]);
      var eventName = event.target.files[0].name;
      var eventFile = event.target.files[0]
      var reader = new FileReader();
      const scope = this;
      reader.onload = function(event) {
        var data = event.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        var sheet_name_list = workbook.SheetNames;
        let excelRowsJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));
        //let json = JSON.stringify(excelRowsObjArr);
        //console.log("length: ", excelRowsObjArr.length );
        //console.log("width: ", Object.keys(excelRowsObjArr).lrngth);
        var widthObj = excelRowsJson.map(function(v) {
          return Object.keys(v).length;
        });
        var lengthOfFile = excelRowsJson.length;
        var widthOfFile = widthObj[0];
        if(lengthOfFile == 0 || lengthOfFile == 1 || widthOfFile == 0 || widthOfFile == 1)
        {//the user either uploaded a blank file or a flattened file so manual input is required
          lengthOfFile = 0;
          widthOfFile = 0;
        }
        scope.setState({
          filename: eventName,
          file: eventFile,
          length: lengthOfFile,
          width: widthOfFile,
        },() => {
          console.log("updated length: ", scope.state.length);
      });
    };
    reader.readAsBinaryString(event.target.files[0]);
	};

  onLengthChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onWidthChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onLatitudeChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onLongitudeChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    console.log(event);
    console.log(event.target.file.files[0]);
    this.setState({
        fetchInProgress: true
    });

    //File name for upload
    var fileName = event.target.file.files[0].name;

    let data = new FormData();
    console.log("results received = " + this.state.resultsReceived);
    var excelFile = event.target.file.files[0];
    function getBase64(file, onLoadCallback) {
      return new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.onload = function() { 
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
      });
    }
    var promise = getBase64(excelFile);
    async function saveResults() {
    var promise = getBase64(excelFile);
    var excelFileBase64 = await promise;
    excelFileBase64 = excelFileBase64.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,","")
    
    //Code for uploading to Firestore
    var user = auth.currentUser;
    if(user)
    {
      //Creating path to user in userFields folder using UID
      var path = "userFields/"+user.uid+"/excel_files";

      //Reference to a document in excel files subcollection
      const ref = doc(collection(db,path));

      //For getting the date/time
      var currentDate = new Date(); 
      var dateTime = (currentDate.getMonth()+1) + "/"
                  + currentDate.getDate() + "/"
                  + currentDate.getFullYear() + " @ "  
                  + currentDate.getHours() + ":"    
                  + currentDate.getMinutes() + ":" 
                  + currentDate.getSeconds();

      setDoc(doc(db, 'userFields', user.uid),{
        displayName: user.displayName
      });

      setDoc(ref, {
        excel: excelFileBase64,
        name: fileName,
        timestamp: dateTime,
      });
  }

}
saveResults();
    //getBase64(excelFile);
    data.append("file", event.target.file.files[0]);
    data.append("length", event.target.length.value);
    data.append("width", event.target.width.value);
    data.append("longitude", event.target.longitude.value);
    data.append("latitude", event.target.latitude.value);
    console.log("in upload");
    console.log(data);
    axios.post("http://localhost:5000/samz/post", data, config).then((res) => {
      this.setState({
        noResults: false,
        fetchInProgress: false,
        resultsReceived: true,
        mean: res.data.mean,
        max: res.data.max,
        min: res.data.min,
        std: res.data.std,
        ndvi_range: res.data.ndvi_range,
        clusters: res.data.clusters,
        message: res.data.message,
        delineationImage: res.data.delineationImage,
        performanceGraphImage: res.data.performanceGraphImage,
        georeferencedImage: res.data.georeferencedImage
      });
    });
    event.target.reset();
    event.preventDefault();
  };

  render() {
    return (
      <div className={styles.container}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <form
              autoComplete="off"
              name="lengthAndWidth"
              onSubmit={this.handleSubmit}
            >
              <div className={styles.fileselect}>
                <div className={styles.fileslectbutton}>
                  <label htmlFor="contained-button-file">
                    <Input
                      type="file"
                      required
                      name="file"
                      accept=".xlsx"
                      id="contained-button-file"
                      onChange={this.changeHandler}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      style={{
                        fontFamily: "Quicksand",
                        fontName: "sans-serif",
                        backgroundColor: "#0F4C75",
                        color: "#BBE1FA",
                        textTransform: "none",
                      }}
                    >
                      Select File
                    </Button>
                  </label>
                </div>

                <div className={styles.fileselectname}>File: {this.state.filename ? (this.state.filename):(<CircularProgress/>)}</div>
              </div>
              <div className={styles.dimensionsInput}>

                <div className={styles.dimensionsLength}>
                  <Tooltip title="Number of columns in excel sheet" placement="top">
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    required
                    name="width"
                    label="Width"
                    variant="filled"
                    size="small"
                    sx={{ bgcolor: "#e0e0e0" }}
                    margin="dense"
                    style={{ width: 180 }}
                    value={this.state.width ? this.state.width : ""}
                    onChange = {this.onWidthChange}
                  />
                  </Tooltip>
                </div>

                <div className={styles.dimensionsWidth}>
                  <Tooltip title="Number of rows in excel sheet" placement="top">
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    required
                    name="length"
                    label="Length"
                    variant="filled"
                    size="small"
                    sx={{ bgcolor: "#e0e0e0" }}
                    margin="dense"
                    style={{ width: 180 }}
                    value={this.state.length ? this.state.length : ""}
                    onChange = {this.onLengthChange}
                  />
                  </Tooltip>
                </div>
              </div>

              <div className={styles.dimensionsInput}>
                <div className={styles.dimensionsLength}>
                <Tooltip title="The latitude of the center of your field" placement="top">
                  <TextField
                    inputProps={{ inputMode: "numeric"}}
                    name="latitude"
                    label="Latitude"
                    variant="filled"
                    size="small"
                    sx={{ bgcolor: "#e0e0e0" }}
                    margin="dense"
                    style={{ width: 180 }}
                    value={this.state.latitude ? this.state.latitude : ""}
                    onChange = {this.onLatitudeChange}
                  />
                  </Tooltip>
                </div>
                <div className={styles.dimensionsWidth}>
                  <Tooltip title="The longitude of the center of your field" placement="top">
                  <TextField
                    // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    inputProps={{ inputMode: "numeric" }}
                    name="longitude"
                    label="Longitude"
                    variant="filled"
                    size="small"
                    sx={{ bgcolor: "#e0e0e0" }}
                    margin="dense"
                    style={{ width: 180 }}
                    value={this.state.longitude ? this.state.longitude : ""}
                    onChange = {this.onLongitudeChange}
                  />
                  </Tooltip>
                </div>
              </div>

              <div className={styles.submitButton}>
                <label htmlFor="contained-button">
                  <Input type="submit" required id="contained-button" />
                  <Button
                    variant="contained"
                    component="span"
                    style={{
                      fontFamily: "Quicksand",
                      fontName: "sans-serif",
                      backgroundColor: "#0F4C75",
                      color: "#BBE1FA",
                      textTransform: "none",
                    }}
                  >
                    Submit
                  </Button>
                </label>
              </div>
            </form>
          </Grid>

          <Grid item xs={9}>
            <div className={styles.infoButton} align="center">
          <Button variant="outlined" onClick={this.handleClickOpen} style={{
                        fontFamily: "Quicksand",
                        fontName: "sans-serif",
                        backgroundColor: "#0F4C75",
                        color: "#BBE1FA",
                        textTransform: "none",
                      }}>
        Click here to learn more about the tool
      </Button>
      <Dialog
        open={this.state.modalOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll="paper"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          {"Important Info"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
          <Typography variant="h6" align="center"> What kind of files does the tool accept?</Typography>
            <Typography  gutterBottom align="center"> The tool supports Microsoft Excel Files (.xlsx)</Typography>
            <Divider variant="middle"/>
            <Typography variant="h6" align="center"> What kind of data does the tool accept?</Typography>
            <Typography gutterBottom align="center"> The tool uses NDVI data.</Typography>
            <Divider variant="middle"/>
            <Typography variant="h6" align="center"> What format does my data need to be in?</Typography>
            <Typography gutterBottom align="center"> Your data can be flattened to a single column or be fully expanded. However, if it is flattened please specify the dimensions of the orignal data. Length is the number of rows in the excel file and width is the number of columns. Please use NDVI as the header of your file.</Typography>
            <Divider variant="middle"/>
            <Typography variant="h6" align="center"> Can I get an example of what my data should look like?</Typography>
            <Typography gutterBottom align="center"> Sure! Please click the button below to download an example. The sample data has two sheets. The first sheet is a flattened dataset and the second sheet is an expanded dataset. </Typography>
          </DialogContentText>
          <DialogActions>
          <Button onClick={this.downloadSampleData}>Sample Data</Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
      </div>
          </Grid>

          <Grid item xs={3}>
            <List>
              <Divider style={{ background: "#BBE1FA" }} />
              <div className={styles.piechart}>NDVI Range and Mean
              </div>
              <ListItem>
              <ResponsiveContainer aspect={1.5}>
                <Donut pieData={this.state} />
              </ResponsiveContainer>
              </ListItem>
              <Divider style={{ background: "#BBE1FA" }} />
              <ListItem>
                {this.state.resultsReceived && (
                  <ListItemText
                    primaryTypographyProps={{ style: ListText }}
                    primary={"Mean: " + this.state.mean}
                  />
                )}
              </ListItem>
              <Divider style={{ background: "#BBE1FA" }} />
              <ListItem>
                {this.state.resultsReceived && (
                  <ListItemText
                    primaryTypographyProps={{ style: ListText }}
                    primary={"Min: " + this.state.min}
                  />
                )}
              </ListItem>
              <Divider style={{ background: "#BBE1FA" }} />
              <ListItem>
                {this.state.resultsReceived && (
                  <ListItemText
                    primaryTypographyProps={{ style: ListText }}
                    primary={"Max: " + this.state.max}
                  />
                )}
              </ListItem>
              <Divider style={{ background: "#BBE1FA" }} />
              <ListItem>
                {this.state.resultsReceived && (
                  <ListItemText
                    primaryTypographyProps={{ style: ListText }}
                    primary={"STD: " + this.state.std}
                  />
                )}
              </ListItem>
              <Divider style={{ background: "#BBE1FA" }} />
              <ListItem>
                {this.state.resultsReceived && (
                  <ListItemText
                    primaryTypographyProps={{ style: ListText }}
                    primary={"Optimal Zones: " + this.state.clusters}
                  />
                )}
              </ListItem>
              <Divider style={{ background: "#BBE1FA" }} />
              <ListItem>
                {this.state.resultsReceived && (
                  <ListItemText
                    primaryTypographyProps={{ style: ListText }}
                    primary={"Input variation: " + this.state.ndvi_range}
                  />
                )}
              </ListItem>
              <Divider style={{ background: "#BBE1FA" }} />
              <ListItem>
                {this.state.resultsReceived && (
                  <ListItemText
                    primaryTypographyProps={{ style: ListText }}
                    primary={"Message: " + this.state.message}
                  />
                )}
              </ListItem>
              <Divider style={{ background: "#BBE1FA" }} />
            </List>
          </Grid>
          <Grid item xs={9}>
          {this.state.fetchInProgress ? <Alert onClose={() => {}} severity="info">Please wait while we process your file.</Alert> : ""}
            <div className={styles.imagestats}>
              <div className={styles.image}>
                {this.state.noResults ? (
                  <img
                  src={default_clustered_image.src}
                />
                ) : (
                  <img
                    src={`data:image/jpeg;base64,${this.state.delineationImage}`}
                  />
                )}
              </div>
              <div className={styles.image}>
                {this.state.noResults ? (
                  <img
                  src={default_performance_graph.src}
                  className={styles.performanceImg}
                />
                ) : (
                  <img
                    src={`data:image/jpeg;base64,${this.state.performanceGraphImage}`}
                    className={styles.performanceImg}
                  />
                )}
              </div>
            </div>
          </Grid>
          

          <Grid item xs={3}></Grid>

          <Grid item xs={9}>
            <div className={styles.imagestats}>
              <div className={styles.georeferencedImage}>
                <div>
                  {this.state.noResults ? (
                    <div>
                     <h1 className={styles.piechart}>Georeferenced Image</h1>
                    <img
                      src={default_georeferenced_image.src}
                      className={styles.performanceImg}
                    />
                    </div>
                  ) : (
                    <div>
                      <h1 ref={this.geoTitle} className={styles.piechart}>Georeferenced Image</h1>
                    <img
                      src={`data:image/jpeg;base64,${this.state.georeferencedImage}`}
                      className={styles.performanceImg}
                      onError={(event) => (event.target.style.display = "none", this.geoTitle.current.style.display = "none")}
                    />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Grid>

        </Grid>
      </div>
    );
  }
}
export default Samz;
