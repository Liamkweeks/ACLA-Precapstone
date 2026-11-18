import { renderSidebar } from "./layout/sidebar";
import { loginView } from "./screens/login";
import { reportsView } from "./screens/Reports";
import { requestsView } from "./screens/Requests";
import { newRequestView } from "./screens/NewRequests";
import { ApprovalsView } from "./screens/Approvals";
import { auditLogView } from "./screens/AuditLog";
import { userRolesView } from "./screens/UserAndReports";

export type Route =
  | "login"
  | "reports"
  | "requests"
  | "new_request"
  | "approvals"
  | "audit_log"
  | "user_roles";

const screens = {
  login: loginView,
  reports: reportsView,
  requests: requestsView,
  new_request: newRequestView,
  approvals: ApprovalsView,
  audit_log: auditLogView,
  user_roles: userRolesView,
};

export function navigate(route: Route) {
  const app = document.getElementById("app")!;
  if (route === "login") {
    app.innerHTML = "";
    screens.login(app);
    return;
  }
  app.innerHTML = `<aside id="sidebar"></aside><main id="content"></main>`;
  renderSidebar(app.querySelector("#sidebar")!);
  screens[route](app.querySelector("#content")!);
}
