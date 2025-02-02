import { Diagnosis, Entry, NewEntry, HealthCheckEntry, HealthCheckRating, HospitalEntry as HospitalEntryType, OccupationalHealthcareEntry } from "../../types";
import { Box, Typography } from "@mui/material";
import { ascendingAlphabetically, assertNever } from "../../utils";
import { Favorite, HeartBroken, LocalHospital, MedicalServices, MonitorHeart, Work } from "@mui/icons-material";
import { descendingByDate } from "../../utils";
import EntryForm from "./EntryForm";
import { useAppSelector } from "../../hooks";

interface HealthCheckProps {
  entry: HealthCheckEntry;
  diagnosisNameFrom: (code: Diagnosis["code"]) => string;
}

interface HospitalProps {
  entry: HospitalEntryType;
  diagnosisNameFrom: (code: Diagnosis["code"]) => string;
}

interface OccupationalProps {
  entry: OccupationalHealthcareEntry;
  diagnosisNameFrom: (code: Diagnosis["code"]) => string;
}

const entryStyles = {
  bgcolor:"seashell",
  borderStyle:"solid",
  borderColor:"black",
  borderWidth:"1",
  borderRadius: "16px",
};

const HealthScoreIcon = ({score}: {score: HealthCheckRating}) => {
  switch (score) {
    case HealthCheckRating.CriticalRisk:
      return <HeartBroken />;
    case HealthCheckRating.HighRisk:
      return <MonitorHeart />;
    case HealthCheckRating.LowRisk:
      return <Favorite color="warning" />;
    case HealthCheckRating.Healthy:
      return <Favorite color="error" />;
    default:
      return assertNever(score);
  }
};

const HealthcheckEntry = ({entry, diagnosisNameFrom}: HealthCheckProps) => {
  return (
    <Box padding={1} marginY={1} border="thin" sx={entryStyles}>
    <Typography variant="body1"><strong>{entry.date}</strong> <MedicalServices /></Typography>
    <Typography variant="body1" marginTop={1}><i>{entry.description}</i></Typography>
    <HealthScoreIcon score={entry.healthCheckRating} />
    <ul>
      {entry.diagnosisCodes && entry.diagnosisCodes.sort(ascendingAlphabetically).map(c => <li key={entry.id+c}>{c} {diagnosisNameFrom(c)}</li>)}
    </ul>
    <Typography variant="body1">diagnosis by {entry.specialist}</Typography>
    </Box>
  );
};

const HospitalEntry = ({entry, diagnosisNameFrom}: HospitalProps) => {
  return (
    <Box padding={1} marginY={1} border="thin" sx={entryStyles}>
    <Typography variant="body1"><strong>{entry.date}</strong> <LocalHospital /></Typography>
    <Typography variant="body1" marginTop={1}><b>Entry:</b> {entry.description}</Typography>
    <Typography variant="body1" marginTop={1}><b>Discharge:</b> {entry.discharge.criteria} ({entry.discharge.date})</Typography>
    <ul>
      {entry.diagnosisCodes && entry.diagnosisCodes.sort(ascendingAlphabetically).map(c => <li key={entry.id+c}>{c} {diagnosisNameFrom(c)}</li>)}
    </ul>
    <Typography variant="body1" marginTop={3}>diagnosis by {entry.specialist}</Typography>
    </Box>
  );
};

const OccupationalEntry = ({entry, diagnosisNameFrom}: OccupationalProps) => {
  return (
    <Box padding={1} marginY={1} border="thin" sx={entryStyles}>
    <Typography variant="body1"><strong>{entry.date}</strong> <Work /> {entry.employerName}</Typography>
    <Typography variant="body1" marginTop={1}><i>{entry.description}</i></Typography>
    <ul>
      {entry.diagnosisCodes && entry.diagnosisCodes.sort(ascendingAlphabetically).map(c => <li key={entry.id+c}>{c} {diagnosisNameFrom(c)}</li>)}
    </ul>
    {entry.sickLeave && <Typography variant="body1" marginY={3}>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Typography>}
    <Typography variant="body1">diagnosis by {entry.specialist}</Typography>
    </Box>
  );
};

interface EntriesProps {
  entries: Entry[];
  addEntry: (patientId: string, newEntry: NewEntry) => Promise<void>;
}

const Entries = ({entries, addEntry}: EntriesProps) => {
    const diagnosisCodes = useAppSelector(state => state.diagnoses);

    const diagnosisNameFrom = (code: Diagnosis["code"]) => {
      const theDiagnosis = diagnosisCodes.find(d => d.code === code);
      if (theDiagnosis) {
        return theDiagnosis.name;
      } else {
        return "This diagnosis code was not recognized.";
    }};

    return (
      <Box>
        <EntryForm addEntry={addEntry} />
      <Typography variant="h5" marginTop={5} marginBottom={3}>Entries</Typography>
      {entries.sort(descendingByDate).map(entry => {
        switch (entry.type) {
          case "HealthCheck":
            return <HealthcheckEntry key={entry.id} entry={entry} diagnosisNameFrom={diagnosisNameFrom} />;
          case "Hospital":
            return <HospitalEntry key={entry.id} entry={entry} diagnosisNameFrom={diagnosisNameFrom} />;
          case "OccupationalHealthcare":
            return <OccupationalEntry key={entry.id} entry={entry} diagnosisNameFrom={diagnosisNameFrom} />;
          default:
            assertNever(entry);
        }
      })}
      </Box>
    );
  };

  export default Entries;