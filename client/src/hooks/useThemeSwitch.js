export function useThemeSwitch() {
  let darkMode = globalThis.matchMedia('(prefers-color-scheme: dark').matches;

  if (darkMode) {
    document.body.classList.add('dark-mode');
  }

  function toggleDarkMode() {
    darkMode = !darkMode;

    document.body.classList.toggle('dark-mode');
  }

  return toggleDarkMode;
}
