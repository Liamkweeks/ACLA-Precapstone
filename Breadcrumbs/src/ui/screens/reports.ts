import { navigate } from "../router";
import ReportBar from "../components/ReportBar";
import type { ReportStatus } from "../components/ReportBar";
import "../../styles/reports.css";

interface Report {
  title: string;
  status: ReportStatus;
  date: string;
  submitter: string;
  approver: string;
}

// remove when supabase is connected
const reports: Report[] = [
  {
    title: "An Example Report",
    status: "Approved",
    date: "2026-11-30",
    submitter: "Ryland Grace",
    approver: "Eva Stratt",
  },
  {
    title: "A Second Report",
    status: "Pending",
    date: "2026-11-29",
    submitter: "Prue McKeel",
    approver: "Curtis Mehlberg",
  },
  {
    title: "A Third Report",
    status: "Rejected",
    date: "2026-12-02",
    submitter: "Roman Carax",
    approver: "Talia Yang",
  },
];

//add in report cards displayed based on authority i.e. you can see all the requests you've submitted, or all requests for an auditor
export function reportsView(root: HTMLElement) {
  root.innerHTML = /*html*/ `
    <div class="header-bar">
      <h2>Reports</h2>
      <button id="submit-request" class="header-button">Submit Request</button>
    </div>
    <div class="search-container">
      <label for="report-search">Search:</label>
      <input type="text" id="report-search" name="report-search">
      <label for="report-sort">Sort:</label>
      <select name="report-sort" id="report-sort">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="status">Status</option>
        <option value="submitter">Submitter</option>
        <option value="approver">Approver</option>
      </select>
    </div>
    <div class="report-list-container">
      <div class="report-list-header">
        <h2 class="report-bar-text-l">Report name:</h2>
        <h2 class="report-bar-text-l">Submitted by:</h2>
        <h2 class="report-bar-text-l">Approved by:</h2>
        <h2 class="report-bar-text-s">Date:</h2>
        <h2 class="report-bar-text-s">Status:</h2>
      </div>
      <div id="report-list" class="report-bar-list"></div>
    </div>
  `;
  /*
    global styling notes:
    report-list-header should flex horizontally.
    report-bar-text-l and report-bar-text-s should have
    specific flex proportions, refer to Reportbar.ts.
  */

  const list = root.querySelector<HTMLDivElement>("#report-list")!;

  renderList();

  function renderList() {
    if (reports.length === 0) {
      list.innerHTML = /*html*/ `
        <hr color="#2d2d2d">
        <p>No reports here.</p>
      `;
    }

    list.innerHTML = reports
      .map(
        (r) => `
      ${ReportBar(r.title, r.status, new Date(r.date), r.submitter, r.approver)}
    `,
      )
      .join("");
    // Prettier gets weird here for some reason
  }

  root
    .querySelector("#submit-request")!
    .addEventListener("click", () => navigate("new_request"));
}
