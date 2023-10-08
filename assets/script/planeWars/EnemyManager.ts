import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
  // 敌机预设体
  @property(Prefab)
  enemyPre: Prefab = null;
  isPause: boolean = false;
  start() {
    // 每隔两秒创建一个敌机
    this.schedule(() => {
      if (!this.isPause) {
        // 创建敌机
        let enemy = instantiate(this.enemyPre);
        enemy.setParent(director.getScene().getChildByName('Canvas'));
        enemy.setPosition(Math.random() * 430 - 215, this.node.position.y);
      }
    }, 2);
  }

  pause() {
    // 暂停创建飞机
    this.isPause = true;
  }

  reStart() {
    // 重新开始创建飞机
    this.isPause = false;
  }

  update(deltaTime: number) {}
}
