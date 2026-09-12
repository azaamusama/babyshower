// A short synthesized bell "ding" — no audio file needed, just the Web Audio API.
export function playBellSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    [880, 1760, 2637].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;

      const peak = i === 0 ? 0.35 : 0.12;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(peak, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.5);
    });

    setTimeout(() => ctx.close(), 1800);
  } catch {
    // Web Audio unavailable — fail silently, the visual "Time!" state still shows.
  }
}
