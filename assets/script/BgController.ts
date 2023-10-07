import {
  _decorator,
  Component,
  director,
  find,
  instantiate,
  Node,
  Prefab,
} from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('BgController')
export class BgController extends Component {
  @property(Prefab)
  tips: Prefab = null;
  isPause: boolean = false;
  start() {}

  update(deltaTime: number) {
    // 移动
    // 遍历子物体（背景）
    if (!this.isPause) {
      for (let bgNode of this.node.children) {
        //移动 帧 -> 秒
        bgNode.setPosition(
          bgNode.position.x,
          bgNode.position.y - 50 * deltaTime
        );
        if (bgNode.position.y < -850) {
          bgNode.setPosition(bgNode.position.x, bgNode.position.y + 850 * 2);
        }
      }
    }
  }

  gameover() {
    this.pause();
    // 创建提示
    let tips = instantiate(this.tips);
    tips.setParent(director.getScene().getChildByName('Canvas'));
    tips.on(Node.EventType.TOUCH_START, (e) => {
      tips.destroy();
      find('Canvas/player')?.getComponent(PlayerController)?.reStart();
    });
  }

  pause() {
    this.isPause = true;
  }

  reStart() {
    this.isPause = false;
  }
}
