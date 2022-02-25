export default class MovableElement {
  offset = [0, 0];
  isDown = false;
  elementPosition = {
    left: 0,
    top: 0,
  }

  constructor(element) {
    this.element = element;
    this.element.style.position = 'absolute';
    this.element.style.left = '0px';
    this.element.style.top = '0px';
    this.initEventListeners();
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
