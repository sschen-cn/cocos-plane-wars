import {
  _decorator,
  Animation,
  BoxCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  director,
  EventTouch,
  find,
  ImageAsset,
  instantiate,
  IPhysics2DContact,
  Node,
  Prefab,
  resources,
  Sprite,
  SpriteFrame,
} from 'cc';
import { EnemyController } from './EnemyController';
import { EnemyManager } from './EnemyManager';
import { BgController } from './BgController';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
  @property(Prefab)
  bulletPre: Prefab = null;
  hero_0 = null;
  hero_1 = null;
  hero_tag: boolean = true;
  hero_die = false;
  start() {
    // 移动
    this.node.on(Node.EventType.TOUCH_MOVE, (e: EventTouch) => {
      if (!this.hero_die) {
        this.node.setWorldPosition(e.getUILocation().x, e.getUILocation().y, 0);
      }
    });
    // 攻击 计时器
    this.schedule(() => {
      if (!this.hero_die) {
        // 创建子弹
        let bullet = instantiate(this.bulletPre);
        // 设置父物体
        bullet.setParent(director.getScene().getChildByName('Canvas'));
        // 设置子弹位置
        bullet.setPosition(this.node.position.x, this.node.position.y + 80, 0);
      }
    }, 0.5);
    // 碰撞敌人
    let collider = this.node.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // 处理碰撞敌人，玩家死亡
    this.hero_die = true;
    this.node.getComponent(Animation).stop();
    // 暂停生成敌人
    find('Canvas/EnemyManager')?.getComponent(EnemyManager)?.pause();

    if ((otherCollider.tag = 1)) {
      // 销毁敌人
      let other = otherCollider.getComponent(EnemyController);
      if (other) {
        other.die();
      }
      // 自己死亡
      // 加载爆炸图片
      this.node.getComponent(Animation).play('player_die');
      setTimeout(() => {
        // this.node.destroy();
        // 游戏结束提示
        find('Canvas/bg')?.getComponent(BgController)?.gameover();
      }, 300);
    }
  }

  reStart() {
    // 复活玩家
    this.hero_die = false;
    this.node.getComponent(Animation).play('player');
    // 重新生成敌人
    find('Canvas/EnemyManager')?.getComponent(EnemyManager)?.reStart();
    this.node.setPosition(0, -300, 0);
  }

  update(deltaTime: number) {}
}
