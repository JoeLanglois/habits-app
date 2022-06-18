import mitt from 'mitt';
import { render, html } from 'uhtml';

class AppState {
  constructor() {
    this._habits = [];
    this.e = mitt();
    this.fetchHabits();
  }

  on(eventType, handler) {
    this.e.on(eventType, handler);
  }

  emit(event, data = {}) {
    this.e.emit(event, data);
  }

  off(...args) {
    this.e.off(...args);
  }

  get habits() {
    return this._habits;
  }

  async fetchHabits() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        this._habits = [{ name: 'Lire' }, { name: 'Exercise' }];
        this.e.emit('habits:changed');
        res();
      }, 600);
    });
  }
}

const state = new AppState();

class DayView {
  constructor(state) {
    this.appState = state;
    this.el = document.createElement('div');

    this.appState.on('habits:changed', () => this.render());

    this.render();
  }

  render() {
    render(this.el, this.view());
  }

  view() {
    return html`<p>Number of habits you're tracking: ${
      this.appState.habits.length
    }</p>
    <div>
      <h2>Habitudes</h2>
      ${this.appState.habits.map((h) => html`<p>${h.name}</p>`)}
    </div>
    `;
  }
}

const dayView = new DayView(state);
document.getElementById('app').append(dayView.el);

async function callRpc(methodName, params = {}) {
  const resp = await fetch('/rpc/' + methodName, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await resp.json();
  return data;
}

callRpc('say:hi')
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) => console.error(err));
