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

  start() {
    let collider = this.node.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

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
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // 如果碰到敌人，销毁自己，让敌人死亡
    if (otherCollider.tag == 1) {
      // 销毁自己
      if (this.node && this.node.isValid) {
        // console.log('子弹销毁');
        setTimeout(() => {
          this.node.destroy();
        }, 0);
      }
      // 销毁敌人
      otherCollider.getComponent(EnemyController).die();
    }
  }
}
