import { LitElement, html, css } from 'lit';

export class TvShows extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      defaultsearch: {type: String},
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--tv-shows-background-color);
      }

      main {
        flex-grow: 1;
      }

      .logo {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
    this.defaultsearch = 'girls'
  }

  render() {
    return html`
      <main>
        <show-grid></show-grid>
      </main>

      <p class="app-footer">
        🚽 Made by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/sophia-ysabelle-aguilar/"
          >Sophia Aguilar</a
        >.
      </p>
    `;
  }
}
