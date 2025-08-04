import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
} from '@mui/material';

const CustomerAddress = () => {
  const [houseNo, setHouseNo] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [poBox, setPoBox] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [addressInput, setAddressInput] = useState(''); // The selected address string

  // For dialog control and selections
  const [openDialog, setOpenDialog] = useState(false);
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');

  // Sample data for address selection
  const regionsByCountry = {
    Ethiopia: {
      Oromia: ['Adama', 'Jimma'],
      Amhara: ['Bahir Dar', 'Gondar'],
    },
  };

  // Open dialog for address selection
  const handleOpenDialog = () => setOpenDialog(true);
  // Close dialog and reset selections
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCountry('');
    setRegion('');
    setCity('');
  };

  // When user clicks Add in dialog, save selected address string
  const handleSelectAddress = () => {
    const selectedAddress = `${country} - ${region} - ${city}`;
    setAddressInput(selectedAddress);
    handleCloseDialog();
  };

  // Save handler for customer info
  const handleSave = () => {
    if (!addressInput) {
      alert('Please select an Address using the + button.');
      return;
    }
    if (!houseNo || !mobileNo || !poBox) {
      alert('Please fill House No., Mobile No., and P.O. Box.');
      return;
    }
    const newEntry = {
      id: addresses.length + 1,
      address: addressInput,
      houseNo,
      mobileNo,
      poBox,
    };
    setAddresses([...addresses, newEntry]);
    setHouseNo('');
    setMobileNo('');
    setPoBox('');
    setAddressInput('');
  };

  return (
    <Box m={2}>
      <Typography variant="h5" gutterBottom>
        Customer Address
      </Typography>

      {/* Address field + + button side by side */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <TextField
          label="Address"
          value={addressInput}
          disabled
          helperText="Use only the + button to select"
          fullWidth
        />
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleOpenDialog}
          sx={{ minWidth: '40px', padding: '6px 12px' }}
        >
          +
        </Button>
      </Box>

      {/* Other fields in grid */}
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={2}>
        <TextField
          label="House No."
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
        />
        <TextField
          label="Mobile No."
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
        <TextField
          label="P.O. Box"
          value={poBox}
          onChange={(e) => setPoBox(e.target.value)}
        />
        <Box /> {/* empty grid cell */}
      </Box>

      {/* Display added addresses in table */}
    

      {/* Save Button */}
      <Box mt={2}>
        <Button variant="contained" color="secondary" onClick={handleSave}>
          Save
        </Button>
      </Box>

      {/* Address Selection Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Address</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}
        >
          <Select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setRegion('');
              setCity('');
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Country
            </MenuItem>
            {Object.keys(regionsByCountry).map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>

          {country && (
            <Select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setCity('');
              }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Region
              </MenuItem>
              {Object.keys(regionsByCountry[country]).map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          )}

          {region && (
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select City
              </MenuItem>
              {regionsByCountry[country][region].map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSelectAddress}
            disabled={!country || !region || !city}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerAddress;
