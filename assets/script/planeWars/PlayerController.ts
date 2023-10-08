import {
  _decorator,
  Animation,
  Component,
  director,
  EventTouch,
  find,
  instantiate,
  Node,
  Prefab,
} from 'cc';
import { EnemyController } from './EnemyController';
import { EnemyManager } from './EnemyManager';
import { BgController } from './BgController';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
  @property(Prefab)
  bulletPre: Prefab = null;
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
  }

  die() {
    // 玩家死亡
    this.hero_die = true;
    this.node.getComponent(Animation).stop(); // 暂停生成敌人
    // 暂停生成敌人
    find('Canvas/EnemyManager')?.getComponent(EnemyManager)?.pause();
    // 自己死亡 播放动画并提示gameover
    let ani = this.node.getComponent(Animation);
    ani.on(Animation.EventType.FINISHED, this.tips, this);
    ani.play('player_die');
  }
  tips() {
    find('Canvas/bg')?.getComponent(BgController)?.gameover();
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
