import React from 'react';
import { Route } from 'react-router-dom';

import Charts from './pages/Charts';
import PatientSummary from './pages/PatientSummaryInfo';

export default [
    <Route exact path="/charts" component={Charts} />,
    <Route exact path="/summary" component={PatientSummary} />,
];