import homePageManipulation from "~/manipulations/homePage";
import videoPageManipulation from "~/manipulations/videoPage";
import renderContent from "~/entries/contentScript/renderContent";
import geoloc from "./helpers/geoloc";

geoloc().then((coord) => {
  const manipulation = () => {
    if (window.location.pathname.startsWith("/watch")) {
      videoPageManipulation();
    } else {
      homePageManipulation();
    }
  };

  let oldHref = document.location.href;

  renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          manipulation();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    manipulation();
  });
});
