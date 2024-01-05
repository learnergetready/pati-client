import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";

import ViewPatient from "./components/ViewPatient";
import PatientListPage from "./components/PatientListPage";
import { useAppDispatch } from "./hooks";
import { initializeDiagnoses } from "./reducers/diagnosis";
import { initializePatients } from "./reducers/patient";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    dispatch(initializePatients());
    dispatch(initializeDiagnoses());
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:patientId" element={<ViewPatient />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
