// Speaks a number aloud using the browser's built-in speech synthesis —
// no audio files needed. Cancels any prior utterance so the countdown
// never queues up and falls behind.
export function speakNumber(n) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(n));
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Speech synthesis unavailable — fail silently.
  }
}

export function cancelSpeech() {
  try {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  } catch {
    // ignore
  }
}
