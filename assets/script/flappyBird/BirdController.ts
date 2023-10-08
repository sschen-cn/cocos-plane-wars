import {
  _decorator,
  BoxCollider2D,
  CircleCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
  RigidBody2D,
  v2,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('birdController')
export class birdController extends Component {
  start() {
    let collider = this.node.getComponent(CircleCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  /**
   * 飞
   */
  fly() {
    this.getComponent(RigidBody2D).linearVelocity = v2(0, 18);
  }

  update(deltaTime: number) {}
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.tag == 1) {
      console.log('加分');
    } else {
      console.log('死亡');
    }
  }
}
