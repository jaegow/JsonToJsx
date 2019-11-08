class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header class="header">
        <a href={imageLeftHref} className="header__logo">
          <img src={imageLeftSrc} alt="header branding logo" />
        </a>
        <div className="header__logo--right">
          <img src={imageRightSrc} alt="header branding right" />
        </div>
      </header>
        `;
  }
}

customElements.define('performx-header', MyComponent);
