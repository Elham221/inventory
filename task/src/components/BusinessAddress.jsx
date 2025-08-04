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

const BusinessAddress = () => {
  const [buildingName, setBuildingName] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [businessAddresses, setBusinessAddresses] = useState([]);

  const handleAdd = () => {
    if (buildingName && street && area) {
      const newEntry = {
        id: businessAddresses.length + 1,
        buildingName,
        street,
        area,
      };
      setBusinessAddresses([...businessAddresses, newEntry]);
      setBuildingName('');
      setStreet('');
      setArea('');
    }
  };

  const handleSave = () => {
    console.log('Saving Business Addresses:', businessAddresses);
  };

  return (
    <Box m={2}>
      <Typography variant="h5" gutterBottom>
        Business Address
      </Typography>

      {/* 2 rows x 2 columns grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={2}
        mb={2}
      >
        <TextField
          label="Building Name"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
        />
        <TextField
          label="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          label="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <Box /> {/* Empty grid cell to balance layout */}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        disabled={!buildingName || !street || !area}
      >
        +
      </Button>

 

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

export default BusinessAddress;
