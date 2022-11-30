export class CssBuilder {
	constructor() {
		this.css = '';
	}

	addClass(c, conditional = true) {
		if (conditional) {
			this.css += c + ' ';
		}
		return this;
	}

	build() {
		return this.css;
	}
}
