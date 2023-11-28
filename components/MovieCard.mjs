export class MovieCard extends HTMLElement {
  eid;
  releaseDate;
  overview;
  rate;
  isFavorite = false;
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="img" style="background-image: url(${this.getAttribute(
          "img"
        )});"></div>
        <h4>${this.getAttribute("title")}</h4>
        `;
  }

  setAttributes(attributes, values) {
    for (let i = 0; i < attributes.length; i++) {
      this.setAttribute(attributes[i], values[i]);
    }
  }
}
