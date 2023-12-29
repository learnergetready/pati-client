import { Box, Typography } from "@mui/material";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Gender, Patient } from "../types";
import { Female, Male } from "@mui/icons-material";
/// <reference types="vite-plugin-svgr/client" />
import Other from "../../assets/other_gender_public_domain.svg?react";

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case "male":
      return <Male />;
    case "female":
      return <Female />;
    case "other":
      return <Other />;
    default:
      break; // couldn't get exhaustive type checking working here..
  }
};

const ViewPatient = () => {
  const [patient, setPatient] = useState<Patient>();
  const { patientId } = useParams();

  useEffect(() => {
    if(patientId) {
      const findPatient = async (id:string) => {
        const ourPatient = await patientService.getById(id);
        setPatient(ourPatient);
      };
      findPatient(patientId);
    }
  }, []);
  
  if(!patient) {
    return <Typography variant="body1">No patient with that id.</Typography>;
  }
  return (
    <Box>
    <Typography variant="h5" marginY={3}>{patient.name} {genderIcon(patient.gender)}</Typography>
    <Typography variant="body1">ssn: {patient.ssn}</Typography>
    <Typography variant="body1">occupation: {patient.occupation}</Typography>
    </Box>
  );
};
export default ViewPatient;