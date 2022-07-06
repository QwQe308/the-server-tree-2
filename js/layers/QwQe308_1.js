addLayer("acc", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头

    symbol: "ACC", // 这是节点上显示的字母
    //unlocked(){return player.points.gte(this.requires())},
    baseAmount(){return player.points},
    position: 0, // 节点顺序
    row:1,
    startData() { return {
        unlocked: false, //是否开始就解锁
		    points: new ExpantaNum(0),
		    current: new ExpantaNum(0),
		    costed: new ExpantaNum(0)
    }},
    autoUpgrade(){
      return hasUpgrade("p", 13)
    },
    color: "lightblue",
    resource: "加速子", // 重置获得的资源名称
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires(){return n(1e10).mul(five.pow(player.acc.costed)).mul(n(1e4).pow(player.acc2.costed))},
    getNumMultSpeed(){return ten.pow(player.points.max(this.requires()).div(this.requires()).add(1).log10().div(player.E.sTime.add(60)))},
    effectDescription(){return `
    加速子产量基于本轮献祭数字倍增速度(点数达到${format(this.requires())}以后)<br>
    当前倍增速度: x${format(this.getNumMultSpeed(),3)}/s(时间额外记一分钟)<br>
    加速子只记本轮最佳值 当前值:${format(player.acc.current)}
    <br>
    本轮已用${formatTime(player.E.sTime.toNumber())}<br>
    未使用的加速子:${format(player.acc.best.sub(player.acc.costed))} (总计:${format(player.acc.best)})<br>
    你已使用了 ${format(player.acc.costed)} 加速子,加速子所需点数随之上涨.`},
    gain(){
      var gain = expPow(this.getNumMultSpeed().add(1).log10().add(1).mul(10),2).sub(10).mul(10).pow(0.66)
      gain = hasUpgThenAdd(gain,'acc',13)
      gain = hasUpgThenMul(gain,'acc2',12)
      return gain
    },
    update(){
      player.acc.current = this.gain()
      player.acc.best = player.acc.best.max(player.acc.current).floor()
      player.acc.points = player.acc.points.max(player.acc.current).floor()
    },
    clickables:{
      11:{
        display:'快速献祭',
        unlocked:true,
        canClick:true,
        onClick(){
          layers.E.clickables[11].onClick()
        },
      },
      12:{
        display:'重置升级',
        unlocked:true,
        canClick:true,
        onClick(){
          layers.E.clickables[11].onClick()
          player.acc.upgrades = []
          player.acc.costed = n(0)
        },
      },
    },
    upgrades:{
      11:{
        description:'QwQe308-点数被最高加速子和当前加速子加成.',
        cost:n(1),
        canAfford(){return player.acc.best.sub(player.acc.costed).gte(this.cost)},
        pay(){player.acc.costed = player.acc.costed.add(this.cost)},
        effect(){
          if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
          var eff = player.acc.best.add(1).mul(player.acc.points.add(1))
          return eff
        },
        effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}return `x ${format(upgradeEffect(this.layer,this.id))}`},
      },
      12:{
        description:'最佳加速子加成熵获取指数.',
        cost:n(2),
        canAfford(){return player.acc.best.sub(player.acc.costed).gte(this.cost)},
        pay(){player.acc.costed = player.acc.costed.add(this.cost)},
        effect(){
          if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(0)
          var eff = player.acc.best.add(1).log10().div(6)
          eff = powsoftcap(eff,n(1),0.5)
          return eff
        },
        effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}return `+ ${format(upgradeEffect(this.layer,this.id))}`},
      },
      13:{
        description:'熵获取指数给予额外的加速子.',
        cost:n(4),
        canAfford(){return player.acc.best.sub(player.acc.costed).gte(this.cost)},
        pay(){player.acc.costed = player.acc.costed.add(this.cost)},
        effect(){
          if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(0)
          var eff = layers.E.gainExp()
          eff = hasUpgThenPow(eff,'acc',21)
          return eff
        },
        effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}return `+ ${format(upgradeEffect(this.layer,this.id))}`},
      },
      21:{
        description:'加速子增幅加速子升级13效果.',
        cost:n(32),
        canAfford(){return player.acc.best.sub(player.acc.costed).gte(this.cost)},
        pay(){player.acc.costed = player.acc.costed.add(this.cost)},
        effect(){
          if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
          var eff = player.acc.points.add(1).log10().add(1).log10().add(1).pow(2)
          return eff
        },
        effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}return `^ ${format(upgradeEffect(this.layer,this.id))}`},
      },
    },
    doReset(){
      layerDataReset(this.layer,['best','costed','upgrades'])
    },
    baseResource:'点数'
})



