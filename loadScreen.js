const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) => 
  (typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? 'block' : 'none';

setVisible('.main-container', false);
setVisible('.main-overlay', true);

document.addEventListener('DOMContentLoaded', () =>
  wait(1000).then(() => {
    if (Cookies.get('cookieconsent_status') == "allow"){
      setSceneVisible()
    }
    
  }));

function setSceneVisible() {
  setVisible('.main-container', true);
  setVisible('.main-overlay', false);
}