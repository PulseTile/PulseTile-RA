import React from 'react';
import { Route } from 'react-router-dom';

import Charts from './pages/Charts';
import PatientSummary from './pages/PatientSummary';
import nonCoreRoutes from "../version/routes";

const coreRoutes = [
    <Route exact path="/charts" component={Charts} />,
    <Route exact path="/summary" component={PatientSummary} />,
];

export default coreRoutes.concat(nonCoreRoutes);