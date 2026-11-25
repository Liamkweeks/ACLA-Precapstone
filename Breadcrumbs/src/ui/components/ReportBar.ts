export type ReportStatus = "Approved" | "Pending" | "Rejected";

export default function ReportBar(
  title: string,
  status: ReportStatus,
  date: Date,
  submitter: string,
  approver: string,
): string {
  const formattedDate = date.toLocaleDateString("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  });
  let statusColor: string;
  switch (status) {
    case "Approved":
      statusColor = "#dcfce7";
      break;

    case "Pending":
      statusColor = "#fcf9dc";
      break;

    case "Rejected":
      statusColor = "#fcdddc";
      break;
  }

  return /*html*/ `
  <hr color="#2d2d2d" size="2px">
  <div class="report-bar-main">
    <p class="report-bar-text-l">${title}</p>
    <p class="report-bar-text-l">${submitter}</p>
    <p class="report-bar-text-l">${approver}</p>
    <p class="report-bar-text-s">${formattedDate}</p>
    <div class="report-bar-status" style="background-color:${statusColor};">
      <p>${status}</p>
    </div>
  </div>
  `;
  /*
    global styling notes:
    report-bar-main should flex horizontally.
    report-bar-text-l and report-bar-text-s should be left aligned.
    report-bar-text-l, report-bar-text-s, and report-bar-status
    should have flex proportions based on the figma design.
  */
}
