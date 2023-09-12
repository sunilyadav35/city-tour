import React, { useState ,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import Alert from '@mui/material/Alert';
import {TableRow, TableHead, Box} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';  
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Autocomplete from "@mui/material/Autocomplete";
//import Dropdown from './Dropdown';
//import './FlightDelayPage.scss'; 



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976D2',
      color: theme.palette.common.white,
      border: 'none'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: 'none'
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const top100Cities = [
    { city: "New York", region: "New York, USA" },
    { city: "Los Angeles", region: "California, USA" },
    { city: "London", region: "England, UK" },
    { city: "Tokyo", region: "Tokyo, Japan" },
    { city: "Paris", region: "Ile-de-France, France" },
    { city: "Chicago", region: "Illinois, USA" },
    { city: "Toronto", region: "Ontario, Canada" },
    { city: "Sydney", region: "New South Wales, Australia" },
    { city: "Berlin", region: "Berlin, Germany" },
    { city: "Cairo", region: "Cairo Governorate, Egypt" },
    { city: "Sao Paulo", region: "Sao Paulo, Brazil" },
    { city: "Lima", region: "Lima, Peru" },
    { city: "Nairobi", region: "Nairobi, Kenya" },
    { city: "Johannesburg", region: "Gauteng, South Africa" },
    { city: "Seoul", region: "Seoul, South Korea" },
    { city: "Mumbai", region: "Maharashtra, India" },
    { city: "Bangkok", region: "Bangkok, Thailand" },
    { city: "Manila", region: "Metro Manila, Philippines" },
    { city: "Lagos", region: "Lagos, Nigeria" },
    
];




const DelayReason = () => {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedReason, setSelectedReason] = useState([]);
  const [showFlightDataTable, setShowFlightDataTable] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [selectedStation, setSelectedStation] = useState([])
  const [isOTPSelected, setIsOTPSelected] = useState(false);
  const [delayCodes, setDelayCodes] = useState([]);
  const [otpData, setOTPData] = useState([]);
  const [showOTPTable, setShowOTPTable] = useState(false);
  const [otpFilteredData, setOTPFilteredData] = useState([]);
  const [selectedDropdowns, setSelectedDropdowns] = useState({});
  const [showRemarksColumn, setShowRemarksColumn] = useState(false);
  

//--------------- Fetch flight data -------------------------------
  useEffect(() => {
    fetch('./FlightData.json') 
      .then((response) => response.json())
      .then((data) => {
        setFlightData(data); 
        setOTPData(data);
      })
      .catch((error) => console.error('Error fetching flight data:', error));
  }, []);
  

// -------------Fetch Delay reason ---------------------------------
useEffect(() => {
    fetch("./Reason.json")
      .then(response => response.json())
      .then(data => {
        // Assuming data.delayCodes.delayCode is the array of delay codes
        setDelayCodes(data.delayCodes.delayCode);
      })
      .catch(error => {
        console.error("Error fetching JSON data:", error);
      });
  }, []);


//-----------------------Change events -------------------------------
  const handleStationChange= (event,newValue) => {
    setSelectedStation(newValue)
  }

  const handleReasonChange = (event) => {
    
  };
  
  

  const handleDropdownChange = (event) => {
  
  };

 
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
// Filter data based on selected dates and optionally selected stations

const handleShowDetails = () => {
  // Check if the fromDate and toDate fields are empty
  if (!fromDate || !toDate) {
    // Display a warning message or take any other action you prefer
    return; // Exit the function early to prevent further execution
  }
  
  // Filter the flight data based on selected dates
  const filteredFlights = flightData.filter((flight) => {
    const flightDate = new Date(flight.flightDate);
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    return flightDate >= startDate && flightDate <= endDate;
  });

  // Filter the flight data further based on selected stations
  const filteredFlightsWithStations = filteredFlights.filter((flight) => {
    // Assuming your flight data has a 'station' property
    return selectedStation.length === 0 || selectedStation.includes(flight.station);
  });

  // Update the filteredData state with the filtered flights
  setFilteredData(filteredFlightsWithStations);
  setShowFlightDataTable(true);
};

   
  





  return (
    
    <Box style={{marginTop:20,}}><Typography style={{textAlign:'center'}}>
   <strong><u>Delay flight reason</u> </strong> 
    </Typography>
    <Box mt={2}
mb={3.5}
className=''
sx={{ display: 'flex', justifyContent: 'space-between' }} >
        
      <Box sx={{ padding:'2px'}}  style={{marginLeft:30, width:345}}>
        <TextField size='small' 
          label="From Date"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField style={{marginLeft:10}}
        size='small'
          label="To Date"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Autocomplete
        multiple
        options={top100Cities}
        getOptionLabel={(option) => option.city}
        value={selectedStation}
        onChange={handleStationChange}
        renderInput={(params) => (
          <TextField size='small' style={{width:300, marginTop:10,}}
            {...params}
            
            label="Station"
            placeholder="Station"
          />
        )}
      />
        
      </Box>
      
            <Box style={{ flexDirection: 'column', display: 'flex', marginLeft: '90px', marginTop: 6 }}>
            <FormControlLabel
          control={<Checkbox  icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}  />}
          label="All Delay Reason" labelPlacement='start'
        />
        <FormControlLabel
          control={<Checkbox  icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}  />}
          label="Delay Reason Controllable" labelPlacement='start'
        />
        <FormControlLabel
          control={<Checkbox  icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}  />}
          label="Delay Reason Non Controllable" labelPlacement='start'
        />
        <FormControlLabel
          control={<Checkbox  icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />} checked={selectedReason.includes('FlightType') && isOTPSelected} onChange={handleReasonChange} value="FlightType" />}
          label="Flight Type" labelPlacement='start'
          disabled={!isOTPSelected}
        />
        <FormControlLabel
          control={<Checkbox  icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />} checked={selectedReason.includes('OTP')} onChange={handleReasonChange} value="OTP" />}
          label="OTP %" labelPlacement='start'
        />
      </Box>

        
     
      <Box className="three-column-menu" style={{ marginRight:50,  }}>
          
          <Box className="column"  >
          <Select size='small'   fullWidth style={{marginTop:5,width:'400px'}} className="dropdown-select" >
        <MenuItem  >All</MenuItem>
        
      </Select>
          </Box>
          <Box className="column">
          <Select size='small'  fullWidth style={{marginTop:5,width:'400px'}} className="dropdown-select">
        <MenuItem  >All</MenuItem>
        
      </Select>
          </Box>
          <Box className="column">
          <Select size='small'  fullWidth style={{marginTop:5,width:'400px'}} className="dropdown-select" >
        <MenuItem  >All</MenuItem>
       
      </Select>
          </Box>
          <Box className="column">
          <Select
  size="small"
  fullWidth
  style={{ marginTop: 5 }}
 
