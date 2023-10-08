import {
  _decorator,
  Animation,
  AnimationState,
  Component,
  ImageAsset,
  Node,
  resources,
  RigidBody,
  RigidBody2D,
  Sprite,
  SpriteFrame,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
  //是否死亡
  isDie: boolean = false;
  start() {}

  update(deltaTime: number) {
    // 移动
    if (this.isDie == false) {
      this.node.setPosition(
        this.node.position.x,
        this.node.position.y - 300 * deltaTime
      );
    }
    if (this.node.position.y < -850) {
      this.node.destroy();
    }
  }
  // 死亡
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
  remove() {
    if (this.node && this.node.isValid) {
      setTimeout(() => {
        this.node.destroy();
      }, 0);
    }
  }
}
