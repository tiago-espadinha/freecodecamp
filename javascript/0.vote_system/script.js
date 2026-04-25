// 1. Initialize poll as a new Map
const poll = new Map();

// 2. addOption function
function addOption(option) {
  if (!option || option.trim() === "") {
    return "Option cannot be empty.";
  }

  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }

  // Each option maps to a new Set to track unique voterIds
  poll.set(option, new Set());
  // update optionSelect dropdown in the HTML
  const optionSelect = document.getElementById("optionSelect");
  const newOptionElement = document.createElement("option");
  newOptionElement.value = option;
  newOptionElement.textContent = option;
  optionSelect.appendChild(newOptionElement);
  return `Option "${option}" added to the poll.`;
}

// 3. vote function
function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  const voters = poll.get(option);

  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }

  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}

// 4. displayResults function
function displayResults() {
  let results = "Poll Results:";

  for (let [option, voters] of poll) {
    results += `\n${option}: ${voters.size} votes`;
  }

  return results;
}

// --- Requirements Checklist ---

// Add at least three options
addOption("Turkey");
addOption("Morocco");
addOption("Japan");

// Add at least three votes
vote("Turkey", "user_01");
vote("Turkey", "user_02");
vote("Morocco", "user_03");

// Test output
console.log(displayResults());

function handleDisplayResults() {
  const resultsElement = document.getElementById("resultsDisplay");
  resultsElement.textContent = displayResults();
}

function handleAddOption() {
  const option = document.getElementById("newOption").value;
  addOption(option);
}

function handleVote() {
  const voteId = document.getElementById("voterId").value;
  const voterOption = document.getElementById("optionSelect").value;
  vote(voterOption, voteId);
}
