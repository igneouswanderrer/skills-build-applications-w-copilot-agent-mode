import { useEffect, useState } from 'react';
import { leaderboardEndpoint, requireCodespaceName } from '../api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const warning = requireCodespaceName();

  useEffect(() => {
    const endpoint = leaderboardEndpoint;

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load leaderboard: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
        } else if (Array.isArray(data)) {
          setLeaderboard(data);
        } else {
          setLeaderboard(data.leaderboard || []);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {warning && <div className="alert alert-warning">{warning}</div>}
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id || entry.id}>
                  <td>{entry.rank}</td>
                  <td>{entry.userId}</td>
                  <td>{entry.teamId || 'N/A'}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
