import { navigate } from '../router';

export function reportsView(root: HTMLElement) {
  root.innerHTML = `
    <h2>Reports</h2>
    <button id="submit-request">Submit Request</button>
  `;
  root.querySelector('#submit-request')!.addEventListener('click', () => navigate('new_request'));
}