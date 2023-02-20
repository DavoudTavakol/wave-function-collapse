class Tile {

    img: HTMLImageElement;

    up: number[];
    right: number[];
    down: number[];
    left: number[];


    constructor(img: HTMLImageElement, up:number[], right:number[], down:number[], left:number[]) {
        this.img = img;

        this.up = up;
        this.right = right;
        this.down = down;
        this.left = left;
    }

}

export { Tile };