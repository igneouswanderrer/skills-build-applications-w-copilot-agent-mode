const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const fallbackHost = 'http://localhost:8000';

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : `${fallbackHost}/api`;

export const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : `${fallbackHost}/api/users`;

export const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : `${fallbackHost}/api/activities`;

export const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : `${fallbackHost}/api/teams`;

export const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : `${fallbackHost}/api/leaderboard`;

export const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : `${fallbackHost}/api/workouts`;

export const requireCodespaceName = () => {
  if (!codespaceName) {
    return 'VITE_CODESPACE_NAME is not defined. Add it to .env.local for Codespaces support.';
  }
  return null;
};

export const buildEndpoint = (resource) => `${apiBaseUrl}/${resource}`;
