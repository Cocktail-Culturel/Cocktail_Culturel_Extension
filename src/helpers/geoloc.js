export default function geoloc() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        window.sessionStorage.setItem("latitude", crd.latitude);
        window.sessionStorage.setItem("longitude", crd.longitude);
        resolve(crd);
      },
      (err) => {
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
}
