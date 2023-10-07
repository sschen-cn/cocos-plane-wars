import {
  _decorator,
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
    rigidbody.enabledContactListener = true;
    // 加载爆炸图片
    resources.load('airplane1', ImageAsset, (err, res) => {
      if (this.node && this.node.isValid) {
        this.node.getComponent(Sprite).spriteFrame =
          SpriteFrame.createWithImage(res);
      }
    });
    setTimeout(() => {
      resources.load('airplane2', ImageAsset, (err, res) => {
        if (this.node && this.node.isValid) {
          this.node.getComponent(Sprite).spriteFrame =
            SpriteFrame.createWithImage(res);
        }
      });
    }, 50);
    setTimeout(() => {
      resources.load('airplane3', ImageAsset, (err, res) => {
        if (this.node && this.node.isValid) {
          this.node.getComponent(Sprite).spriteFrame =
            SpriteFrame.createWithImage(res);
        }
      });
    }, 150);
    setTimeout(() => {
      resources.load('airplane4', ImageAsset, (err, res) => {
        if (this.node && this.node.isValid) {
          this.node.getComponent(Sprite).spriteFrame =
            SpriteFrame.createWithImage(res);
        }
      });
    }, 200);
    setTimeout(() => {
      if (this.node && this.node.isValid) {
        this.node.destroy();
      }
    }, 300);
  }
}
