function calcElectronGain(){
    let gain = player.p.points.div(1e6).pow(0.5).floor()
    return gain
}
function calcNextGainReq(){
    let req = calcElectronGain().add(1).pow(2).mul(1e6)
    return req
}

addLayer("p", {
    symbol: "Ph",
    position: 0,
    startData(){return{
        unlocked: true,
        points: new ExpantaNum(0),
        resetTime: 0,
        eUnlocked: false,
        e: n(0)
    }},
    color: "yellow",
    resource: "光子",
    type: "normal",
    requires:new ExpantaNum(1e24),
    exponent:0.2,
    baseAmount() {
        return player.qq.points
    },
    baseResource:"夸克蜡烛",
    gainMult() {
        mult = new ExpantaNum(1)
        if(hasUpgrade("p", 23)) mult = mult.mul(upgradeEffect("p", 23))
        if(hasUpgrade("p", 31)) mult = mult.mul(upgradeEffect("p", 31))
        if(hasUpgrade("p", 33)) mult = mult.mul(upgradeEffect("p", 33))
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        return exp
    },
	passiveGeneration(){
		return n(0)
    },
    softcap(){return n(25000)},
    softcapPower(){return n(0.35)},
    tabFormat:{
        光子: {
            content:[
                "main-display","prestige-button","resource-display",
                ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],]],
                ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24],]],
            ]
        },
        电子: {
            unlocked() {
                if(hasUpgrade("p", 24)) player.p.eUnlocked=true
                return player.p.eUnlocked
            },
            content:[
                ["display-text", function(){
                    return "你有 <span style=\"font-size:32px;color:#33ffaa\">" + format(player.p.e) + "</span> 电子"
                }],
                "blank",["clickable",11],
                "blank",["display-text", function(){
                    return "你有 " + format(player.p.points) + "</span> 光子"
                }],"blank",
                ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],]],
                ["row",[["upgrade",41],["upgrade",42],["upgrade",43],["upgrade",44],]],
            ]
        }
    },
    upgrades:{
        11: {
            title:'u11',
            description:'点数增加点数获取(购买这个升级禁用“终极挑战”加成！)',
            effect() {
                let x = player.points.add(1).pow(0.16)
                if(x.gte(1e100)) x = x.mul(1e100).pow(0.5)
                return x
            },
            effectDisplay(){ 
                let display = "x" + format(upgradeEffect(this.layer,this.id))
                return display
            },
            cost:new ExpantaNum(1)
        },
        12: {
            title:'u12',
            description:'每秒自动获得1%能量',
            effect() {
                return n(0.01)
            },
            unlocked(){
                return hasUpgrade("p", 11)
            },
            cost:new ExpantaNum(2)
        },
        13: {
            title:'u13',
            description:'自动购买加速子升级',
            unlocked(){
                return hasUpgrade("p", 12)
            },
            cost:new ExpantaNum(40)
        },
        14: {
            title:'u14',
            description:'自动购买二次加速子升级',
            unlocked(){
                return hasUpgrade("p", 13)
            },
            cost:new ExpantaNum(2500)
        },
        21: {
            title:'u21',
            description:'每秒获得可获得夸克蜡烛的1%',
            unlocked(){
                return hasUpgrade("p", 14)
            },
            effect(){
                return n(0.01)
            },
            cost:new ExpantaNum(50000)
        },
        22: {
            title:'u22',
            description:'夸克蛋糕第一个升级效果变为10次方',
            unlocked(){
                return hasUpgrade("p", 21)
            },
            cost:new ExpantaNum(60000)
        },
        23: {
            title:'u23',
            description:'夸克蛋糕增加光子数量',
            unlocked(){
                return hasUpgrade("p", 22)
            },
            effect(){
                let eff = player["q"].points.add(1).pow(0.5)
                if(eff.gte(100)) eff = eff.mul(100).pow(0.5)
                return eff
            },
            effectDisplay() {
                return "x" + format(upgradeEffect("p", 23))
            },
            cost:new ExpantaNum(65000)
        },
        24: {
            title:'u24',
            description:'每秒获得可获得光子的1%',
            unlocked(){
                return hasUpgrade("p", 23)
            },
            cost:new ExpantaNum(300000)
        },
        31: {
            title:'eu11',
            description:'光子增加光子获取数量',
            effect(){
                let eff = player["p"].points.add(1).pow(0.5)
                if(eff.gte(100000)) eff = eff.mul(100000).pow(0.5)
                return eff
            },
            effectDisplay() {
                return "x" + format(upgradeEffect("p", 31))
            },
            cost:new ExpantaNum(1),
            canAfford(){return player.p.e.gte(1)},
            pay(){player.p.e = player.p.e.sub(1)},
            currencyDisplayName:"电子"
        },
        32: {
            title:'eu12',
            description:'光子增加夸克蜡烛获取数量',
            effect(){
                let eff = player["p"].points.add(1).pow(3)
                if(eff.gte(1e30)) eff = eff.mul(1e30).pow(0.5)
                return eff
            },
            effectDisplay() {
                return "x" + format(upgradeEffect("p", 32))
            },
            cost:new ExpantaNum(2),
            canAfford(){return player.p.e.gte(2)},
            pay(){player.p.e = player.p.e.sub(2)},
            currencyDisplayName:"电子"
        },
        33: {
            title:'eu13',
            description:'加速子增加光子获取数量',
            effect(){
                let eff = player["acc"].points.add(1)
                return eff
            },
            effectDisplay() {
                return "x" + format(upgradeEffect("p", 33))
            },
            cost:new ExpantaNum(3),
            canAfford(){return player.p.e.gte(3)},
            pay(){player.p.e = player.p.e.sub(3)},
            currencyDisplayName:"电子"
        },
    },
    clickables:{
        11:{
            title(){
                let ret = "<br><h4>重置光子以获得 " + format(calcElectronGain()) + " 电子"
                if(calcElectronGain().lt(1000)) {
                    ret = ret + "<br><br><p>下一个电子在 " + format(calcNextGainReq()) + " 光子</p>"
                }
                if(calcElectronGain().gte(1e6)) {
                    ret = "+" + format(calcElectronGain()) +" 电子"
                }
                return ret
            },
            canClick(){
                return calcElectronGain().gte(1)
            },
            style() {return {'height':'100px','width':'250px'}},
            onClick(){
                doReset(this.layer,true)
                    
                player.p.e = player.p.e.add(calcElectronGain())
                player.p.eUnlocked = true
                player.points = new ExpantaNum(0)
                var upg = keepThings(player.p.upgrades,[31,32,33])
                layerDataReset(this.layer,['e','eUnlocked'])
                player.p.upgrades = upg
            },
        },
    },
    challenges: {
        
    },
    doReset(layer){
        layerDataReset('acc')
        layerDataReset('acc2')
        layerDataReset('E')
        layerDataReset('q', ["challenges"])
        layerDataReset('qq')
    },
    row: 4,
    layerShown(){return true},
    passiveGeneration(){
        let gen = n(0)
        if(hasUpgrade("p",24)) gen = gen.add(0.01)
        return gen
    }
})
