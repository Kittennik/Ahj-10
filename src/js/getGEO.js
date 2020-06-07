function callPopup(msg, popup) {
  const title = 'Что-то пошло не так';
  popup.showPopup('get', title, msg);
}

export default function getGEO(popup) {
  if (typeof document !== 'undefined') {
    const elPopupInput = document.querySelector('.popup-inp');
    const elPopupCancel = document.querySelector('.popup-cancel');
    const elPopupOk = document.querySelector('.popup-ok');

    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude}, ${longitude}`);
          }, (error) => {
            const msg = 'Не удалось установить ваши координаты. Необходимо разрешение на использование геолокации.';
            callPopup(msg, popup);
            elPopupOk.addEventListener('click', () => {
              if (popup.validate()) {
                resolve(elPopupInput.value);
              }
            });
            elPopupCancel.addEventListener('click', () => {
              reject('cancel');
            });
          },
        );
      } else {
        const msg = 'Введите широту и долготу через запятую';
        callPopup(msg, popup);

        elPopupOk.addEventListener('click', () => {
          if (popup.validate()) {
            resolve(elPopupInput.value);
          }
        });
        elPopupCancel.addEventListener('click', () => {
          reject('cancel');
        });
      }
    });
  }
}
