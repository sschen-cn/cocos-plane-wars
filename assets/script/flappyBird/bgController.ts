import { _decorator, Component, Node, NodeEventType } from 'cc';
import { birdController } from './BirdController';
const { ccclass, property } = _decorator;

@ccclass('bgController')
export class bgController extends Component {
  /**
   * 背景移动速度
   */
  @property
  speed: number = 4;
  /**
   * 宽度
   */
  @property
  width: number = 288;
  @property(birdController)
  bird: birdController = null;
  start() {
    // 点击监听
    for (let bg of this.node.children) {
      bg.on(NodeEventType.MOUSE_DOWN, () => {
        this.bird.fly();
      });
    }
  }

  update(deltaTime: number) {
    // 移动
    for (let bg of this.node.children) {
      bg.setPosition(bg.position.x - this.speed * deltaTime, 0);
      if (bg.position.x < -this.width) {
        bg.setPosition(bg.position.x + this.width * 2, 0);
      }
    }
  }
}
