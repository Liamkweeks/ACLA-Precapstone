import { navigate } from '../Router';

export function renderSidebar(el: HTMLElement) {
  el.innerHTML = `
    <button id="nav-reports">Reports</button>
    <button id="nav-requests">Requests</button>
    <button id="nav-approvals">Approvals</button>
    <button id="nav-audit">Audit Log</button>
    <button id="nav-roles">User Roles</button>
  `;
  el.querySelector('#nav-reports')!.addEventListener('click', () => navigate('reports'));
  el.querySelector('#nav-requests')!.addEventListener('click', () => navigate('requests'));
  el.querySelector('#nav-approvals')!.addEventListener('click', () => navigate('approvals'));
  el.querySelector('#nav-audit')!.addEventListener('click', () => navigate('audit_log'));
  el.querySelector('#nav-roles')!.addEventListener('click', () => navigate('user_roles'));
}