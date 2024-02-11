import { createApp } from 'vue';
import Popup from '@/components/Popup.vue';
import { Icon } from '@iconify/vue';

let currentPopup;
let timer;

export function showPopup(success = false) {

  if (currentPopup) {
    currentPopup.unmount();
    document.querySelector('.notification').remove();
    currentPopup = null;
    clearTimeout(timer);
  }

  const mountNode = document.createElement('div');
  mountNode.classList.add('notification');
  document.body.append(mountNode);
  const newPopup = createApp(Popup, { success });
  newPopup.component('Icon', Icon);
  newPopup.mount(mountNode);

  currentPopup = newPopup;

  timer = setTimeout(() => {
    if (currentPopup === newPopup)
    currentPopup.unmount();
    document.querySelector('.notification').remove();
    currentPopup = null;
  }, 7000);
}
