import React from 'react';
import { Route } from 'react-router-dom';

import BusinessIntelligence from "./pages/BusinessIntelligence";

export default [
    <Route exact path="/business" component={BusinessIntelligence} />,
];