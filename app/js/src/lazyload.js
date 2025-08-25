class LazyLoad extends HTMLElement {
    constructor() {
        super();
        this._hasLoaded = false;
        this._observer = null;
    }

    connectedCallback() {
        // Set up 'IntersectionObserver' interface to monitor when the element becomes visible
        this._observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !this._hasLoaded) {
                        this._loadContent();
                        this._hasLoaded = true;
                        this._observer.disconnect();

                        // Hide the scroll indicator
                        document.querySelector(".scroll-indicator").style.display = "none";
                    }
                });
            },
            {
                rootMargin: "50px",
                threshold: 0.1,
            }
        );

        this._observer.observe(this);
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }

    _loadContent() {
        const template = this.querySelector("lazy-load template");
        if (template) {
            // Clone the template content and append it
            const content = template.content.cloneNode(true);
            // Remove the template
            template.remove();
            this.appendChild(content);

            // Manually create and execute any scripts
            content.querySelectorAll("script").forEach((oldScript) => {
                const newScript = document.createElement("script");

                // Copy all attributes
                Array.from(oldScript.attributes).forEach((attr) => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                // Copy inline script content
                newScript.textContent = oldScript.textContent;

                // Replace the old script with the new one
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        }
    }
}

// Register the custom element
customElements.define("lazy-load", LazyLoad);