import { navigate, Route } from '../Router';

const tabs: { route: Route; label: string }[] = [
  { route: 'reports', label: 'Reports' },
  { route: 'requests', label: 'Requests' },
  { route: 'approvals', label: 'Approvals' },
  { route: 'audit_log', label: 'Audit Log' },
  { route: 'user_roles', label: 'User Roles' },
];

export function renderSidebar(el: HTMLElement, active: Route) {
  el.innerHTML = `
    <h1 class="brand">Breadcrumbs Report Manager</h1>
    <nav class="tabs">
      ${tabs.map(t => `
        <button class="tab ${t.route === active ? 'active' : ''}" data-route="${t.route}">
          ${t.label}
        </button>`).join('')}
    </nav>
    <footer class="user">Michael J Fox • Manager</footer>
  `;

  el.querySelectorAll<HTMLButtonElement>('.tab').forEach(btn =>
    btn.addEventListener('click', () => navigate(btn.dataset.route as Route)));
}