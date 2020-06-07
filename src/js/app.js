import Popup from './popup';
import RecAV from './recAV';
import MessageAddGEO from './messageAddGEO';

const popup = new Popup();
popup.init();

const recorder = new RecAV(popup);
recorder.init();

if (typeof document !== 'undefined') {
  const cmessageAddGeo = new MessageAddGEO();
  const elPopup = document.querySelector('.popup');
  const elPopupInput = document.querySelector('.popup-inp');
  const elPopupCancel = document.querySelector('.popup-cancel');
  const elPopupOk = document.querySelector('.popup-ok');
  const elInput = document.querySelector('#el-input');

  elPopupCancel.addEventListener('click', () => {
    elPopup.classList.add('hidden');
    return false;
  });

  elPopupOk.addEventListener('click', () => {
    if (elPopupInput.classList.contains('hidden')) {
      elPopup.classList.add('hidden');
    }
  });

  elInput.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') {
      cmessageAddGeo.messageAddGEO(`<p>${elInput.value}</p>`, popup);
    }
  });

  try {
    const loadStorage = JSON.parse(localStorage.legends);
    for (const item of loadStorage) {
      cmessageAddGeo.loadMessage(item.msg, item.geo, item.data);
    }
  } catch (e) {
    console.log('error Localstorage', e);
  }
}
