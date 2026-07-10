const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const fallbackHost = 'http://localhost:8000';

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : `${fallbackHost}/api`;

export const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : `${fallbackHost}/api/users`;

export const requireCodespaceName = () => {
  if (!codespaceName) {
    return 'VITE_CODESPACE_NAME is not defined. Add it to .env.local for Codespaces support.';
  }
  return null;
};

export const buildEndpoint = (resource) => `${apiBaseUrl}/${resource}`;
