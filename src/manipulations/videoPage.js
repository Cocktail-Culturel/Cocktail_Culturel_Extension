import waitForElement from "~/helpers/waitForElement";
import getWebPageInformation from "~/helpers/getWebPageInformation";
import createTabs from "~/helpers/createTabs";
import config from "~/config.json";

import axios from "axios";

const findGetParameter = (parameterName) => {
  var result = null,
    tmp = [];
  window.location.search
    .substring(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
};

/*export default function videoPageManipulation() {
  // lien vers la video qui marche : https://www.youtube.com/watch?v=AFU3XB7Aqx0
  const video_id = findGetParameter("v");
  const latitude = window.sessionStorage.getItem("latitude");
  const longitude = window.sessionStorage.getItem("longitude");
  // on entre dans la manipulation de la page video 
  console.log("Manip de la page");
  console.log("ID de la vidéo: ");
  console.log(video_id);
  axios
    // on effectue une recherche avec le site de cocktail culturel en utilisant la config youtube et les params de la vidéo
    .get(`${config.url}/api/youtube/${video_id}/${latitude}/${longitude}`)
    .then((response) => {
      // une fois qu'on a la réponse, on créé les onglets
      createTabs(response.data);
      console.log("requête effectuée avec succès");
    })
    .catch(() => {
      console.log("requête échouée");
      // en cas d'échec, on effectue la requête avec les keywords trouvés dans la partie infos de la page
      getWebPageInformation().then((infos) => {
        axios
          .get(`${config.url}/api/keyword/${infos}/${latitude}/${longitude}`)
          .then((response) => {
            createTabs(response.data);
          });
      });
    });
}*/

export default function videoPageManipulation() {
  const video_id = findGetParameter("v");
  const latitude = window.sessionStorage.getItem("latitude");
  const longitude = window.sessionStorage.getItem("longitude");
  console.log(`X: ${latitude}, Y: ${longitude}`);
  // on entre dans la manipulation de la page video
  console.log(`ID de la vidéo: ${video_id}`);
  axios
    // on effectue une recherche avec le site de cocktail culturel en utilisant la config youtube et les params de la vidéo
    .get(
      `${config.url}/videos/${video_id}/geo?latitude=${latitude}&longitude=${longitude}`
    )
    .then((response) => {
      // une fois qu'on a la réponse, on créé les onglets
      console.log(response);
      createTabs(response);
      console.log("requête effectuée avec succès");
    })
    .catch(() => {
      console.log("requête échouée");
      // en cas d'échec, on effectue la requête avec les keywords trouvés dans la partie infos de la page
      /*getWebPageInformation().then((infos) => {
        axios
          .get(`${config.url}/api/keyword/${infos}/${latitude}/${longitude}`)
          .then((response) => {
            createTabs(response.data);
          });
      });*/
    });
}
