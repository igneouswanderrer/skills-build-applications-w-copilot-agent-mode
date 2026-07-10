import { useEffect, useState } from 'react';
import { requireCodespaceName } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const warning = requireCodespaceName();

  useEffect(() => {
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
      : 'http://localhost:8000/api/activities';

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load activities: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.activities)) {
          setActivities(data.activities);
        } else if (Array.isArray(data)) {
          setActivities(data);
        } else {
          setActivities(data.activities || []);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {warning && <div className="alert alert-warning">{warning}</div>}
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.userId}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{new Date(activity.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
