let modInfo = {
	name: "接龙树",
	id: "Tree For 'JieLong'",
	author: "QwQe308 & 陌尘 & 匿_名 & #(vgakbzc)",//记得添加自己名字!
	pointsName: "点数",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.4",
	name: "",
}

let changelog = `<h1>接龙树<br>
<h3>熵节点由陌尘制作.<br>
<h3>加速子节点由QwQe308制作.这个屑作者拉长了整个游戏的长度.<br>
<h3>夸克蛋糕节点由匿名制作.这个屑作者纯属是来搞笑的.<br>
<h3>光子节点由#制作.这个屑作者纯属是来加没用的升级的.<br>
注:Quake=Qua(rk-ca)ke,Quale=Qua(rk-cand)le

`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

function getPnerf(){
  var nerf = n(0.5)
  if(inChallenge("q",21)){
	var x=new ExpantaNum(0.05)
	x=x.mul(challengeCompletions("q",21)+1)
	nerf=nerf.sub(x)
  }
  if(hasUpgrade("E",41) && !upgradeDisabled("E", 41)) nerf = nerf.mul(upgradeEffect('E',41))
  return nerf
}
function getPnerf2(){
  var nerf = new ExpantaNum(5)
  nerf=nerf.mul(n(0.95).pow(challengeCompletions("qq",21)))
  if(nerf<1.5)nerf=1.5
  return nerf
}
// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let eff = new ExpantaNum(0.01)
	if(hasUpgrade("E",11) && !upgradeDisabled("E", 11)) eff = eff.mul(upgradeEffect("E",11))
	if(hasUpgrade("E",22) && !upgradeDisabled("E", 22)) eff = eff.mul(upgradeEffect("E",22))
	eff = hasUpgThenMul(eff,'acc',11)
	eff = hasUpgThenMul(eff,'acc2',11)
	eff = hasUpgThenMul(eff,'E',51)
	if(hasUpgrade("q",12) && !upgradeDisabled("E", 12)) eff = eff.mul(upgradeEffect("q",12))
	var x=new ExpantaNum(1e10)
	x=x.pow(challengeCompletions("q",21))
	if(!hasUpgrade("p", 11)) eff=eff.mul(x)
	if(hasUpgrade("qq",12) && !upgradeDisabled("E", 12)) eff = eff.mul(upgradeEffect("qq",12))

	if(hasUpgrade("p", 11)) eff = eff.mul(upgradeEffect("p", 11))

	eff = eff.pow(getPnerf())//陌尘：为调平衡请不要删掉
	eff = eff.max(0.1)//陌尘：防止生产为0，请不要删掉
	//player.best = player.best.max(player.point)
	var xx=new ExpantaNum(100)
	eff = powsoftcap(eff,n('1e666'),getPnerf2())
	return eff
	
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
//  best:n(0)
}}

// Display extra things at the top of the page
var displayThings = [
  function(){return `当前作者数量: 4`},//记得修改!
  function(){return `减益1: 点数产量/100再^${format(getPnerf())} 不会低于0.1/s.<br>减益2: 点数产量>1e666的部分开${format(getPnerf2())}次根.`},//记得修改!
]

// Determines when the game "ends"
function isEndgame() {
	if(hasUpgrade("p", 33))return true;
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(360) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}