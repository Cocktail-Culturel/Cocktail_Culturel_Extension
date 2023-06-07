import logo from "~/assets/logo.svg";
import "./style.css";

const imageUrl = new URL(logo, import.meta.url).href;

document.querySelector("#app").innerHTML = `
  <div>
    <img src="${imageUrl}" height="45" alt="" />
  </div>
  <div>
    <a href="http://cocktail-culturel.com/" target="_blank">Visiter le site</a>
    <h4>Désactiver Adblock sur YouTube</h4>
  </div>
`;
