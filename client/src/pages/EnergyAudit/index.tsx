import React from 'react';
import {
    Box,
    Typography
} from '@mui/material';
import EnergyAuditTables from './EnergyAuditTables'; // Import the EnergyAuditTables component

const EnergyAudit = () => {
    return (
        <Box sx={{ p: 3 }}>
            <EnergyAuditTables /> {/* Integrate the EnergyAuditTables component */}
        </Box>
    );
};

export default EnergyAudit;