addLayer("acc2", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头

  symbol: "ACC<sup>2</sup>", // 这是节点上显示的字母
  //unlocked(){return player.points.gte(this.requires())},
  baseAmount(){return player.E.points},
  layerShown(){return player.acc.unlocked},
  position: 0, // 节点顺序
  row:1,
  startData() { return {
      unlocked: false, //是否开始就解锁
      points: new ExpantaNum(0),
      current: new ExpantaNum(0),
      costed: new ExpantaNum(0)
  }},
  autoUpgrade(){
      return hasUpgrade("p", 14)
    },
  color: "lightblue",
  resource: "二次加速子", // 重置获得的资源名称
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  requires(){return n(1.79e308).mul(n(1e38).pow(player.acc2.costed))},
  getNumMultSpeed(){return ten.pow(this.baseAmount().max(this.requires()).div(this.requires()).add(1).log10().div(player.E.sTime.add(120)))},
  effectDescription(){return `
  二次加速子产量基于本轮献祭熵倍增速度(熵达到${format(this.requires())}以后)<br>
  当前倍增速度: x${format(this.getNumMultSpeed(),3)}/s(时间额外记两分钟)<br>
  二次加速子只记本轮最佳值 当前值:${format(player.acc2.current)}
  <br>
  本轮已用${formatTime(player.E.sTime.toNumber())}<br>
  未使用的二次加速子:${format(player.acc2.best.sub(player.acc2.costed))} (总计:${format(player.acc2.best)})<br>
  你已使用了 ${format(player.acc2.costed)} 二次加速子,二次加速子&加速子所需点数随之上涨.`},
  gain(){
    var gain = expPow(this.getNumMultSpeed().add(1).log10().add(1).root(this.requires().max(1e10).add(1).log10().add(1).log10()).mul(10),2).sub(10).sqrt()
    gain = hasUpgThenAdd(gain,'acc2',13)
    return gain
  },
  update(){
    player.acc2.current = this.gain()
    player.acc2.best = player.acc2.best.max(player.acc2.current).floor()
    player.acc2.points = player.acc2.points.max(player.acc2.current).floor()
  },
  clickables:{
    11:{
      display:'快速献祭',
      unlocked:true,
      canClick:true,
      onClick(){
        layers.E.clickables[11].onClick()
      },
    },
    12:{
      display:'重置升级',
      unlocked:true,
      canClick:true,
      onClick(){
        layers.E.clickables[11].onClick()
        player.acc2.upgrades = []
        player.acc2.costed = n(0)
      },
    },
  },
  upgrades:{
    11:{
      description:'QwQe308-点数被最高二次加速子和当前二次加速子加成...再来一次?',
      cost:n(1),
      canAfford(){return player.acc2.best.sub(player.acc2.costed).gte(this.cost)},
      pay(){player.acc2.costed = player.acc2.costed.add(this.cost)},
      effect(){
        if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
        var eff = player.acc2.best.add(1).mul(player.acc2.points.add(1)).pow(2)
        eff = expRootSoftcap(eff,n(4096),1.2)
        eff = powsoftcap(eff,n(4096),0.8)
        return eff
      },
      effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}return `x ${format(upgradeEffect(this.layer,this.id))}`},
    },
    12:{
      description:'最佳二次加速子和当前二次加速子倍增加速子.',
      cost:n(2),
      canAfford(){return player.acc2.best.sub(player.acc2.costed).gte(this.cost)},
      pay(){player.acc2.costed = player.acc2.costed.add(this.cost)},
      effect(){
        if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
        var eff = player.acc2.best.add(1).mul(player.acc2.points.add(1)).log10().div(2).add(1)
        eff = powsoftcap(eff,n(1.6),2)
        return eff
      },
      effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}return `* ${format(upgradeEffect(this.layer,this.id))}`},
    },
    13:{
      description:'熵获取指数给予额外的二次加速子.',
      cost:n(4),
      canAfford(){return player.acc2.best.sub(player.acc2.costed).gte(this.cost)},
      pay(){player.acc2.costed = player.acc2.costed.add(this.cost)},
      effect(){
        if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(0)
        var eff = layers.E.gainExp()
        return eff
      },
      effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}return `+ ${format(upgradeEffect(this.layer,this.id))}`},
    },
  },
  doReset(){
    layerDataReset(this.layer,['best','costed','upgrades'])
  },
  baseResource:'熵'
})