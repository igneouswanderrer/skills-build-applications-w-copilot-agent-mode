import { useEffect, useState } from 'react';
import { requireCodespaceName } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const warning = requireCodespaceName();

  useEffect(() => {
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
      : 'http://localhost:8000/api/teams';

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load teams: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.teams)) {
          setTeams(data.teams);
        } else if (Array.isArray(data)) {
          setTeams(data);
        } else {
          setTeams(data.teams || []);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {warning && <div className="alert alert-warning">{warning}</div>}
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id}>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{team.memberCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Teams;
