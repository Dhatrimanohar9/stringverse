// Sound utility for subtle educational UI sounds
// All sounds are generated with the Web Audio API (no external files needed)

let audioContext: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

export function setMuted(muted: boolean): void {
  isMuted = muted;
}

export function getMuted(): boolean {
  return isMuted;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainValue: number = 0.15,
  fadeOut: boolean = true
): void {
  if (isMuted) return;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(gainValue, ctx.currentTime + 0.01);

    if (fadeOut) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    } else {
      gainNode.gain.setValueAtTime(gainValue, ctx.currentTime + duration - 0.01);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    }

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Silently ignore audio errors
  }
}

export function playSound(type: string): void {
  if (isMuted) return;

  switch (type) {
    case 'click':
      playTone(440, 0.1, 'sine', 0.08);
      break;
    case 'success':
      playTone(523, 0.1, 'sine', 0.1);
      setTimeout(() => playTone(659, 0.1, 'sine', 0.1), 100);
      setTimeout(() => playTone(784, 0.2, 'sine', 0.12), 200);
      break;
    case 'error':
      playTone(220, 0.3, 'sawtooth', 0.08);
      break;
    case 'transition':
      playTone(392, 0.08, 'sine', 0.07);
      setTimeout(() => playTone(523, 0.15, 'sine', 0.07), 80);
      break;
    case 'quiz-correct':
      playTone(523, 0.1, 'sine', 0.1);
      setTimeout(() => playTone(784, 0.3, 'sine', 0.12), 100);
      break;
    case 'quiz-wrong':
      playTone(330, 0.15, 'sawtooth', 0.08);
      setTimeout(() => playTone(220, 0.2, 'sawtooth', 0.08), 150);
      break;
    case 'run':
      playTone(329, 0.05, 'sine', 0.08);
      setTimeout(() => playTone(392, 0.05, 'sine', 0.08), 60);
      setTimeout(() => playTone(523, 0.15, 'sine', 0.1), 120);
      break;
    default:
      playTone(440, 0.1, 'sine', 0.08);
  }
}
