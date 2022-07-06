function getC21need(){
                if(challengeCompletions("q",21)==0)return (1e195)
                if(challengeCompletions("q",21)==1)return (1e100)
                if(challengeCompletions("q",21)==2)return (1e70)
                if(challengeCompletions("q",21)==3)return new ExpantaNum(5e54)
                if(challengeCompletions("q",21)==4)return (5e43)
                if(challengeCompletions("q",21)==5)return (1e33)
                if(challengeCompletions("q",21)==6)return (1e25)
                if(challengeCompletions("q",21)==7)return (1e17)
                if(challengeCompletions("q",21)==8)return (5.001e9)
                    return (new ExpantaNum("114e514"))
            }//1e210/1e130/1e80/5e61/1e47/1e36/1e26/1e17/5e9



addLayer("q", {
    symbol: "Quake",
    position: 0,
    startData(){return{
        unlocked: true,
        points: new ExpantaNum(0)
    }},
    color: "white",
    resource: "夸克蛋糕",
    type: "normal",
    requires:new ExpantaNum(1e250),
    exponent:1,
    baseAmount() {
        return player.E.points
    },
    baseResource:"熵",
    getResetGain() {
        let x=player.E.points
        x=x.add(1)
		return x.logBase(10)
    },
    gainMult() {
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        return exp
    },
	passiveGeneration(){
		let a = new ExpantaNum(0)
		if(hasUpgrade("qq",13))a=a.add(0.1)
		return a
    },
    upgrades:{
        11:{
            title:"6月30日是QwQe308的生日<br>",
            description:"一起吃个夸克蛋糕庆祝一下吧<br>效果:每过一年,你的熵获取*1e308",
            effect(){
                if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                let x=zero
                x=x.add(player.timePlayed)
                x=x.div(365)
                x=x.div(86400)
                let y=new ExpantaNum(1e308)
                if(hasUpgrade("q",14) && !upgradeDisabled("q", 14)){y=y.pow(10)}
                if(hasUpgrade("p", 22)) y = y.pow(10)
                return y.pow(x)
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} return "x"+format(upgradeEffect(this.layer,this.id)) },
            cost:one,
        },
        12:{
            title:"开Party<br>",
            description:"吃得越多,你的熵就越活跃<br>效果:消耗的夸克蛋糕增幅你的熵和点数获取",
            effect(){
                if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) return new ExpantaNum(1)
                let x=one
                x=x.add(player.q.total-player.q.points)
                if(hasUpgrade("qq",11)){x=x.add(player.q.points)}
                if(hasUpgrade("q",14) && !upgradeDisabled("q", 14)){x=x.pow(10)}
                return x.root(4)
            },
            effectDisplay(){if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {return "这个升级被禁用了LOL"} return "x"+format(upgradeEffect(this.layer,this.id)) },
            unlocked(){return hasUpgrade("q",11)},
            cost:new ExpantaNum(2000),
        },
        13:{
            title:"自动化<br>",
            description:function(){
                let ret="自动购买熵升级,每秒获得10%的熵收益"
                if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {ret += "\n这个升级被禁用了LOL"}
                return ret
            },
            unlocked(){return hasUpgrade("q",12)},
            cost:new ExpantaNum(2000),
        },
        14:{
            title:"大制作<br>",
            description:function(){
                let ret="前两个升级效果变为原来的十次方"
                if(hasUpgrade(this.layer, this.id) && upgradeDisabled(this.layer, this.id)) {ret += "\n这个升级被禁用了LOL"}
                return ret
            },
            unlocked(){return hasUpgrade("q",13)},
            cost:new ExpantaNum(10000),
        },
    },
    challenges: {
        21: {
            name: "终极挑战",
            challengeDescription: function(){
                return `你的点数获得指数 *` + format(n(0.953-challengeCompletions(this.layer, this.id)*0.05)) +"<br/>已完成次数："+ challengeCompletions(this.layer, this.id) +"/9"
            },
            goalDescription: function(){
                return `达到`+format(getC21need())+`点数`
            },
            rewardDescription:function(){
                if(hasUpgrade("p", 11)) return "这个挑战没有加成LOL"
                return "点数x1e" + (challengeCompletions(this.layer, this.id)*10) + " --> x1e" + (challengeCompletions(this.layer, this.id)*10+10)
            },
            completionLimit:9,
            canComplete: function() {
                /*
                if(challengeCompletions("q",21)==0)return player.points.gte(1e195)
                if(challengeCompletions("q",21)==1)return player.points.gte(1e100)
                if(challengeCompletions("q",21)==2)return player.points.gte(1e80)
                if(challengeCompletions("q",21)==3)return player.points.gte(5e61)
                if(challengeCompletions("q",21)==4)return player.points.gte(1e47)
                if(challengeCompletions("q",21)==5)return player.points.gte(1e36)
                if(challengeCompletions("q",21)==6)return player.points.gte(1e26)
                if(challengeCompletions("q",21)==7)return player.points.gte(1e17)
                if(challengeCompletions("q",21)==8)return player.points.gte(5e9)
                    */
                return player.points.gte(getC21need())
            },
        },
    },
    doReset(layer){
        layerDataReset('acc')
        layerDataReset('acc2')
        layerDataReset('E')
        },
    row: 3,
    layerShown(){return true}
})


