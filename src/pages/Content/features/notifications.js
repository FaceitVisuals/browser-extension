


console.log('Greet bot!');

const button = document.createElement('button');
button.textContent = 'JOIN ESEA 47 LEAGUE NOW! Use code "shadi3" "shadi12" for 10% discount.!'
document.body.insertAdjacentElement('afterbegin',button );
button.style.color = "green";
button.style.boxShadow = " 0 10px 20px rgba(0, 0, 0, .1),0 3px 6px rgba(0, 0, 0, .05)";
button.style.backgroundImage = "linear-gradient(#464d55, #25292e)";

button.addEventListener('click', () => {
  chrome.runtime.sendMessage('', {
    type: 'notification',
    target:"_blank",
    href: "https://www.faceit.com/en/cs2/league/ESEA%20League/a14b8616-45b9-4581-8637-4dfd0b5f6af8/ddc31c1e-7392-4859-a509-dd98fdbb824e/overview",
    options: {
      title: 'Just wanted to notifyoo you',
      message: 'How great it is!',
      iconUrl: '/icon.png',
      type: 'basic'
    }
  });
});
