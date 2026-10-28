import { renderSidebar } from './layout/sidebar';
import { loginView } from './screens/login';
import { reportsView } from './screens/reports';
import { requestsView } from './screens/requests';
import { newRequestView } from './screens/new_requests';
import { approvalsView } from './screens/approvals';
import { auditLogView } from './screens/audit_log';
import { userRolesView } from './screens/user_and_roles';

export type Route = 'login' | 'reports' | 'requests' | 'new_request' | 'approvals' | 'audit_log' | 'user_roles';

const screens = { login: loginView, reports: reportsView, requests: requestsView, new_request: newRequestView, approvals: approvalsView, audit_log: auditLogView, user_roles: userRolesView };

export function navigate(route: Route) {
  const app = document.getElementById('app')!;
  if (route === 'login') {
    app.innerHTML = '';
    screens.login(app);
    return;
  }
  app.innerHTML = `<aside id="sidebar"></aside><main id="content"></main>`;
  renderSidebar(app.querySelector('#sidebar')!);
  screens[route](app.querySelector('#content')!);
}