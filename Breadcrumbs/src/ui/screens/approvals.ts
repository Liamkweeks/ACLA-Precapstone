import ReportCard from "../components/ReportCard";
import "../../styles/approvals.css"
export function approvalsView(root: HTMLElement) {
  root.innerHTML = `
    <h2>Approvals</h2>

    <div class="approvals-layout">
      <div class="approvals-list-section">
        <h2>Approvals Pending</h2>
        <div class="report-card-list">
        ${ReportCard("Report", "approval", true, "Ash", new Date("2020-10-26"))}
          ${ReportCard("Report", "approval", true, "Ash", new Date("2020-10-26"))}

          ${ReportCard("Report", "approval", true, "Ash", new Date("2020-10-26"))}

          ${ReportCard("Report", "approval", false, "Ash", new Date("2020-10-26"))}

        </div>
      </div>
      <div class="approvals-main-section">
        <div id="report-review-card">
          <h2>Report Review</h2>
          <div class="review-info-section">
            <span class="review-info-text">Submitted by: Ash</span>
            <span class="review-info-text">Due by: October 26, 2020</span>
          </div>

          <h2>Report File</h2>

          <div class="review-info-file">
            <div id="review-info-file-info">
              <span>file-name.pdf</span>
              <span>1.2 MB · Uploaded</span>
            </div>
            <div class="file-button">
              Open file
            </div>

          </div>

          <h2>Additional Notes</h2>

          <div class="text-input-box">

            Add additional notes here
          </div>

          <h2>Manager Signature</h2>
          
          <div class="signature-box">
            Sign Here
          </div>
          <div class="review-buttons">
            <div id="reject-button">Reject</div>
            <div id="approve-button">Approve</div>
          </div>



        </div> 
      </div>
    </div>
    `;
}
