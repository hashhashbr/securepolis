import React from 'react';
import { Box, Typography, Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate(); 

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography level="h4">About SecurePolis</Typography>
      <Typography sx={{ marginTop: 2 }}>
        SecurePolis is a decentralized insurance platform based on blockchain technology.
      </Typography>

      
      <Box sx={{ marginTop: 4 }}>
        <Button onClick={() => navigate('/')} variant="solid" color="danger">
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}

export default About;
