const terminal = document.querySelector('[data-terminal]');
const openTerminal = document.querySelector('[data-terminal-open]');
const closeTerminal = document.querySelector('[data-terminal-close]');
const form = document.querySelector('[data-terminal-form]');
const input = document.querySelector('[data-terminal-input]');
const body = document.querySelector('[data-terminal-body]');
const logo = document.querySelector('[data-logo]');
const toast = document.querySelector('[data-toast]');

document.getElementById('year').textContent = new Date().getFullYear();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function openTerm() {
  terminal.classList.add('open');
  terminal.setAttribute('aria-hidden', 'false');
  setTimeout(() => input.focus(), 50);
}
function closeTerm() {
  terminal.classList.remove('open');
  terminal.setAttribute('aria-hidden', 'true');
}

openTerminal.addEventListener('click', openTerm);
closeTerminal.addEventListener('click', closeTerm);
terminal.addEventListener('click', e => { if (e.target === terminal) closeTerm(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTerm(); });

const commands = {
  help: `commands: help, about, socials, ls, whoami, sudo, matrix, clear`,
  about: `Nick. Student. Maker. Scout leader. Firefighter. Curious about a little bit of everything.`,
  socials: `github  -> linked on the page\ninstagram -> also linked on the page`,
  ls: `about.txt  things/  side-quests/  definitely-not-secret.txt`,
  whoami: `you tell me.`,
  sudo: `nice try.`,
  matrix: `wake up, Nick...`
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const raw = input.value.trim();
  if (!raw) return;

  const line = document.createElement('p');
  line.innerHTML = `<span class="prompt">nick@nickg:~$</span> ${raw.replace(/</g,'&lt;')}`;
  body.appendChild(line);

  if (raw === 'clear') {
    body.innerHTML = '';
  } else {
    const response = document.createElement('p');
    response.style.whiteSpace = 'pre-line';
    response.textContent = commands[raw.toLowerCase()] ?? `command not found: ${raw}`;
    body.appendChild(response);
  }

  input.value = '';
  body.scrollTop = body.scrollHeight;
});

let logoClicks = 0;
let logoTimer;
logo.addEventListener('click', e => {
  logoClicks++;
  clearTimeout(logoTimer);
  logoTimer = setTimeout(() => logoClicks = 0, 1600);
  if (logoClicks >= 5) {
    e.preventDefault();
    logoClicks = 0;
    openTerm();
    showToast('secret terminal unlocked');
  }
});

const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', e => {
  if (e.key === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      document.body.classList.toggle('party');
      showToast('achievement unlocked: unnecessary visual chaos');
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

console.log('%c nickg.si ', 'background:#a8332f;color:white;padding:4px 8px;border-radius:4px;font-weight:bold');
console.log('You found the console. Respect. Try clicking NG_ five times.');
