import { Box, Typography } from "@mui/material";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Diagnosis, Gender, Patient } from "../../types";
import { Female, Male } from "@mui/icons-material";
import Other from "../../../assets/other_gender_public_domain.svg?react";
import { assertNever } from "../../utils";
import Entries from "./Entries";

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return <Male />;
    case Gender.Female:
      return <Female />;
    case Gender.Other:
      return <Other />;
    default:
      return assertNever(gender);
  }
};

const ViewPatient = ({diagnosisCodes}: {diagnosisCodes: Diagnosis[]}) => {
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
  }, [patientId]);
  
  if(!patient) {
    return <Typography variant="body1">No patient with that id.</Typography>;
  }
  return (
    <Box>
    <Typography variant="h5" marginY={3}>{patient.name} {genderIcon(patient.gender)}</Typography>
    <Typography variant="body1">ssn: {patient.ssn}</Typography>
    <Typography variant="body1">occupation: {patient.occupation}</Typography>
    {<Entries entries={patient.entries} diagnosisCodes={diagnosisCodes} />}
    </Box>
  );
};
export default ViewPatient;