export default function removeElement(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    if (el.parentNode !== null) {
      el.parentNode.removeChild(el);
    }
  });
}
