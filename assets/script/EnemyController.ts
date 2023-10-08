import {
  _decorator,
  Animation,
  AnimationState,
  BoxCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  ImageAsset,
  IPhysics2DContact,
  Node,
  resources,
  RigidBody,
  RigidBody2D,
  Sprite,
  SpriteFrame,
} from 'cc';
import { BulletController } from './BulletController';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
  //是否死亡
  isDie: boolean = false;
  start() {
    let collider = this.node.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // 销毁自己
    this.die();
    if (otherCollider.tag == 0) {
      // 碰撞玩家飞机
      otherCollider.getComponent(PlayerController).die();
    } else if (otherCollider.tag == 2) {
      // 碰撞子弹
      otherCollider.getComponent(BulletController).die();
    }
  }

  update(deltaTime: number) {
    // 移动
    if (this.isDie == false) {
      this.node.setPosition(
        this.node.position.x,
        this.node.position.y - 300 * deltaTime
      );
    }
    if (this.node.position.y < -850) {
      this.remove();
    }
  }
  /**
   * 敌机销毁
   */
  die() {
    this.isDie = true;
    // 移除刚体属性
    let rigidbody = this.node.getComponent(RigidBody2D);
    setTimeout(() => {
      rigidbody.destroy();
    }, 0);
    let ani = this.node.getComponent(Animation);
    ani.on(Animation.EventType.FINISHED, this.remove, this);
    ani.play('enemy_die');
  }
  /**
   * 移除敌机节点
   */
  remove() {
    if (this.node && this.node.isValid) {
      setTimeout(() => {
        this.node.destroy();
      }, 0);
    }
  }
}
