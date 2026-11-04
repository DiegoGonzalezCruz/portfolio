/**
 * Inlined into <head> so <html data-theme> is set before first paint (no flash).
 * localStorage "theme" holds an explicit "light" | "dark" override; without one
 * the theme follows prefers-color-scheme, including live system changes.
 * Keep in sync with toggleTheme() in ./theme.ts.
 */
export const themeScript = `(function () {
  try {
    var root = document.documentElement;
    var media = window.matchMedia("(prefers-color-scheme: dark)");
    var stored = function () {
      try {
        var t = localStorage.getItem("theme");
        return t === "light" || t === "dark" ? t : null;
      } catch (e) {
        return null;
      }
    };
    root.dataset.theme = stored() || (media.matches ? "dark" : "light");
    media.addEventListener("change", function (e) {
      if (!stored()) root.dataset.theme = e.matches ? "dark" : "light";
    });
  } catch (e) {}
})();`;
