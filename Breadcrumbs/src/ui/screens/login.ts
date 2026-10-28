import { navigate } from '../router';

export function loginView(root: HTMLElement) {
  root.innerHTML = `<h2>Login</h2><button id="go">Sign In</button>`;
  root.querySelector('#go')!.addEventListener('click', () => navigate('reports'));
}