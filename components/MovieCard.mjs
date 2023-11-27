export class MovieCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="img" style="background-image: url(${this.getAttribute('img')});"></div>
        <h4>${this.getAttribute('title')}</h4>
        `;
  }
}
