function __gain_qwq(){
	var gain = player.E.points.mul(0.25).pow(0.1)
	if(hasUpgrade("E",51) && !upgradeDisabled("E", 51)) gain = gain.mul(upgradeEffect("E",51))
	return gain.max(0)
}

addLayer("E", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "Entropy", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
		diepoints:new ExpantaNum(0),
		e:new ExpantaNum(0),
		cao:new ExpantaNum(0),
		eUnlocked:false,
		sTime:n(0)
    }},
    color: "#EE82EE",
    resource: "熵", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires:new ExpantaNum(1),
    exponent:1,

    /* getResetGain(){
        var layer = this.layer
        if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return OmegaNumZero
		let gain = tmp[layer].baseAmount.div(tmp[layer].requires).pow(tmp[layer].exponent).times(tmp[layer].gainMult).pow(tmp[layer].gainExp)
		gain = expRootSoftcap(gain,n(1.79e308),1.2)
		return gain.floor().max(0);
    },
    effectDescription(){if(this.getResetGain().gte(1.79e308)) return "<br>警告:由于极端的不稳定性,熵产量增长减缓.";return ""}, */

    baseAmount(){return player.points},//基础资源数量
    baseResource:"点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
			if(hasUpgrade("E",12) && !upgradeDisabled("E", 12)) mult = mult.mul(upgradeEffect("E",12))
			if(hasUpgrade("E",23) && !upgradeDisabled("E", 23)) mult = mult.mul(upgradeEffect("E",23))
			if(hasUpgrade("E",52) && !upgradeDisabled("E", 52)) mult = mult.mul(upgradeEffect("E",52)) 
			if(hasUpgrade("E",53) && !upgradeDisabled("E", 53)) mult = mult.mul(upgradeEffect("E",53))
			if(hasUpgrade("q",11) && !upgradeDisabled("q", 11)) mult = mult.mul(upgradeEffect("q",11))
			if(hasUpgrade("q",12) && !upgradeDisabled("q", 12)) mult = mult.mul(upgradeEffect("q",12))
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
			if(hasUpgrade("E",21) && !upgradeDisabled("E", 21)) exp = exp.add(upgradeEffect("E",21))
			if(hasUpgrade("E",43) && !upgradeDisabled("E", 43)) exp = exp.add(upgradeEffect("E",43))
			exp = hasUpgThenAdd(exp,'acc',12)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return true},
	autoUpgrade(){return hasUpgrade("q",13) && !upgradeDisabled("q", 13)},
	passiveGeneration(){
		var a = new ExpantaNum(0)
			if(hasUpgrade("E",42) && !upgradeDisabled("E", 42) || (hasUpgrade("q",13) && !upgradeDisabled("q", 13)) || hasUpgrade("qq",13)) a = a.add(upgradeEffect(this.layer,42).div(100))
			if((hasUpgrade("q",13) && !upgradeDisabled("q", 13)) || hasUpgrade("qq",13)) a = a.mul(10)
            if(hasUpgrade("qq",13))a=a.mul(10)
		return a   
         },
		 
	doReset(resettingLayer) {
        let keep = [];
				keep.push("e");
        if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer,keep)	
			
		}
		
	},
	
	update(diff){
        if(hasUpgrade("E",12) && !upgradeDisabled("E", 12))player.E.points = player.E.points.sub(player.E.points.mul(0.01).mul(diff)).max(0)
		if(hasUpgrade("E",12) && !upgradeDisabled("E", 12))player.E.diepoints = player.E.diepoints.add(player.E.points.mul(0.01).mul(diff)).max(0)
		if(hasUpgrade("E",13) && !upgradeDisabled("E", 13))player.E.points = player.E.points.add(upgradeEffect("E",13).mul(diff)).max(0)
		if(hasUpgrade("E",22) && !upgradeDisabled("E", 22))player.E.diepoints = player.E.diepoints.sub( player.E.diepoints.mul(0.01).mul(diff)).max(0)
			
		if(hasUpgrade("E",23) && !upgradeDisabled("E", 23))player.E.points = player.E.points.sub(player.E.points.mul(0.03).mul(diff)).max(0)
		if(hasUpgrade("E",23) && !upgradeDisabled("E", 23))player.E.diepoints = player.E.diepoints.add(player.E.points.mul(0.03).mul(diff)).max(0)
		player.E.sTime = player.E.sTime.add(diff)

		if(player.points.gte(layers.acc.requires())) player.acc.unlocked = true
		if(layers.acc2.baseAmount().gte(layers.acc2.requires())) player.acc2.unlocked = true

			if(hasUpgrade("p", 12) && hasUpgrade("E", 23)) player.E.e = player.E.e.add(__gain_qwq().mul(diff).mul(upgradeEffect("p", 12)))
			}, 
		
		
	upgrades :{
        11 : {
            title:'熵增',
            description:'你的熵开始<br>成群结对的出现<br>熵增加点数获取',
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                let x = expRoot(player.E.points.mul(0.15).add(1).pow(0.75),1.2)
				x = expRootSoftcap(x,n(1.79e308),1.33)
                return x
            },
            effectDisplay(){ 
            	let display = format(upgradeEffect(this.layer,this.id))+"×" 
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}
            	return display
            },
            cost:new ExpantaNum(1)
        },
		12 : {

            title:'死亡',
            description:'一部分熵死亡了,它们的尸体增加熵的获取',
			unlocked(){return hasUpgrade("E",11)||player.E.cao.gte(1)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                let x = player.E.diepoints
				
                return x.pow(0.2).add(1)
            },
            effectDisplay(){ 
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}
            	return format(upgradeEffect(this.layer,this.id))+"×" + "<br>你有" + format(player.E.diepoints,2) + "死亡的熵"  
            },
            cost:new ExpantaNum(5)
        },
		 13 : {
            title:'新生',
            description:'根据你死亡的熵,每秒生产新的熵',
			unlocked(){return hasUpgrade("E",12)||player.E.cao.gte(1)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(0)
                let x = player.E.diepoints
				
                return x.pow(0.5).mul(0.2).sub(1).max(0)
            },
            effectDisplay(){ 
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}
            	return "每秒生产" + format(upgradeEffect(this.layer,this.id)) + "熵" 
            },
            cost:new ExpantaNum(20)
        },
		21 : {
            title:'循环',
            description:'点数好像没用了,它开始增加熵的获取指数',
			unlocked(){return hasUpgrade("E",13)||player.E.cao.gte(1)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(0)
                let x = player.points
				
                return x.add(1).log10().add(1).log10().add(1).pow(2).sub(1).mul(0.12)
            },
            effectDisplay(){ 
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"}
            	return format(upgradeEffect(this.layer,this.id))+"+" 
            },
            cost:new ExpantaNum(100)
        },
		22 : {

            title:'消失',
            description:'熵的尸体开始逐渐减少,但是点数加成自身.',
			unlocked(){return hasUpgrade("E",21)||player.E.cao.gte(1)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                let x = player.points.add(1).log10().add(1).pow(0.75)
                return x
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} 
            return format(upgradeEffect(this.layer,this.id))+"×" },
            cost:new ExpantaNum(300)
		},
		23 : {
            title:'协同',
            description:'熵的获取翻倍,熵死亡速度翻4倍',
			unlocked(){return hasUpgrade("E",22)||player.E.cao.gte(1)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                let x = n(2)
                return x
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} 
            return format(upgradeEffect(this.layer,this.id)) + "×" },
            cost:new ExpantaNum(600)
        },
		41 : {
            title:'升级',
            description:'点数指数*1.2.<br>谨慎选择!',
			unlocked(){return player.E.e.gt(1)||player.E.cao.gte(1)||hasUpgrade("p", 12)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                let x = n(1.2)
				
                return x
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} 
            return "^"+ format(upgradeEffect(this.layer,this.id))  },
			canAfford() {return player.E.e.gte(2)},
			cost(){return new ExpantaNum(2)},
			pay(){player.E.e = player.E.e.sub(2)},
			currencyDisplayName:"能量"
        },
		42 : {
            title:'升级',
            description:'每秒获取可获取熵的1%',
			unlocked(){return player.E.e.gt(1)||player.E.cao.gte(1)||hasUpgrade("p", 12)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(0)
                let x = n(1)
				
                return x
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} 
            return format(upgradeEffect(this.layer,this.id)) + "%" },
            canAfford() {return player.E.e.gte(1)},
			cost(){return new ExpantaNum(1)},
			pay(){player.E.e = player.E.e.sub(1)},
			currencyDisplayName:"能量"
        },
		43 : {
            title:'升级',
            description:'根据能量的小数部分,增加你的熵获取指数(1000能量后强制最大)',
			unlocked(){return player.E.e.gt(1)||player.E.cao.gte(1)||hasUpgrade("p", 12)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(0)
                if(player.E.e.gte(1000)) return n(0.25)
                let x = player.E.e.sub(player.E.e.floor()).pow(0.5).div(4)
                return x
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} 
            return format(upgradeEffect(this.layer,this.id)) + "+" },
           canAfford() {return player.E.e.gte(4)},
			cost(){return new ExpantaNum(4)},
			pay(){player.E.e = player.E.e.sub(4)},
			currencyDisplayName:"能量"
        },
		51 : {
            title:'升级',
            description:'根据能量小数部分增加能量和点数的获取(1000能量后强制最大)',
			unlocked(){return player.E.e.gt(1)||player.E.cao.gte(1)||hasUpgrade("p", 12)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                if(player.E.e.gte(1000)) return n(2)
                let x = player.E.e.sub( player.E.e.floor() )
                return x.add(1)
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} 
            return format(upgradeEffect(this.layer,this.id)) + "×" },
            canAfford() {return player.E.e.gte(8)},
			cost(){return new ExpantaNum(8)},
			pay(){player.E.e = player.E.e.sub(8)},
			currencyDisplayName:"能量"
        },
		52 : {
            title:'升级',
            description:'熵的获取根据熵的增加而增加',
			unlocked(){return player.E.e.gt(1)||player.E.cao.gte(1)||hasUpgrade("p", 12)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                let x = player.E.e
					      x = player.E.points.add(1).log10().add(1).pow(1.5)
                return x
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} 
            return format(upgradeEffect(this.layer,this.id)) + "×" },
            canAfford() {return player.E.e.gte(12)},
			cost(){return new ExpantaNum(12)},
			pay(){player.E.e = player.E.e.sub(12)},
			currencyDisplayName:"能量"
        },
		53 : {
            title:'升级',
            description:'能量倍增熵.熵升级不再被重置.',
			unlocked(){return player.E.e.gt(1)||player.E.cao.gte(1)||hasUpgrade("p", 12)},
            effect() {
            	if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                let x = expPow(player.E.e.add(1).log10().add(1).pow(1.2).mul(10),2.5).div(10)
                return x.add(1)
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} 
            return format(upgradeEffect(this.layer,this.id)) + "×" },
            canAfford() {return player.E.e.gte(16)},
			cost(){return new ExpantaNum(16)},
			pay(){player.E.e = player.E.e.sub(16)},
			currencyDisplayName:"能量"
        },
	},
	
	clickables:{
			11:{
				title(){return "<h2>献祭<h4>将你的熵转化为" + format( this.gain() , 2 ) + "点能量"
						},
				canClick(){
					return this.gain().gte(1)
				},
				gain(){
				  var gain = player.E.points.mul(0.25).pow(0.1)
				  if(hasUpgrade(this.layer,51) && !upgradeDisabled("E", 51)) gain = gain.mul(upgradeEffect("E",51))
				  return gain.max(0)
				},
				style() {return {'height':'100px','width':'350px'}},
				unlocked(){return hasUpgrade("E",23)},
				onClick(){
				  doReset(this.layer,true)
					if(player.E.cao.lt(1))player.E.cao = new ExpantaNum(1)
					
				player.E.e = player.E.e.add( this.gain() )
				player.E.eUnlocked = true
				player.points = new ExpantaNum(0)
				var upg = keepThings(player.E.upgrades,[41,42,43,51,52,53])
				if(!hasUpgrade('E',53) || upgradeDisabled("E", 53)) layerDataReset(this.layer,['e','cao','eUnlocked'])
				else layerDataReset(this.layer,['e','cao','eUnlocked','upgrades'])
				if(!hasUpgrade('E',53) || upgradeDisabled("E", 53)) player.E.upgrades = upg
				player.E.sTime = n(0)
				},
			},
	},
	
			tabFormat: {
        主界面: {
            buttonStyle() {return  {'color': 'write'}},
            content:[
			
			"main-display","prestige-button","resource-display","clickables",
			["row", [ ["upgrade", 11],["upgrade", 12],["upgrade", 13] ] ] ,
			["row", [ ["upgrade", 21],["upgrade", 22],["upgrade", 23] ] ] ,
			
			
			],

				},
				
		能量: {
            buttonStyle() {return  {'color': 'write'}},
            unlocked(){return player.E.eUnlocked||player.E.e.gt(0)},
            content:[
			
			["display-text",
              	function() {
					if(player.E.e.gt(0))return 	"<h3>您有 " + "<span style='color: " + tmp[this.layer].color + " ; font-size: 25px;'>" + 
									format(player.E.e) + "</span>" + " 点能量"
						},
			],"blank","blank",
			
			 ["row", [ ["upgrade", 41],["upgrade", 42],["upgrade", 43] ] ],
			 ["row", [ ["upgrade", 51],["upgrade", 52],["upgrade", 53] ] ],
			 ["row", [ ["upgrade", 61],["upgrade", 62],["upgrade", 63] ] ],
			
			
			],
				},

    },
})
