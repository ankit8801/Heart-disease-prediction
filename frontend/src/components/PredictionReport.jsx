import { fields } from '../data/fields';

function displayValue(field, value) {
  const option = field.options?.find(([optionValue]) => Number(optionValue) === Number(value));
  return option ? option[1] : `${value}${field.unit ? ` ${field.unit}` : ''}`;
}

export function PredictionReport({ features, result, createdAt, onNewPrediction }) {
  const prediction = Number(result.prediction);
  const probability = result.class_1_probability_percent;
  const label = result.prediction_label || (prediction === 1 ? 'Heart Disease' : 'No Heart Disease');

  return (
    <div className="report-page">
      <div className="report-console">
        <b>HEART DISEASE PREDICTION REPORT</b>
        <div className="report-actions">
          <button className="quiet-button" onClick={onNewPrediction}>NEW PREDICTION</button>
          <button className="primary-button" onClick={() => window.print()}>PRINT REPORT</button>
        </div>
      </div>
      <article className="archival-sheet">
        <div className="report-frame">
          <div className="corner corner-tl">⌜</div>
          <div className="corner corner-tr">⌝</div>
          <div className="corner corner-bl">⌞</div>
          <div className="corner corner-br">⌟</div>
          <div className="report-head">
            <div className="report-emblem">♡</div>
            <strong>HEARTCARE</strong>
            <span>HEART DISEASE PREDICTION REPORT</span>
            <em>Educational machine learning project</em>
            <div className="ornament">—　❧ ◆ ☙　—</div>
            <p>This report summarizes the submitted health information and the model response.</p>
          </div>
          <ReportSectionLabel text="REPORT DETAILS" />
          <div className="report-meta">
            <Meta label="Report Date" value={createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
            <Meta label="Report Time" value={createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} />
            <Meta label="Status" value="Prediction complete" />
          </div>
          <ReportSectionLabel text="PREDICTION RESULT" />
          <div className={`finding ${prediction === 1 ? 'positive' : ''}`}>
            <div className="finding-copy">
              <small>MODEL PREDICTION</small>
              <h1>{label.toUpperCase()}</h1>
              <span className="class-badge">PREDICTION CLASS: {result.prediction}</span>
            </div>
            <div className="seal">
              <small>CLASS</small>
              <b>{result.prediction}</b>
              <small>MODEL RESULT</small>
            </div>
          </div>
          <ReportSectionLabel text="HEALTH INFORMATION" />
          <table className="measurements">
            <thead><tr><th>N°</th><th>Feature</th><th>Submitted Value</th></tr></thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.name}>
                  <td>{String(index + 1).padStart(2, '0')}</td>
                  <td>{field.label} <small>({field.name})</small></td>
                  <td>{displayValue(field, features[field.name])}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReportSectionLabel text="MODEL SCORE" />
          <div className="probability">
            <div className="gauge" style={{ '--progress': `${probability ?? 0}%` }}>
              <span>{probability == null ? 'N/A' : `${probability}%`}</span>
            </div>
            <div>
              <b>MODEL-ESTIMATED PROBABILITY FOR CLASS 1</b>
              <small>This value comes from the prediction model.</small>
              <i>It is not a clinically validated estimate of personal medical risk.</i>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Meta({ label, value }) {
  return <div><small>{label}</small><b>{value}</b></div>;
}

function ReportSectionLabel({ text }) {
  return <div className="report-section-label"><b>{text}</b></div>;
}
