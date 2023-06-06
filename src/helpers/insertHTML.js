export default function insertHTML(selector, html, before) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const el = document.querySelector(selector);
  if (before) {
    el.insertBefore(div, el.firstChild);
  } else {
    el.append(div);
  }
}
