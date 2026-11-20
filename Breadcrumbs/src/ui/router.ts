import { renderSidebar } from "./layout/sidebar";
import { loginView } from "./screens/login";
import { reportsView } from "./screens/reports";
import { requestsView } from "./screens/requests";
import { newRequestView } from "./screens/newRequests";
import { approvalsView } from "./screens/approvals";
import { auditLogView } from "./screens/auditLog";
import { userRolesView } from "./screens/userAndReports";

export type Route =
  | "login"
  | "reports"
  | "requests"
  | "new_request"
  | "approvals"
  | "audit_log"
  | "user_roles";

const screens: Record<Route, (root: HTMLElement) => void> = {
  login: loginView,
  reports: reportsView,
  requests: requestsView,
  new_request: newRequestView,
  approvals: approvalsView,
  audit_log: auditLogView,
  user_roles: userRolesView,
};

export function navigate(route: Route) {
  const app = document.getElementById('app')!;

  if (route === 'login') {
  app.className = 'login-layout';
  app.innerHTML = '';
  screens.login(app);
  return;
}

  app.className = 'app-layout';
  app.innerHTML = `<aside id="sidebar"></aside><main id="content"></main>`;

  const activeTab: Route = route === 'new_request' ? 'reports' : route;
  renderSidebar(app.querySelector('#sidebar')!, activeTab);

  screens[route](app.querySelector('#content')!);
}
