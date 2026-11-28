import { navigate } from '../router';
import { supabase } from '../../utils/supabase';

export function loginView(root: HTMLElement) {
  root.innerHTML = `
    <form class="login-card" id="login-form">
      <h1 class="login-title">Breadcrumbs</h1>
      <p class="login-subtitle">Sign in to request, submit, find and approve compliance reports.</p>

      <label for="email">Email</label>
      <input id="email" type="email" placeholder="Enter your email" autocomplete="email" />

      <label for="password">Password</label>
      <input id="password" type="password" placeholder="Password" autocomplete="current-password" />

      <p class="login-error" id="login-error" hidden></p>

      <button type="submit" class="btn-dark" id="login-submit">Sign In</button>
    </form>
  `;

  const form = root.querySelector<HTMLFormElement>('#login-form')!;
  const email = root.querySelector<HTMLInputElement>('#email')!;
  const password = root.querySelector<HTMLInputElement>('#password')!;
  const error = root.querySelector<HTMLParagraphElement>('#login-error')!;
  const submit = root.querySelector<HTMLButtonElement>('#login-submit')!;

  function showError(message: string) {
    error.textContent = message;
    error.hidden = false;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    error.hidden = true;
    const emailValue = email.value.trim();
    const passwordValue = password.value;

    if (!emailValue || !passwordValue) {
      showError('Please enter your email and password.');
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Signing In...';

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: emailValue,
        password: passwordValue,
      });

      if (signInError) {
        showError(signInError.message);
        return;
      }

      navigate('reports');
    } catch {
      showError('Unable to sign in right now. Please try again.');
    } finally {
      submit.disabled = false;
      submit.textContent = 'Sign In';
    }
  });
}
