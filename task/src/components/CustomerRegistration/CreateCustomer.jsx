import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useMediaQuery,
  Snackbar,
  Alert,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from '../../common/Header';

const CreateCustomer = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const [additionalInfo, setAdditionalInfo] = useState('');
  const [additionalValue, setAdditionalValue] = useState('');
  const [additionalList, setAdditionalList] = useState([]);

  const initialValues = {
    customerName: '',
    vatNo: '',
    tinNo: '',
    customerType: '',
    licenseIssuedDate: '',
    licenseNo: '',
    registrationDate: '',
    tradeName: '',
    contactPerson: '',
    businessType: '',
  };

  const customerSchema = yup.object().shape({
    customerName: yup.string().required('Customer name is required'),
    vatNo: yup.string().required('VAT number is required'),
    tinNo: yup.string().required('TIN number is required'),
    customerType: yup.string().required('Customer type is required'),
    licenseIssuedDate: yup
      .date()
      .required('Issued date is required')
      .test('is-future', 'Issued date must be today or in the future', (value) => {
        if (!value) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(value) >= today;
      }),
    licenseNo: yup.string().required('License number is required'),
    registrationDate: yup
      .date()
      .required('Registration date is required')
      .test('is-future', 'Registration date must be today or in the future', (value) => {
        if (!value) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(value) >= today;
      }),
    tradeName: yup.string(),
    contactPerson: yup.string(),
    businessType: yup.string().required('Business type is required'),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setNotification({
        open: true,
        message: 'Customer created successfully!',
        severity: 'success',
      });
      resetForm();
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to create customer.',
        severity: 'error',
      });
      console.error('Error creating customer:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setNotification({ ...notification, open: false });
  };

  const handleAddInfo = () => {
    if (additionalInfo && additionalValue) {
      setAdditionalList([
        ...additionalList,
        {
          id: additionalList.length + 1,
          label: additionalInfo,
          value: additionalValue,
        },
      ]);
      setAdditionalInfo('');
      setAdditionalValue('');
    }
  };

  return (
    <Box m="15px">
      <Header title="Registration" subtitle="" />

      <Formik
        initialValues={initialValues}
        validationSchema={customerSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                label="Customer Name"
                name="customerName"
                value={values.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.customerName && !!errors.customerName}
                helperText={touched.customerName && errors.customerName}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                label="VAT No."
                name="vatNo"
                value={values.vatNo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.vatNo && !!errors.vatNo}
                helperText={touched.vatNo && errors.vatNo}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                label="Trade Name"
                name="tradeName"
                value={values.tradeName}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: 'span 2' }}
              />

              <FormControl fullWidth sx={{ gridColumn: 'span 2' }}>
                <InputLabel id="business-type-label">Business Type</InputLabel>
                <Select
                  labelId="business-type-label"
                  name="businessType"
                  value={values.businessType}
                  label="Business Type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.businessType && !!errors.businessType}
                >
                  <MenuItem value="private">Private</MenuItem>
                  <MenuItem value="government">Government</MenuItem>
                </Select>
                {touched.businessType && errors.businessType && (
                  <Box color="red" fontSize="12px">{errors.businessType}</Box>
                )}
              </FormControl>

              <TextField
                fullWidth
                label="Contact Person"
                name="contactPerson"
                value={values.contactPerson}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                label="TIN No."
                name="tinNo"
                value={values.tinNo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tinNo && !!errors.tinNo}
                helperText={touched.tinNo && errors.tinNo}
                sx={{ gridColumn: 'span 2' }}
              />

              <FormControl fullWidth sx={{ gridColumn: 'span 2' }}>
                <InputLabel id="customer-type-label">Customer Type</InputLabel>
                <Select
                  labelId="customer-type-label"
                  name="customerType"
                  value={values.customerType}
                  label="Customer Type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.customerType && !!errors.customerType}
                >
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="organization">Organization</MenuItem>
                </Select>
                {touched.customerType && errors.customerType && (
                  <Box color="red" fontSize="12px">{errors.customerType}</Box>
                )}
              </FormControl>

              <TextField
                fullWidth
                label="License Issued Date"
                name="licenseIssuedDate"
                type="date"
                value={values.licenseIssuedDate}
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{ shrink: true }}
                error={touched.licenseIssuedDate && !!errors.licenseIssuedDate}
                helperText={touched.licenseIssuedDate && errors.licenseIssuedDate}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                label="License No."
                name="licenseNo"
                value={values.licenseNo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.licenseNo && !!errors.licenseNo}
                helperText={touched.licenseNo && errors.licenseNo}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                label="Registration Date"
                name="registrationDate"
                type="date"
                value={values.registrationDate}
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{ shrink: true }}
                error={touched.registrationDate && !!errors.registrationDate}
                helperText={touched.registrationDate && errors.registrationDate}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>

            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Customer
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>

      {/* --------------------- Additional Info Section --------------------- */}
      <Box
        mt={5}
        sx={{
          minHeight: 150,
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" mb={2}>Additional Information</Typography>

        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" mb={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="add-info-label">Select Info</InputLabel>
            <Select
              labelId="add-info-label"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              label="Select Info"
            >
              <MenuItem value=""><em>--- Select One ---</em></MenuItem>
              <MenuItem value="Phone">Phone</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Address">Address</MenuItem>
              <MenuItem value="Tax Center">Tax Center</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Additional Information Value"
            value={additionalValue}
            onChange={(e) => setAdditionalValue(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Box>
<Box mt={5}
        sx={{
          minHeight: 150,
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 1,
        }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Label ID</TableCell>
              <TableCell>Label Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {additionalList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">No records found.</TableCell>
              </TableRow>
            ) : (
              additionalList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        </Box>

        <Box mt={2} display="flex" justifyContent="flex-start">
          <Button
            variant="contained"
            color='secondary'
            onClick={handleAddInfo}
            >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCustomer;
