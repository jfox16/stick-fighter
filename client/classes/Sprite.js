class Sprite {
  constructor(image, cellSize, offset) {
    this.image = image;
    this.cellSize = cellSize;
    this.offset = offset;
  }

  draw(context, x, y) {
    this.drawIndex(context, 0, x, y);
  }

  drawIndex(context, index, x, y) {
    context.drawImage(
      this.image,
      this.cellSize.x * index,
      0,
      this.cellSize.x,
      this.cellSize.y,
      x + this.offset.x,
      y + this.offset.y,
      this.cellSize.x,
      this.cellSize.y,
    );
  }
}

module.exports = Sprite;