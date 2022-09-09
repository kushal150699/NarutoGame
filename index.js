import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["Sauske", "SSageMode", "IndraMode"]
let herosArray = ["Naruto", "NSageMode", "AshuraMode"]
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function getNewHero() {
    const nextheroData = characterData[herosArray.shift()]
    return nextheroData ? new Character(nextheroData) : {}
}

function attack() {
    if(!isWaiting){
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        
        if(wizard.dead){
            isWaiting = true
            if(herosArray.length > 0){
                setTimeout(()=>{
                    wizard = getNewHero()
                    render()
                    isWaiting = false
                },1000)
            }
            else{
               endGame()
            }
        }
        if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1000)
            }
            else{
                endGame()
            }
        }    
    }
}

function endGame() {
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - Both are dead" :
        wizard.health > 0 ? "Naruto Wins" :
            "Sasuke Wins"
            
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                </div>
                `
        }, 1000)
}

function render() {
    document.getElementById("attack-button").addEventListener('click', attack)
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

let wizard = getNewHero()
let monster = getNewMonster()
render()