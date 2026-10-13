import { useState } from 'react';
import { requestPrediction } from '../services/predictionApi';
import { fields, sections } from '../data/fields';

export function PredictionForm({ predictionState, onPrediction, onViewResults }) {
  const [values, setValues] = useState(() => {
    if (!predictionState?.features) return {};
    return Object.fromEntries(
      Object.entries(predictionState.features).map(([name, value]) => [name, String(value)]),
    );
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateValue(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setError('');
  }

  function clearForm() {
    setValues({});
    setError('');
  }

  async function submit(event) {
    event.preventDefault();

    const missing = fields
      .filter(({ name }) => !values[name])
      .map(({ label }) => label);

    if (missing.length) {
      setError(`Please complete all 13 clinical variables. Missing: ${missing.join(', ')}.`);
      return;
    }

    const features = Object.fromEntries(
      fields.map(({ name }) => [name, Number(values[name])]),
    );

    setLoading(true);
    setError('');

    try {
      const result = await requestPrediction(features);
      onPrediction(features, result);
    } catch (requestError) {
      setError(requestError.message || 'Unable to reach the prediction service. Check that Flask is running at 127.0.0.1:5000.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <div className="ledger-sheet form-sheet">
        <div className="watermark">℞</div>
        <FormIntro />
        <form onSubmit={submit} noValidate>
          {sections.map(([name, meta], index) => (
            <FormSection
              key={name}
              name={name}
              meta={meta}
              index={index}
              values={values}
              onChange={updateValue}
            />
          ))}
          {error && (
            <div className="validation-error">
              <strong>FORM INCOMPLETE</strong>
              <span>{error}</span>
              {Object.keys(values).length === fields.length && (
                <button type="button" className="retry-button" onClick={() => submit({ preventDefault() {} })}>
                  RETRY REQUEST
                </button>
              )}
            </div>
          )}
          {loading && (
            <div className="loading-panel">
              <strong>⟳　Generating prediction...</strong>
              <span>Please wait while the model processes your information.</span>
            </div>
          )}
          {predictionState && !loading && (
            <div className="success-panel">
              <div>
                <strong>✓　PREDICTION COMPLETE</strong>
                <h3>Your prediction is ready.</h3>
                <p>View the model result and the information you submitted.</p>
              </div>
              <button type="button" onClick={onViewResults}>VIEW YOUR RESULTS　→</button>
            </div>
          )}
          <div className="form-actions">
            <div>
              <button className="primary-button" disabled={loading}>
                ⚗　{loading ? 'ANALYZING...' : 'SUBMIT & PREDICT'}
              </button>
              <button type="button" className="quiet-button clear-button" onClick={clearForm}>
                CLEAR FORM
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormIntro() {
  return (
    <div className="form-intro">
      <div className="heartcare-title"><span>♧</span> HEARTCARE</div>
      <h1>Heart Disease Prediction</h1>
      <p>Enter the required health information to generate a heart disease prediction.</p>
    </div>
  );
}

function FormSection({ name, meta, index, values, onChange }) {
  return (
    <section className={`form-section section-${index + 1}`}>
      <div className="section-heading">
        <h2><b>{['I', 'II', 'III', 'IV'][index]}</b>{name}</h2>
        <span>{meta}</span>
      </div>
      <div className="field-grid">
        {fields.filter((field) => field.section === name).map((field) => (
          <Field
            key={field.name}
            field={field}
            index={fields.indexOf(field) + 1}
            value={values[field.name] || ''}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  );
}

function Field({ field, index, value, onChange }) {
  const input = field.type === 'select' ? (
    <select name={field.name} required value={value} onChange={(event) => onChange(field.name, event.target.value)}>
      <option value="" disabled>Select formulation...</option>
      {field.options.map(([optionValue, text]) => (
        <option key={optionValue} value={optionValue}>{text}</option>
      ))}
    </select>
  ) : (
    <input name={field.name} required type="number" value={value} min={field.min} max={field.max} step={field.step || 1} placeholder={field.placeholder} onChange={(event) => onChange(field.name, event.target.value)} />
  );

  return (
    <label className="field">
      <span className="field-label">
        <b>{index}. {field.label}</b>
        <i>{field.unit ? `[${field.unit}]` : field.type === 'select' ? '[Categorical]' : ''}</i>
      </span>
      <span className="input-wrap">{input}{field.unit && <em>{field.unit}</em>}</span>
      <small>{field.note}</small>
    </label>
  );
}
