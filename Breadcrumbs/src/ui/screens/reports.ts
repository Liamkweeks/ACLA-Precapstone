import { navigate } from "../router";
import ReportCard from "../components/ReportCard";
import "../../styles/reports.css";

//add in report cards displayed based on authority i.e. you can see all the requests you've submitted, or all requests for an auditor
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
