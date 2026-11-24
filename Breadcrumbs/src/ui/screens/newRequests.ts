export function newRequestView(root: HTMLElement) {
  root.innerHTML = `
   <form class="requestForm" id="request-form">
      <h1 class="request-form-title">New Request</h1>
      
      <label for="submitter-email">Target Email</label>
      <input id="submitter-email" type="email" placeholder="www.placeholder@email.com" />

      <label for="request-description">Request Description</label>
      <input id="request-description" type="text" placeholder="Describe this request." />

      <label for="tags">Tags</label>
      <input id="tags" type="text" placeholder="temporary tags field - this will change when wired up?"/>
      
      <p class="no-submitter-email-error" id="no-submitter-email-error" hidden></p>

      <button type="submit">Submit Request</button>
    </form>`;
  
}
//tags need to be wired up, how do we handle autofilled/autocompleted tag selection?