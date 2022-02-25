<script>
export default {
  props: {
    element: HTMLElement,
  },
  data() {
    return {
      el: null,
      offset: [0, 0],
      isDown: false,
    };
  },
  mounted() {
    this.el = Object.freeze(this.element);
    this.listenMouseDown();
    this.listenMouseUp();
    this.listenMouseMove();
  },
  methods: {
    listenMouseDown() {
      this.el.addEventListener(
        'mousedown',
        (e) => {
          this.isDown = true;
          this.offset = [this.el.offsetLeft - e.clientX, this.el.offsetTop - e.clientY];
        },
        true
      );
    },
    listenMouseUp() {
      document.addEventListener(
        'mouseup',
        () => {
          this.isDown = false;
        },
        true
      );
    },
    listenMouseMove() {
      document.addEventListener(
        'mousemove',
        (event) => {
          event.preventDefault();
          if (this.isDown) {
            this.mousePosition = {
              x: event.clientX,
              y: event.clientY,
            };
            this.el.style.left = this.mousePosition.x + this.offset[0] + 'px';
            this.el.style.top = this.mousePosition.y + this.offset[1] + 'px';
          }
        },
        true
      );
    },
  },
};
</script>
