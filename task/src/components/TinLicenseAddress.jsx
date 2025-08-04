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
} from '@mui/material';

const TinLicenseAddress = () => {
  const [tinNumber, setTinNumber] = useState('');
  const [tradeLicenseNumber, setTradeLicenseNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [licenses, setLicenses] = useState([]);

  const handleAdd = () => {
    if (tinNumber && tradeLicenseNumber && issueDate && expiryDate) {
      const newEntry = {
        id: licenses.length + 1,
        tinNumber,
        tradeLicenseNumber,
        issueDate,
        expiryDate,
      };
      setLicenses([...licenses, newEntry]);
      setTinNumber('');
      setTradeLicenseNumber('');
      setIssueDate('');
      setExpiryDate('');
    }
  };

  const handleSave = () => {
    console.log('Saving license data:', licenses);
    // TODO: Replace with actual API call or state logic
  };

  return (
    <Box m={2}>
      <Typography variant="h5" gutterBottom>
        TIN / Trade License Details
      </Typography>

      {/* Form with 2 rows and 2 columns */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={2}
        mb={2}
      >
        <TextField
          label="TIN Number"
          value={tinNumber}
          onChange={(e) => setTinNumber(e.target.value)}
        />
        <TextField
          label="Trade License Number"
          value={tradeLicenseNumber}
          onChange={(e) => setTradeLicenseNumber(e.target.value)}
        />
        <TextField
          label="Issue Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
        />
        <TextField
          label="Expiry Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
      </Box>

      {/* Table */}
    

      {/* Save Button */}
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TinLicenseAddress;
