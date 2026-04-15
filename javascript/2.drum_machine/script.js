document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const drumPads = document.querySelectorAll(".drum-pad");

  // Core function to handle playing the audio and updating UI
  const playSound = (key) => {
    // Ensure the key is uppercase to match the audio IDs (Q, W, E, etc.)
    const audioTrigger = key.toUpperCase();
    const audioCtx = document.getElementById(audioTrigger);

    if (audioCtx) {
      const parentPad = audioCtx.parentElement;

      // Reset audio to the start so it can be rapidly re-triggered
      audioCtx.currentTime = 0;
      audioCtx.play();

      // Update the #display text based on the pad's ID, replacing hyphens with spaces
      display.innerText = parentPad.id.replace(/-/g, " ");

      // Add the active class for the CSS press animation
      parentPad.classList.add("active");

      // Remove the active class shortly after to reset the button
      setTimeout(() => {
        parentPad.classList.remove("active");
      }, 100);
    }
  };

  // Event Listener 1: Mouse Clicks
  drumPads.forEach((pad) => {
    pad.addEventListener("click", function () {
      // The innerText contains the letter (Q, W, E, etc.)
      const key = this.innerText.trim()[0];
      playSound(key);
    });
  });

  // Event Listener 2: Keyboard Presses
  document.addEventListener("keydown", (event) => {
    playSound(event.key);
  });
});
