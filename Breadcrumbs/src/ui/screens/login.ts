import { navigate } from "../router";

export function loginView(root: HTMLElement) {
  root.innerHTML = `
    <form class="login-card" id="login-form">
      <h1 class="login-title">Breadcrumbs</h1>
      <p class="login-subtitle">Sign in to request, submit, find and approve compliance reports.</p>

      <label for="username">Username</label>
      <input id="username" type="text" placeholder="Enter your username" />

      <label for="password">Password</label>
      <input id="password" type="password" placeholder="Password" />

      <p class="login-error" id="login-error" hidden></p>

      <button type="submit" class="btn-dark">Sign In</button>
    </form>
  `;

  const form = root.querySelector<HTMLFormElement>('#login-form')!;
  const username = root.querySelector<HTMLInputElement>('#username')!;
  const password = root.querySelector<HTMLInputElement>('#password')!;
  const error = root.querySelector<HTMLParagraphElement>('#login-error')!;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!username.value.trim() || !password.value) {
      error.textContent = 'Please enter your username and password.';
      error.hidden = false;
      return;
    }

    navigate('reports');
  });
}
