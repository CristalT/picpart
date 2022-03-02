export default class MovableElement {
  offset = [0, 0];
  isDown = false;

  constructor(element, initialPosition = { left: 0, top: 0 }) {
    this.elementPosition = { ...initialPosition };
    this.element = element;
    this.element.style.position = 'absolute';
    Object.assign(this.element.style, this.elementPosition);
    this.initEventListeners();
  }

  zoom(value) {
    this.element.width += value;
    let { left, top } = this.element.style;
    left = left.replace('px', '');
    top = top.replace('px', '');
    this.element.style.left = `${(left - (value / 2))}px`
    this.element.style.top = `${(top - (value / 2))}px`
  }

  initEventListeners() {
    this.element.addEventListener(
      'mousedown',
      (e) => {
        this.isDown = true;
        this.offset = [this.element.offsetLeft - e.clientX, this.element.offsetTop - e.clientY];
      },
      true
    );

    document.addEventListener(
      'mouseup',
      () => {
        this.isDown = false;
      },
      true
    );

    document.addEventListener(
      'mousemove',
      (event) => {
        event.preventDefault();
        if (this.isDown) {
          this.mousePosition = {
            x: event.clientX,
            y: event.clientY,
          };
          this.elementPosition = {
            left: this.mousePosition.x + this.offset[0] + 'px',
            top: this.mousePosition.y + this.offset[1] + 'px',
          };
          Object.assign(this.element.style, this.elementPosition);
        }
      },
      true
    );
  }
}
