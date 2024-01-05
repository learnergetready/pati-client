import { Alert, Box, Typography } from "@mui/material";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Gender, NewEntry, Patient } from "../../types";
import { Female, Male } from "@mui/icons-material";
import Other from "../../../assets/other_gender_public_domain.svg?react";
import { assertNever } from "../../utils";
import Entries from "./Entries";
import { isAxiosError } from "axios";

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

const ViewPatient = () => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>("");
  const { patientId } = useParams();

  useEffect(() => {
    if(patientId) {
      const findPatient = async (id:string) => {
        const ourPatient = await patientService.getById(id);
        setPatient(ourPatient);
      };
      try {
        findPatient(patientId);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError("Couldn't find patient.");
        }
      }
      
    }
  }, [patientId]);

  const addEntry = async (patientId: string, newEntry: NewEntry): Promise<void> => {
    if (!patient) {
      throw new Error("No patient found with that id.");
    }
    try {
      const entryWithId = await patientService.createEntry(patientId, newEntry);
      setPatient({ ...patient, entries: patient.entries.concat(entryWithId)});
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          setError("Error. " + error.response?.data);
        setTimeout(() => {
          setError("");
        }, 7000);
        } else {
          setError("Could not add entry. Error: " + error.message);
          setTimeout(() => {
            setError("");
          }, 7000);
      }
      }
    }
  };
  
  if(!patient) {
    return <Typography variant="body1">No patient with that id.</Typography>;
  }
  return (
    <Box>
      {error && <Alert severity="error" >{error}</Alert>}
    <Typography variant="h5" marginY={3}>{patient.name} {genderIcon(patient.gender)}</Typography>
    <Typography variant="body1">ssn: {patient.ssn}</Typography>
    <Typography variant="body1">occupation: {patient.occupation}</Typography>
    {<Entries entries={patient.entries} addEntry={addEntry} />}
    </Box>
  );
};
export default ViewPatient;