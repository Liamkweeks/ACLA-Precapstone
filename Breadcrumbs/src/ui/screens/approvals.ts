import ReportCard from "../components/ReportCard";
export function approvalsView(root: HTMLElement) {
  root.innerHTML = `
    <h2>Approvals</h2>
    ${ReportCard("Report", "approval", true, "Ash", new Date("2020-10-26"))}
  `;
}
