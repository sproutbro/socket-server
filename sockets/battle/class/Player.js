export default class Player {
    constructor(socket) {
        this.userId = socket?.user?.id;
        this.x = Math.floor(Math.random() * 640);
        this.y = Math.floor(Math.random() * 360);
        this.texture = "player";
        this.maxHp = 100;
        this.hp = 100;
        this.maxMove = 5;
        this.move = 5;
    }
}