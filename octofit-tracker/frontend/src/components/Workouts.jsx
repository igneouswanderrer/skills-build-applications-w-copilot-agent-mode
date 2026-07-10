import { useEffect, useState } from 'react';
import { buildEndpoint, requireCodespaceName } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const warning = requireCodespaceName();

  useEffect(() => {
    const endpoint = buildEndpoint('workouts');

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load workouts: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.workouts)) {
          setWorkouts(data.workouts);
        } else if (Array.isArray(data)) {
          setWorkouts(data);
        } else {
          setWorkouts(data.workouts || []);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {warning && <div className="alert alert-warning">{warning}</div>}
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Scheduled</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id}>
                  <td>{workout.title}</td>
                  <td>{workout.category}</td>
                  <td>{workout.difficulty}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{new Date(workout.scheduledFor).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;
