import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import diagnosisReducer from "./reducers/diagnosis.ts";
import patientReducer from "./reducers/patient.ts";

const store = configureStore({
  reducer: {
    diagnoses: diagnosisReducer,
    patients: patientReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
