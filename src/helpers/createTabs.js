import config from "~/config.json";
import insertHTML from "./insertHTML";
import removeElement from "./removeElement";
import waitForElement from "./waitForElement";

const makeItem = (
  title,
  link,
  illustration,
  description,
  label,
  tarif_from,
  distance,
  tarif
) => {
  let illus = `<div class="cocktailculturel--item--illustration"></div>`;
  if (illustration) {
    illus = `
      <div class="cocktailculturel--item--illustration">
        <img src=${illustration} width=95% loading="lazy" />
      </div>
    `;
  }
  let parts = [];
  if (title) {
    parts.push(`
      <div class="cocktailculturel--item--text--title">
        ${title}
      </div>
    `);
  }
  if (description) {
    parts.push(`
      <div class="cocktailculturel--item--text--description">
        ${description}
      </div>
    `);
  }
  if (label) {
    parts.push(`
      <div class="cocktailculturel--item--text--auteur">
      ${label}
      </div>
    `);
  }
  if (tarif) {
    parts.push(`
      <div class="cocktailculturel--item--text--tarif">
        ${tarif_from ? "A partir de " : ""} ${tarif}€
      </div>
    `);
  }
  if (distance) {
    parts.push(`
      <div class="cocktailculturel--item--text--distance">
        ${Math.round(distance)}km
      </div>
    `);
  }
  if (link) {
    parts.push(`
      <div class="cocktailculturel--item--text--link">
        <a href="${link}" target="_blank">
        </a>
      </div>
    `);
  }
  return `
<div class="cocktailculturel--item ${
    link ? "cocktailculturel--item--clickable" : ""
  }">
  ${illus}
  <div class="cocktailculturel--item--text">
    ${parts.join("")}
  </div>
</div>
  `;
};

export default function createTabs(api_json) {
  let tabButtons = [];
  tabButtons.push(
    `<button type="button" data-cctab="youtube" class="active">Youtube</button>`
  );
  let tabContents = [];
  Object.keys(config.labels).forEach((lab) => {
    let content = [];

    switch (lab) {
      case "activities":
        break;
      case "borrowings":
        api_json["data"]["searchRecordItems"]["SearchRecordItemBNF"].forEach(
          (element) => {
            content.push(
              makeItem(
                element["record"]["title"],
                element["record"]["link"],
                "https://upload.wikimedia.org/wikipedia/commons/archive/8/84/20230425133626%21Logo_BnF.svg",
                element["record"]["author"],
                element["record"]["subject"]
              )
            );
          }
        );
        break;
      case "outings":
        api_json["data"]["searchRecordItems"]["SearchRecordItemDT"].forEach(
          (element) => {
            content.push(
              makeItem(
                element["record"]["title"],
                element["record"]["link"],
                "https://www.datatourisme.fr/assets/images/logos/datatourisme-250.png",
                element["record"]["description"],
                "Le " + element["record"]["date"],
                element["record"]["tarif_from"],
                element["record"]["distance"] + " km"
              )
            );
          }
        );
        break;
      case "purchases":
        break;
      case "trainings":
        break;
      case "videos":
        break;
      default:
        break;
    }

    if (content.length > 0) {
      tabButtons.push(
        `<button type="button" data-cctab="${lab}">${config.labels[lab].tab}</button>`
      );
    }

    tabContents.push(`
      <div id="cocktailculturel-tab-${lab}" class="cocktailculturel--tabs cocktailculturel--hidden">
        ${content.join("")}
      </div>
    `);
  });

  let HTML_tabButtons;
  if (tabButtons.length < 4) {
    HTML_tabButtons = `
    <div id="cocktailculturel-tabs" style="justify-content: space-around;">
      ${tabButtons.join("")}
    </div>
    `;
  } else {
    HTML_tabButtons = `
    <div id="cocktailculturel-tabs" style="justify-content: space-between;">
      ${tabButtons.join("")}
    </div>
    `;
  }

  waitForElement(config.selectors.watch.navigation_wrapper).then(() => {
    removeElement("#cocktailculturel-tabs");
    removeElement(".cocktailculturel--tabs");
    insertHTML(
      config.selectors.watch.navigation_wrapper,
      HTML_tabButtons,
      true
    );
    insertHTML(
      config.selectors.watch.navigation_wrapper,
      tabContents.join(""),
      false
    );
    const $ccButtons = document.querySelectorAll("button[data-cctab]");
    $ccButtons.forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        $ccButtons.forEach((b) => {
          b.classList.remove("active");
        });
        a.classList.add("active");
        const tab = a.dataset.cctab;
        const $youtubePlaylist = document.querySelector(
          config.selectors.watch.playlist
        );
        $youtubePlaylist.classList.add("cocktailculturel--hidden");
        document.querySelectorAll(".cocktailculturel--tabs").forEach((t) => {
          t.classList.add("cocktailculturel--hidden");
        });
        if ("youtube" == tab) {
          $youtubePlaylist.classList.remove("cocktailculturel--hidden");
        } else {
          document
            .querySelector(`#cocktailculturel-tab-${tab}`)
            .classList.remove("cocktailculturel--hidden");
        }
        return false;
      });
    });
    const $ccItems = document.querySelectorAll(
      ".cocktailculturel--item--clickable"
    );
    $ccItems.forEach((i) => {
      i.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.open(
          i
            .querySelector(".cocktailculturel--item--text--link a")
            .getAttribute("href"),
          "_blank"
        );
      });
    });
  });
}

