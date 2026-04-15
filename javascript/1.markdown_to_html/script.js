function convertMarkdown() {
  const input = document.getElementById("markdown-input");
  let text = input.value;

  const lines = text.split("\n");
  const converted = lines.map((line) => {
    let isBlockquote = false;

    // Detect blockquote first, but DON'T replace yet
    if (/^[ \t]*> /.test(line)) {
      isBlockquote = true;
      line = line.replace(/^[ \t]*> /, "");
    }

    // Headings
    line = line.replace(/^[ \t]*(#{1,3}) (.+)$/, (_, hashes, text) => {
      return `<h${hashes.length}>${text}</h${hashes.length}>`;
    });

    // Images
    line = line.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');

    // Links
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Bold
    // Bold (allow nested content)
    line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    line = line.replace(/__(.+?)__/g, "<strong>$1</strong>");

    // Italic (after bold)
    line = line.replace(/\*(.+?)\*/g, "<em>$1</em>");
    line = line.replace(/_(.+?)_/g, "<em>$1</em>");

    // NOW apply blockquote AFTER inline parsing
    if (isBlockquote) {
      line = `<blockquote>${line}</blockquote>`;
    }

    return line;
  });

  return converted.join("\n");
}

// ── Syntax-highlight raw HTML for display ──
function highlightHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /(&lt;\/?[\w]+)(\s[^&]*)?(\/?)(&gt;)/g,
      (match, tag, attrs, slash, close) => {
        let out = `<span class="hl-tag">${tag}</span>`;
        if (attrs) {
          out += attrs.replace(
            /([\w-]+)="([^"]*)"/g,
            '<span class="hl-attr">$1</span>=<span class="hl-val">"$2"</span>',
          );
        }
        if (slash) out += slash;
        out += `<span class="hl-tag">${close}</span>`;
        return out;
      },
    );
}

// ── Tab switching ──
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

// ── Input handler ──
const mdInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");
const charCount = document.getElementById("char-count");

function update() {
  const raw = convertMarkdown();
  charCount.textContent = mdInput.value.length + " chars";

  if (!mdInput.value.trim()) {
    htmlOutput.innerHTML =
      '<span class="empty-state">// HTML will appear here…</span>';
    preview.innerHTML =
      '<p class="empty-state">// Rendered preview will appear here…</p>';
    return;
  }

  htmlOutput.innerHTML = highlightHTML(raw);
  preview.innerHTML = raw;
}

mdInput.addEventListener("input", update);

// Trigger once on load with placeholder text
update();
