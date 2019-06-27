import React from 'react';
import { Route } from 'react-router-dom';

import ReSPECT from './pages/ReSPECT';
import BusinessIntelligence from "./pages/BusinessIntelligence";

export default [
    <Route exact path="/respect" component={ReSPECT} />,
    <Route exact path="/business" component={BusinessIntelligence} />,
];