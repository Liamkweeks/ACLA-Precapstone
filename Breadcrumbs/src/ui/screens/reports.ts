import { navigate } from "../router";
import ReportCard from "../components/ReportCard";

//add in report cards displayed based on authority i.e. you can see all the requests you've submitted, or all requests for an auditor
export function reportsView(root: HTMLElement) {
  root.innerHTML = `
    <h2>Reports</h2>
    <button id="submit-request">Submit Request</button>
  `;
  root
    .querySelector("#submit-request")!
    .addEventListener("click", () => navigate("new_request"));
}
