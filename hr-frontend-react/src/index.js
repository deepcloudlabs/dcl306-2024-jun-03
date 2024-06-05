import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";

import HrProvider from "./components/hr/provider/hr-provider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <HrProvider/>
    </>
);
