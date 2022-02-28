export default class BasicPicture {
  constructor(props = {}) {
    this.id = props.id;
    this.name = props.name;
    this.points = props.points.length;
  }
}