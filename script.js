const contentInput = document.getElementById('contentInput');
const charCount = document.getElementById('charCount');
const pasteButton = document.getElementById('pasteButton');
const findSolutionButton = document.getElementById('findSolutionButton');
const newQueryButton = document.getElementById('newQueryButton');
const inputCard = document.getElementById('inputCard');
const answerCard = document.getElementById('answerCard');
const loadingSpinner = document.getElementById('loadingSpinner');
const answerText = document.getElementById('answerText');

// count characters
contentInput.addEventListener('input', () => {
  charCount.textContent = `${contentInput.value.length} characters`;
});

// paste button
pasteButton.addEventListener('click', () => {
  contentInput.focus();
  pasteButton.textContent = "Press Ctrl+V";
  setTimeout(() => (pasteButton.textContent = "Paste"), 2000);
});

// send to backend
findSolutionButton.addEventListener('click', async () => {
  const userText = contentInput.value.trim();
  if (!userText) return;

  inputCard.classList.add('hidden');
  answerCard.classList.add('hidden');
  loadingSpinner.classList.remove('hidden');

  try {
    const response = await fetch("https://braylonai.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();
    answerText.textContent = data.reply || "No response.";
  } catch (err) {
    console.error(err);
    answerText.textContent = "⚠️ Error connecting to server.";
  } finally {
    loadingSpinner.classList.add('hidden');
    answerCard.classList.remove('hidden');
  }
});

// reset for new query
newQueryButton.addEventListener('click', () => {
  answerCard.classList.add('hidden');
  inputCard.classList.remove('hidden');
  contentInput.value = "";
  charCount.textContent = "0 characters";
});
