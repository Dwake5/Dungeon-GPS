// I have been trying out scripting, this was made as the community expected it was the best money maker, but was unsure if so and by how much.
// I created this to give the answer. It is now used by the community at melvoridle.com

const gpsFromVolcano = (accuracy, maxHit, attackSpeed, stance = 'melee') => {
  let totalHits = 0
  if (stance == 'ranged'){
    stance = 2
  } else if (stance == 'magic') {
    stance = 3
  } else {
    stance = 1
  }

  let simulations = 1000

  // health, melee, range, magic
  let monsters = [
    [100, 1536, 1536, 832], 
    [200, 2496, 2496, 1152],
    [400, 4416, 4416, 4416],
    [800, 8256, 8256, 8256],
    [1600, 15936, 15936, 15936],
    [2500, 24896, 24896, 29376],
  ]

  getHitChance = def => {
    if (accuracy < def) {
      return 50 *  accuracy / def
    } else {
      return 100 - 50 * def / accuracy
    }
  }

  averageHits = (accuracy, maxHit, enemyHP) => {
    let hits = 0
    
    while (enemyHP > 0) {
      hits++
      if (Math.random()*100 <= accuracy) {
        enemyHP -= Math.floor(Math.random()*maxHit) + 1
      } 
    }
    return hits
  }

  simulateKills = monster => {
    for (i = 0; i < simulations; i++) {
      totalHits += averageHits(getHitChance(monster[stance]),maxHit,monster[0])
    } 
  }

  for (j = 0; j < monsters.length; j++) {
    simulateKills(monsters[j])
  }

  let hittingTime = totalHits * attackSpeed / simulations
  let respawnTimers = 3000 * 6

  // This has been calculated as the average expected return
  let coins = 49857

  return Math.floor(coins / ((hittingTime + respawnTimers) / 1000) * 3600)
}

// WHATS THIS?
// This algorithm will tell you how much gold per hour you will make if you idle in the Volcano.
// It simulates you fighting the volcano 1000 times and averages the results.
// It takes into account, you opening the elite chest and the average value of it, the value of the firecape, and the average gold drops.
// It also takes into account respawn timers.


// HOW TO USE:
// On line 75, put in your accuracy, maxhit, attack speed and then 'ranged' or 'magic'
// If you put in neither it will assume melee as thats the most common stance.


// This was also made to determine how many hits an enemy will take to kill on average.
const simulateAverage = () => {
  const averageHits = (accuracy, maxHit, enemyHP) => {
      let hits = 0

      while (enemyHP > 0) {
        hits++
        if (Math.random()*100 <= accuracy) {
          enemyHP -= Math.floor(Math.random()*maxHit) + 1
        } 
      }

      return hits
  }

  let total  = 0

  for (i = 0; i < 10000; i++) {
    total += averageHits(60.4,420,2200)
    // Put your accuracy, maxhit and enemys hp above here
  } 

  return total/10000
}

