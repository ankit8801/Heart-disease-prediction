export const fields = [
  { name: 'age', label: 'Age', unit: 'Years', type: 'number', min: 18, max: 110, placeholder: 'e.g. 54', note: 'Enter age in years.', section: 'Basic Information' },
  { name: 'sex', label: 'Sex', type: 'select', options: [['0', 'Female'], ['1', 'Male']], note: 'Select sex.', section: 'Basic Information' },
  { name: 'cp', label: 'Chest Pain Type', type: 'select', options: [['0', 'Category 0 — Typical Angina'], ['1', 'Category 1 — Atypical Angina'], ['2', 'Category 2 — Non-anginal Pain'], ['3', 'Category 3 — No Symptoms']], note: 'Select the appropriate category.', section: 'Heart Measurements' },
  { name: 'trestbps', label: 'Resting Blood Pressure', unit: 'mm Hg', type: 'number', min: 80, max: 240, placeholder: 'e.g. 130', note: 'Enter resting blood pressure in mm Hg.', section: 'Heart Measurements' },
  { name: 'chol', label: 'Cholesterol', unit: 'mg/dL', type: 'number', min: 100, max: 600, placeholder: 'e.g. 242', note: 'Enter cholesterol in mg/dL.', section: 'Heart Measurements' },
  { name: 'fbs', label: 'Fasting Blood Sugar', type: 'select', options: [['0', 'No — 120 mg/dL or less (0)'], ['1', 'Yes — Above 120 mg/dL (1)']], note: 'Indicate whether fasting blood sugar exceeds 120 mg/dL.', section: 'Heart Measurements' },
  { name: 'restecg', label: 'Resting ECG', type: 'select', options: [['0', 'Category 0 — Normal'], ['1', 'Category 1 — ST-T Abnormality'], ['2', 'Category 2 — Ventricular Hypertrophy']], note: 'Select the recorded ECG category.', section: 'Cardiac Measurements' },
  { name: 'thalach', label: 'Maximum Heart Rate', unit: 'BPM', type: 'number', min: 60, max: 220, placeholder: 'e.g. 152', note: 'Enter the maximum heart rate in beats per minute.', section: 'Cardiac Measurements' },
  { name: 'exang', label: 'Exercise-Induced Angina', type: 'select', options: [['0', 'No (0)'], ['1', 'Yes (1)']], note: 'Indicate whether exercise-induced angina is present.', section: 'Cardiac Measurements' },
  { name: 'oldpeak', label: 'ST Depression (Oldpeak)', unit: 'mm', type: 'number', min: 0, max: 8, step: 0.1, placeholder: 'e.g. 1.2', note: 'Enter the Oldpeak value.', section: 'Additional Measurements' },
  { name: 'slope', label: 'ST Segment Slope', type: 'select', options: [['0', 'Category 0 — Upsloping'], ['1', 'Category 1 — Flat'], ['2', 'Category 2 — Downsloping']], note: 'Select the recorded slope category.', section: 'Additional Measurements' },
  { name: 'ca', label: 'Number of Major Vessels', type: 'select', options: [['0', '0 Vessels'], ['1', '1 Vessel'], ['2', '2 Vessels'], ['3', '3 Vessels'], ['4', '4 Vessels']], note: 'Select the recorded category.', section: 'Additional Measurements' },
  { name: 'thal', label: 'Thal', type: 'select', options: [['0', 'Category 0 — Not Tested'], ['1', 'Category 1 — Normal'], ['2', 'Category 2 — Fixed Defect'], ['3', 'Category 3 — Reversible Defect']], note: 'Select the recorded Thal category.', section: 'Additional Measurements' },
];

export const sections = [
  ['Basic Information', 'PATIENT DETAILS'],
  ['Heart Measurements', 'BLOOD PRESSURE AND CHOLESTEROL'],
  ['Cardiac Measurements', 'HEART FUNCTION'],
  ['Additional Measurements', 'OTHER HEALTH MEASUREMENTS'],
];
