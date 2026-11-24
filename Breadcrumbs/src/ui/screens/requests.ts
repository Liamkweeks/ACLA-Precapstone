import '../../styles/requests.css';
import ReportCard from '../components/ReportCard';

interface ReportRequest {
  id: string;
  reportType: string;
  requestedBy: string;
  dueDate: string;
  instructions: string;
  submitted: boolean;
}

// remove when supabase is connected
const requests: ReportRequest[] = [
  { id: 'r1', reportType: 'Server Backup Log',       requestedBy: 'Lara Croft',      dueDate: '2026-11-25', instructions: 'Confirm nightly backups completed for all servers this week.', submitted: false },
  { id: 'r2', reportType: 'User Access Review',      requestedBy: 'Chris Redfield',  dueDate: '2026-11-27', instructions: '', submitted: false },
  { id: 'r3', reportType: 'Patch Management Report', requestedBy: 'Lara Croft',      dueDate: '2026-11-30', instructions: '', submitted: false },
  { id: 'r4', reportType: 'Antivirus Scan Summary',  requestedBy: 'Jill Valentine',  dueDate: '2026-12-02', instructions: 'Include any threats found and how they were resolved.', submitted: false },
  { id: 'r5', reportType: 'Password Policy Audit',   requestedBy: 'Chris Redfield',  dueDate: '2026-12-05', instructions: '', submitted: true },
];

const ALLOWED_TYPES = ['pdf', 'docx', 'xlsx', 'csv', 'txt'];
const MAX_SIZE_MB = 25;

export function requestsView(root: HTMLElement) {
  let selectedId: string | null = requests.find(r => !r.submitted)?.id ?? null;
  let chosenFile: File | null = null;

  root.innerHTML = `
    <h2>Requests</h2>

    <div class="requests-layout">
      <div class="requests-list-section">
        <h2>Requested Reports</h2>
        <div id="request-list" class="report-card-list"></div>
      </div>

      <div class="requests-main-section">
        <div id="submission-card"></div>
      </div>
    </div>
  `;

  const list = root.querySelector<HTMLDivElement>('#request-list')!;
  const card = root.querySelector<HTMLDivElement>('#submission-card')!;

  renderList();
  renderForm();

  function renderList() {
    if (requests.length === 0) {
      list.innerHTML = `<p class="empty-text">No report requests yet.</p>`;
      return;
    }

    list.innerHTML = requests.map(r => `
      <button class="request-card-btn ${r.id === selectedId ? 'selected' : ''} ${r.submitted ? 'submitted' : ''}" data-id="${escapeHtml(r.id)}">
        ${ReportCard(
          escapeHtml(r.reportType),
          'request',
          !r.submitted,
          escapeHtml(r.requestedBy),
          new Date(r.dueDate),
        )}
      </button>
    `).join('');

    list.querySelectorAll<HTMLButtonElement>('.request-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedId = btn.dataset.id ?? null;
        chosenFile = null;
        renderList();
        renderForm();
      });
    });
  }

  
  function renderForm() {
    const request = requests.find(r => r.id === selectedId);

    if (!request) {
      card.innerHTML = `<p class="empty-text">Select a request to submit a report.</p>`;
      return;
    }

    if (request.submitted) {
      card.innerHTML = `
        <h2>Report Submission</h2>
        <p class="empty-text">${escapeHtml(request.reportType)} has been submitted and is waiting for approval.</p>
      `;
      return;
    }

    card.innerHTML = `
      <form id="submit-form" novalidate>
        <h2>Report Submission</h2>
        <div class="review-info-section">
          <span class="review-info-text">Report: ${escapeHtml(request.reportType)}</span>
          <span class="review-info-text">Requested by: ${escapeHtml(request.requestedBy)}</span>
          <span class="review-info-text">Due by: ${formatDate(request.dueDate)}</span>
        </div>

        ${request.instructions ? `
          <h2>Instructions</h2>
          <p class="instructions-text">${escapeHtml(request.instructions)}</p>
        ` : ''}

        <h2>Report File</h2>
        <div id="dropzone" class="dropzone" tabindex="0">
          <span class="dropzone-icon" aria-hidden="true">&#8679;</span>
          <span class="dropzone-text">Drag and drop your report here</span>
          <span>or</span>
          <button type="button" id="browse-button" class="file-button">Browse files</button>
          <span class="dropzone-types">${ALLOWED_TYPES.map(t => t.toUpperCase()).join(', ')} · max ${MAX_SIZE_MB} MB</span>
          <input id="file-input" type="file" accept="${ALLOWED_TYPES.map(t => '.' + t).join(',')}" hidden />
        </div>

        <div id="selected-file"></div>

        <h2>Additional Notes</h2>
        <textarea id="notes" class="text-input-box" rows="3" placeholder="Add additional notes here"></textarea>

        <p id="form-error" class="form-error" hidden></p>

        <div class="review-buttons">
          <button type="button" id="cancel-button">Cancel</button>
          <button type="submit" id="submit-button">Submit</button>
        </div>
      </form>
    `;

    const form = card.querySelector<HTMLFormElement>('#submit-form')!;
    const dropzone = card.querySelector<HTMLDivElement>('#dropzone')!;
    const fileInput = card.querySelector<HTMLInputElement>('#file-input')!;
    const selectedFile = card.querySelector<HTMLDivElement>('#selected-file')!;
    const notes = card.querySelector<HTMLTextAreaElement>('#notes')!;
    const error = card.querySelector<HTMLParagraphElement>('#form-error')!;

    card.querySelector('#browse-button')!.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files?.[0]) pickFile(fileInput.files[0]);
    });

    dropzone.addEventListener('dragover', e => {
      e.preventDefault();
      dropzone.classList.add('dragging');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragging'));
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('dragging');
      const file = e.dataTransfer?.files[0];
      if (file) pickFile(file);
    });

    card.querySelector('#cancel-button')!.addEventListener('click', () => {
      chosenFile = null;
      renderForm();
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!chosenFile) {
        showError('Choose a report file before submitting.');
        return;
      }

      //temporary holder for submit 
      console.log('Submitting', request.id, chosenFile.name, notes.value);

      request.submitted = true;
      chosenFile = null;
      renderList();
      renderForm();
    });

    function pickFile(file: File) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (!ALLOWED_TYPES.includes(ext)) {
        showError(`This file type isn't allowed. Use ${ALLOWED_TYPES.map(t => t.toUpperCase()).join(', ')}.`);
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        showError(`This file is over ${MAX_SIZE_MB} MB.`);
        return;
      }
      chosenFile = file;
      error.hidden = true;

      selectedFile.innerHTML = `
        <div class="review-info-file">
          <div class="review-file-details">
            <span>${escapeHtml(file.name)}</span>
            <span>${formatSize(file.size)} · Ready to upload</span>
          </div>
          <button type="button" id="remove-file" class="file-button">Remove</button>
        </div>
      `;
      selectedFile.querySelector('#remove-file')!.addEventListener('click', () => {
        chosenFile = null;
        fileInput.value = '';
        selectedFile.innerHTML = '';
      });
    }

    function showError(message: string) {
      error.textContent = message;
      error.hidden = false;
    }
  }
}

// stops text from the database being read as html
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}