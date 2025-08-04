import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../common/theme'; // adjust path as needed
import CreateCustomer from './CustomerRegistration/CreateCustomer';
import CustomerAddress from './CustomerAddress';
import BusinessAddress from './BusinessAddress';
import TinLicenseAddress from './TinLicenseAddress';

const CustomerRegistrationTabs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const tabLabels = [
    'Create Registration',
    'Customer Address',
    'Business Address',
    'Tin/License Address',
  ];

  return (
    <Box m={2}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        {tabLabels.map((label, idx) => (
          <Tab
            key={idx}
            label={
              <Typography
                sx={{
                  fontWeight: 'normal',
                  fontSize: '1rem',
                  color: tabIndex === idx ? colors.purpleAccent[700] : colors.grey[100],
                  textTransform: 'none', // avoid uppercase
                }}
              >
                {label}
              </Typography>
            }
          />
        ))}
      </Tabs>

      <Box mt={2}>
        {tabIndex === 0 && <CreateCustomer />}
        {tabIndex === 1 && <CustomerAddress />}
        {tabIndex === 2 && <BusinessAddress />}
        {tabIndex === 3 && <TinLicenseAddress />}
      </Box>
    </Box>
  );
};

export default CustomerRegistrationTabs;