//Ancien code, au cas où

/*const makeItem = (
  illustration,
  title,
  description,
  tarif,
  tarif_from,
  distance,
  link,
  label
) => {
  let illus = `<div class="cocktailculturel--item--illustration"></div>`;
  if (illustration) {
    illus = `
      <div class="cocktailculturel--item--illustration">
        <img src="${illustration}" loading="lazy" />
      </div>
    `;
  }
  let parts = [];
  if (title) {
    parts.push(`
      <div class="cocktailculturel--item--text--title">
        ${title}
      </div>
    `);
  }
  if (description) {
    parts.push(`
      <div class="cocktailculturel--item--text--description">
        ${description}
      </div>
    `);
  }
  if (tarif) {
    parts.push(`
      <div class="cocktailculturel--item--text--tarif">
        ${tarif_from ? "A partir de " : ""} ${tarif}€
      </div>
    `);
  }
  if (distance) {
    parts.push(`
      <div class="cocktailculturel--item--text--distance">
        ${Math.round(distance)}km
      </div>
    `);
  }
  if (link) {
    parts.push(`
      <div class="cocktailculturel--item--text--link">
        <a href="${link}" target="_blank">
          <span>${label}</span>
        </a>
      </div>
    `);
  }
  return `
<div class="cocktailculturel--item ${
    link ? "cocktailculturel--item--clickable" : ""
  }">
  ${illus}
  <div class="cocktailculturel--item--text">
    ${parts.join("")}
  </div>
</div>
  `;
};

export default function createTabs(api_json) {
  let tabButtons = [];
  tabButtons.push(
    `<button type="button" data-cctab="youtube" class="active">Youtube</button>`
  );
  let tabContents = [];
  Object.keys(api_json).forEach((key) => {
    tabButtons.push(
      `<button type="button" data-cctab="${key}">${config.labels[key].tab}</button>`
    );
    let content = [];
    api_json[key].forEach((entry) => {
      content.push(
        makeItem(
          entry.illustration,
          entry.title,
          entry.description,
          entry.tarif,
          entry.tarif_from,
          entry.distance,
          entry.link,
          config.labels[key].link
        )
      );
    });
    tabContents.push(`
      <div id="cocktailculturel-tab-${key}" class="cocktailculturel--tabs cocktailculturel--hidden">
        ${content.join("")}
      </div>
    `);
  });
  let HTML_tabButtons = `
  <div id="cocktailculturel-tabs">
    ${tabButtons.join("")}
  </div>
  `;
  waitForElement(config.selectors.watch.navigation_wrapper).then(() => {
    removeElement("#cocktailculturel-tabs");
    removeElement(".cocktailculturel--tabs");
    insertHTML(
      config.selectors.watch.navigation_wrapper,
      HTML_tabButtons,
      true
    );
    insertHTML(
      config.selectors.watch.navigation_wrapper,
      tabContents.join(""),
      false
    );
    const $ccButtons = document.querySelectorAll("button[data-cctab]");
    $ccButtons.forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        $ccButtons.forEach((b) => {
          b.classList.remove("active");
        });
        a.classList.add("active");
        const tab = a.dataset.cctab;
        const $youtubePlaylist = document.querySelector(
          config.selectors.watch.playlist
        );
        $youtubePlaylist.classList.add("cocktailculturel--hidden");
        document.querySelectorAll(".cocktailculturel--tabs").forEach((t) => {
          t.classList.add("cocktailculturel--hidden");
        });
        if ("youtube" == tab) {
          $youtubePlaylist.classList.remove("cocktailculturel--hidden");
        } else {
          document
            .querySelector(`#cocktailculturel-tab-${tab}`)
            .classList.remove("cocktailculturel--hidden");
        }
        return false;
      });
    });
    const $ccItems = document.querySelectorAll(
      ".cocktailculturel--item--clickable"
    );
    $ccItems.forEach((i) => {
      i.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.open(
          i
            .querySelector(".cocktailculturel--item--text--link a")
            .getAttribute("href"),
          "_blank"
        );
      });
    });
  });
}*/