addLayer("qq", {
    symbol: "Quale",
    position: 2,
    startData(){return{
        unlocked: false,
        points: new ExpantaNum(0),
        disabledUpgrades: []
    }},
    color: "red",
    resource: "夸克蜡烛",
    type: "normal",
    requires:new ExpantaNum('1e654'),
    exponent:1,
    baseAmount() {
        return player.points
    },
    baseResource:"点数",
    gainMult() {
        mult = new ExpantaNum(1)
        if(hasUpgrade("p", 32)) mult = mult.mul(upgradeEffect("p", 32))
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        return exp
    },
    doReset(layer){
        if(layer=='q')return
        layerDataReset('acc')
        layerDataReset('acc2')
        layerDataReset('E')
        layerDataReset('q')
    },
    passiveGeneration(){
        gen = n(0)
        if(hasUpgrade("p", 21)) gen = gen.add(0.01)
        return gen
    },
    row: 3,
    upgrades:{
        11:{
            title:"2022年6月30日是QwQe308的第16个生日<br>",
            description:"插上16根夸克蜡烛庆祝一下吧<br>效果:把夸克蛋糕升级12的'消耗'改成'全部'",
            cost:new ExpantaNum(16),
        },
        12:{
            title:"光",
            description:"夸克蜡烛以5次方增幅你的点数获取",
            effect(){
                let x=new ExpantaNum(1)
                x=x.add(player.qq.points)
                x=x.pow(5)
                return x;
            },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer,this.id)) },
            cost:new ExpantaNum(308),
        },
        13:{
            title:"自动化Lv.2",
            description:"每秒获得100%的熵,每秒获得10%的夸克蛋糕",
            cost:new ExpantaNum(1000),
        },
    },
    challenges: {
        21: {
            name: "终极随机挑战",
            challengeDescription: function(){ return `随机禁用 `+(3+challengeCompletions("qq",21)).toString()+` 个升级` },
            goalDescription: function(){
                let x=new ExpantaNum("1e700")
                let y=new ExpantaNum(1e20)
                y=y.pow(challengeCompletions("qq",21))
                x=x.mul(y)
                return `达到`+format(x)+`点数`
            },
            rewardDescription:"夸克蜡烛x1e(2x完成次数),减益2次数*0.95",
            completionLimit:10,
            canComplete: function() {
                let x=new ExpantaNum("1e700")
                let y=new ExpantaNum(1e20)
                y=y.pow(challengeCompletions("qq",21))
                x=x.mul(y)
                return player.points.gte(x)
            },
            onEnter() {
                let upgrades = []
                for(var i=1;i<=2;i++){
                    for(var j=1;j<=3;j++){
                        upgrades.push(["E",i*10+j])
                    }
                }
                for(var i=4;i<=5;i++){
                    for(var j=1;j<=3;j++){
                        upgrades.push(["E",i*10+j])
                    }
                }
                for(var i=11;i<=13;i++){
                    upgrades.push(["acc",i])
                    upgrades.push(["acc2",i])
                    upgrades.push(["q",i])
                }
                upgrades.push(["acc",21])
                upgrades.push(["q",14])

                for(var T=0;T<3+challengeCompletions("qq",21);T++){
                    var QwQe308
                    var shenmi = false
                    while(!shenmi){
                        QwQe308=upgrades[Math.floor(Math.random()*upgrades.length)]
                        shenmi=true
                        for(i in player[this.layer].disabledUpgrades){
                            if(QwQe308==player[this.layer].disabledUpgrades[i]){
                                shenmi=false
                                break;
                            }
                        }
                    }
                    player[this.layer].disabledUpgrades.push(QwQe308)
                }
            },
            onExit() {
                player[this.layer].disabledUpgrades = []
            }
        },
    },
    layerShown(){return true},
    softcap(){return n("e50")},
    softcapPower(){return n("0.2")}
})

function upgradeDisabled(layer, id) {
    for(i in player[this.layer].disabledUpgrades){
        if(layer==player["qq"].disabledUpgrades[i][0] && id==player["qq"].disabledUpgrades[i][1]){
            return true
        }
    }
    return false
}