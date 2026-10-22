/**
 * Renders a short heading string with two formatting rules:
 *   *word*  → <span class="b30-alt">word</span>   (the highlighted style)
 *   \n      → <br>
 * `altProps` adds extra attributes to the highlighted span.
 */
export default function Rich({ text, altProps = {} }) {
  const out = [];
  String(text).split("\n").forEach((line, li) => {
    if (li) out.push(<br key={`br${li}`} />);
    line.split(/(\*[^*]+\*)/).forEach((part, pi) => {
      if (!part) return;
      if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
        out.push(<span key={`${li}-${pi}`} className="b30-alt" {...altProps}>{part.slice(1, -1)}</span>);
      } else {
        out.push(part);
      }
    });
  });
  return out;
}
