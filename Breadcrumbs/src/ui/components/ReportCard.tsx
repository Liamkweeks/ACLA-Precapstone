type ReportType = "request" | "approval";

export default function ReportCard(
  title: string,
  reportType: ReportType,
  isNew: boolean,
  createdBy: string,
  dueDate: Date,
): string {
  const formattedDueDate = dueDate.toLocaleDateString("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  });
  return `

    <div class="report-card-main">

      <div class="report-card-section">
        <h2>${title}</h2>
        ${isNew ? '<span class="new-badge">New</span>' : ""}
      </div>

      <div class="report-card-section">
        <span >
          ${reportType === "request" ? "Requested by" : "Submitted by"}
        </span>
        <span>${createdBy}</span>
      
      </div>
      
      <div class="report-card-section">
        <span >
          Due: ${formattedDueDate}
        </span>

      
      </div>
    
    </div>
  `;
}
