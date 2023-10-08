import { _decorator, Component, Contact2DType, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('pipeController')
export class pipeController extends Component {
  @property
  speed: number = 50;

  start() {}

  update(deltaTime: number) {
    for (let pipe of this.node.children) {
      pipe.setPosition(
        pipe.position.x - this.speed * deltaTime,
        pipe.position.y
      );
      if (pipe.getWorldPosition().x < -50) {
        pipe.setPosition(pipe.position.x + 288 * 2, Math.random() * 190 + 426);
      }
    }
  }
}
