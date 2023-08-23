'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      let coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (mapClick) {
        mapEvent = mapClick;
        console.log(mapEvent);
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      alert('Could not get your location!');
    }
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  //Clear fields:
  inputDistance.value =
    inputCadence.value =
    inputDuration.value =
    inputElevation.value =
      '';
  // Display marker
  const { lat: x, lng: y } = mapEvent.latlng;
  L.marker([x, y])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 200,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Runn!')
    .openPopup();
});
