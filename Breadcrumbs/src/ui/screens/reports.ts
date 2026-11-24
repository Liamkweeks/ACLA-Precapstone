import { navigate } from "../router";
import "../../styles/reports.css";

export function reportsView(root: HTMLElement) {
  root.innerHTML = `
    <div class="header-bar">
      <h2>Reports</h2>
      <button id="submit-request" class="header-button">Submit Request</button>
    </div>
    <div class="pending-bar">
      <p>You have 2 requests pending</p>
    </div>
  `;
  root
    .querySelector("#submit-request")!
    .addEventListener("click", () => navigate("new_request"));
}
