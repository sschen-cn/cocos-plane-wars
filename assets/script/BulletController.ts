import {
  _decorator,
  BoxCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
} from 'cc';
import { EnemyController } from './EnemyController';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {
  @property
  speed: number = 800;

  start() {}

  update(deltaTime: number) {
    if (this.node.isValid) {
      // 移动
      this.node.setPosition(
        this.node.position.x,
        this.node.position.y + this.speed * deltaTime
      );
      // 出屏幕销毁
      if (this.node.position.y > 800) {
        if (this.node.isValid) {
          this.node.destroy();
        }
      }
    }
  }
  /**
   * 子弹销毁
   */
  die() {
    if (this.node && this.node.isValid) {
      // console.log('子弹销毁');
      setTimeout(() => {
        this.node.destroy();
      }, 0);
    }
  }
}