>
  <MenuItem value="All">All</MenuItem>
  <MenuItem value="domestic">Domestic</MenuItem>
  <MenuItem value="international">International</MenuItem>
</Select>

          </Box>
        </Box>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Button style={{ marginTop:73}} onClick={handleShowDetails} type='button' variant='contained' >Get Details</Button>
    <Button style={{marginTop: 73, marginLeft:20}} type='button' variant='contained' >Export excel</Button>
    
        </Box>
        {!fromDate || !toDate ? (
        <Alert style={{  marginTop: 10, display: "flex", justifyContent: "center" , width:600, marginLeft:300}} severity="warning">Please select Date </Alert>
      ) : null}
        {showFlightDataTable && (
   <Box style={{padding:25}}>
     <TableContainer component={Paper} style={{marginTop:30}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Flight No </StyledTableCell>
            <StyledTableCell align="center">Departure</StyledTableCell>
            <StyledTableCell align="right">Arrival</StyledTableCell>
            <StyledTableCell align="right">Delay code</StyledTableCell>
            <StyledTableCell align="center">Delay sub code</StyledTableCell>
            <StyledTableCell align="center">Delay Minutes</StyledTableCell>
            <StyledTableCell align="center">Flight Date</StyledTableCell>
            {showRemarksColumn && <StyledTableCell align="center">Remarks</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
  {flightData.map((flight, index) => (
    <StyledTableRow key={index}>
      <StyledTableCell align="left">{flight.flightNumber}</StyledTableCell>
      <StyledTableCell align="center">{flight.departure}</StyledTableCell>
      <StyledTableCell align="right">{flight.arrival}</StyledTableCell>
      <StyledTableCell align="right">{flight.delayCode}</StyledTableCell>
      <StyledTableCell align="center">{flight.delaySubCode}</StyledTableCell>
      <StyledTableCell align="center">{flight.delayMinutes}</StyledTableCell>
      <StyledTableCell align="center">{flight.flightDate}</StyledTableCell>
      {showRemarksColumn && <StyledTableCell align="center">{flight.remarks}</StyledTableCell>}
    </StyledTableRow>
  ))}
</TableBody>

      </Table>
      </TableContainer>
   </Box>
       )}
     
 


    </Box>
  );
};

export default DelayReason;




