module.exports.config = {
  name: 'fishing',
  version: '1.0.1',
  hasPermssion: 0,
  credits: 'Mirai Team',
  description: 'Join fishing right on your own group',
  commandCategory: 'game',
  usages: 'help',
  cooldowns: 0,
  dependencies: {
    'fs-extra': '',
    path: '',
    'moment-timezone': '',
    semver: '',
  },
}
module.exports.onLoad = async function () {
  const { mkdirSync, existsSync, readFileSync } = global.nodemodule['fs-extra'],
    { join } = global.nodemodule.path,
    semver = global.nodemodule.semver,
    dirmain = join(
      global.client.mainPath,
      'modules',
      'commands',
      'cache',
      'FishingData'
    )
  if (semver.lt(global.config.version, '1.2.10')) {
    return console.log('======= DOES NOT SUPPORT FOR OLD SOURCE CODE =======')
  }
  if (!existsSync(dirmain)) {
    mkdirSync(dirmain)
  }
  if (typeof global.configModule[this.config.name] == 'undefined') {
    global.configModule[this.config.name] = {}
  }
  if (typeof global.configModule[this.config.name].fishData == 'undefined') {
    global.configModule[this.config.name].fishData = []
  }
  if (typeof global.configModule[this.config.name].rodData == 'undefined') {
    global.configModule[this.config.name].rodData = []
  }
  global.configModule[this.config.name].dirData = dirmain || null
  if (global.configModule[this.config.name].fishData.length == 0) {
    const fishData = JSON.parse(
      readFileSync(await global.utils.assets.data('FISHDATA'))
    )
    for (const singleData of fishData)
      await global.configModule[this.config.name].fishData.push(singleData)
  }
  if (global.configModule[this.config.name].rodData.length == 0) {
    const rodData = JSON.parse(
      readFileSync(await global.utils.assets.data('RODDATA'))
    )
    for (const singleData of rodData)
      await global.configModule[this.config.name].rodData.push(singleData)
  }
  return
}
module.exports.makeEmptySlot = function () {
  var fishingSlot = []
  for (i = 0; i < 9; i++) {
    fishingSlot.push({
      name: 'Empty',
      size: 0,
      price: 0,
    })
  }
  return fishingSlot
}
module.exports.getRarity = function () {
  return this.getRarityRecursion(
    Math.floor(Math.random() * Math.floor(100)),
    -1,
    0
  )
}
module.exports.getFish = function (fishRarity, currentHour) {
  return global.configModule[this.config.name].fishData.filter(
    (fish) =>
      fish.time.includes(currentHour) && fish.rarity.includes(fishRarity)
  )
}
module.exports.addToInventory = (dataUser, critter) => {
  try {
    if (
      dataUser.inventory[dataUser.inventory.length - 1].price != 0 ||
      typeof dataUser.inventory[dataUser.inventory.length - 1].price ==
        'undefined'
    ) {
      throw '[ Fishing ] Your bag does not have enough storage space'
    } else {
      for (i = 0; i < dataUser.inventory.length; i++) {
        if (dataUser.inventory[i].price == 0) {
          dataUser.inventory[i] = critter
          i = dataUser.inventory.length
        }
      }
    }
    return [null, dataUser.inventory]
  } catch (error) {
    return [error, null]
  }
}
module.exports.getRarityRecursion = function (chance, index, number) {
  const rarityList = ['Very Common', 'Common', 'Uncommon', 'Rare', 'Very Rare']
  if (index === 0 && chance <= catchChance[rarityList[0]]) {
    return rarityList[0]
  } else {
    if (
      index >= rarityList.length - 1 &&
      chance >= catchChance[rarityList[rarityList.length - 1]]
    ) {
      return rarityList[rarityList.length - 1]
    } else {
      if (
        chance > number &&
        chance <= number + catchChance[rarityList[index + 1]]
      ) {
        return rarityList[index + 1]
      } else {
        return this.getRarityRecursion(
          chance,
          index + 1,
          number + catchChance[rarityList[index + 1]]
        )
      }
    }
  }
}
module.exports.handleReply = async function ({
  event,
  api,
  Currencies,
  handleReply,
}) {
  if (String(event.senderID) !== String(handleReply.author)) {
    return
  }
  const { readFileSync, writeFileSync } = global.nodemodule['fs-extra']
  const { increaseMoney, decreaseMoney } = Currencies
  const { body, threadID, messageID, senderID } = event
  const { type, dirUser } = handleReply
  switch (type) {
    case 'menushop': {
      if (isNaN(body)) {
        return api.sendMessage(
          '[ Fishing Shop ] Your choice is not a number!',
          threadID,
          messageID
        )
      }
      if (body > 4 || body < 1) {
        return api.sendMessage(
          '[ Fishing Shop ] Your selection does not exist!',
          threadID,
          messageID
        )
      }
      switch (body) {
        case '1': {
          var listItems = [],
            i = 1
          for (const item of global.configModule[this.config.name].rodData)
            listItems.push(
              `❯ ${i++}/ ${item.name}: ${item.cost}$ - Durability: ${
                item.durability
              }, timeout: ${item.cooldown} seconds(s)`
            )
          return api.sendMessage(
            `「 Fishing Buy 」\nPlease reply to this message the number of your choice\n\n${listItems.join(
              '\n'
            )}`,
            event.threadID,
            (error, info) => {
              client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: 'buymenu',
                dirUser,
              })
            },
            event.messageID
          )
        }
        case '2': {
          return api.sendMessage(
            "\u300C Fishing Buy \u300D\nPlease reply to this message the number of your choice\n\n\u276F 1/ Sell all.\n\u276F 2/ Sell 'Rare' fish.\n\u276F 3/ Sell ​​'Common' fish\n\u276F 4/ Sell 'Uncommon' fish\n\u276F 5/ Sell 'Very common' fish\n\u276F 6/ Sell 'Very Rare' fish",
            threadID,
            (error, info) => {
              client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: senderID,
                type: 'sellmenu',
                dirUser,
              })
            },
            messageID
          )
        }
        case '3': {
          return api.sendMessage(
            '\u300C Fishing Upgrade \u300D\nPlease reply to this message the number of your choice\n\n\u276F 1/ Upgrade inventory - Upgrade your inventory\n\u276F 2/ Fix fishing rod - Repair your fishing rod',
            threadID,
            (error, info) => {
              client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: 'upgrademenu',
                dirUser,
              })
            },
            messageID
          )
        }
      }
    }
    case 'buymenu': {
      try {
        if (isNaN(body)) {
          return api.sendMessage(
            '[ Fishing Buy ] Your choice is not a number!',
            threadID,
            messageID
          )
        }
        const dataItems = global.configModule[this.config.name].rodData
        if (body > dataItems.length || body < 1) {
          return api.sendMessage(
            '[ Fishing Buy ] Your selection does not exist!',
            threadID,
            messageID
          )
        }
        var dataUser = JSON.parse(readFileSync(dirUser, 'utf-8'))
        let userMoney = (await Currencies.getData(senderID)).money
        const itemUserChoose = dataItems[parseInt(body) - 1]
        if (userMoney < itemUserChoose.cost) {
          return api.sendMessage(
            `[ Fishing Buy ] You don't have enough money to be able to buy the fishing rod you chose, you are short about ${
              itemUserChoose.cost - userMoney
            }$`,
            threadID,
            messageID
          )
        }
        dataUser.fishingrod.rodType = itemUserChoose.rodType
        dataUser.fishingrod.rodName = itemUserChoose.name
        dataUser.fishingrod.cooldownTime = itemUserChoose.cooldown
        dataUser.fishingrod.durability = dataUser.fishingrod.durabilityDefault =
          itemUserChoose.durability
        dataUser.fishingrod.moneyFix = Math.floor(
          Math.random() *
            (itemUserChoose.moneyFix[1] - itemUserChoose.moneyFix[0] + 1) +
            itemUserChoose.moneyFix[0]
        )
        dataUser.fishingrod.rateBroken = itemUserChoose.rateBroken
        await decreaseMoney(senderID, itemUserChoose.cost)
        writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), 'utf-8')
        return api.sendMessage(
          `[ Fishing Buy ] You have successfully purchased "${itemUserChoose.name}" for ${itemUserChoose.cost}$`,
          threadID,
          messageID
        )
      } catch (error) {
        console.log(error)
        return api.sendMessage(
          '[ Fishing Buy ] An unexpected error occurred while you were trading!',
          threadID,
          messageID
        )
      }
    }
    case 'sellmenu': {
      if (isNaN(body)) {
        return api.sendMessage(
          '[ Fishing Sell ] Your selection is not a number!',
          threadID,
          messageID
        )
      }
      if (body > 6 || body < 1) {
        return api.sendMessage(
          '[ Fishing Sell ] Your selection does not exist!',
          threadID,
          messageID
        )
      }
      switch (body) {
        case '1': {
          try {
            var dataUser = JSON.parse(readFileSync(dirUser, 'utf-8')),
              index = 0,
              totalAll = 0
            for (item of dataUser.inventory) {
              totalAll += item.price
              dataUser.inventory[index++] = {
                name: 'Empty',
                size: 0,
                price: 0,
              }
            }
            await increaseMoney(senderID, totalAll)
            writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), 'utf-8')
            return api.sendMessage(
              `[ Fishing Sell ] You have successfully sold all the fish in your bag and earned ${totalAll}$`,
              threadID,
              messageID
            )
          } catch (error) {
            console.log(error)
            return api.sendMessage(
              '[ Fishing Sell ] An unexpected error occurred while you were trading!',
              threadID,
              messageID
            )
          }
        }
        case '2': {
          return api.sendMessage('WIP', threadID, messageID)
        }
        case '3': {
          return api.sendMessage('WIP', threadID, messageID)
        }
        case '4': {
          return api.sendMessage('WIP', threadID, messageID)
        }
        case '5': {
          return api.sendMessage('WIP', threadID, messageID)
        }
        case '6': {
          return api.sendMessage('WIP', threadID, messageID)
        }
      }
    }
    case 'upgrademenu': {
      if (isNaN(body)) {
        return api.sendMessage(
          '[ Fishing Sell ] Your selection is not a number!',
          threadID,
          messageID
        )
      }
      if (body > 2 || body < 1) {
        return api.sendMessage(
          '[ Fishing Sell ] Your selection does not exist!',
          threadID,
          messageID
        )
      }
      switch (body) {
        case '1': {
          const dataUser = JSON.parse(readFileSync(dirUser, 'utf-8'))
          return api.sendMessage(
            `[ Fishing Upgrage ] You currently have ${
              dataUser.inventory.length + 1
            } storage locations\nTo buy more storage locations, please reply to this message the number of slots you want to buy!`,
            threadID,
            (error, info) => {
              client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: senderID,
                type: 'upgradestorage',
                dirUser,
              })
            },
            messageID
          )
        }
        case '2': {
          try {
            var dataUser = JSON.parse(readFileSync(dirUser, 'utf-8'))
            let userMoney = (await Currencies.getData(event.senderID)).money
            if (
              dataUser.fishingrod.durability >
              dataUser.fishingrod.durabilityDefault / 2
            ) {
              return api.sendMessage(
                '[ Fishing Upgrade ] Your fishing rod is currently not in need of repair',
                threadID,
                messageID
              )
            }
            if (userMoney < dataUser.fishingrod.moneyFix) {
              return api.sendMessage(
                `[ Fishing Upgrade ] You don't have enough money to repair your fishing rod, you are missing about ${
                  moneyOfUpgrade - userMoney
                }$`,
                threadID,
                messageID
              )
            }
            dataUser.fishingrod.durability =
              dataUser.fishingrod.durabilityDefault
            await decreaseMoney(senderID, dataUser.fishingrod.moneyFix)
            writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), 'utf-8')
            return api.sendMessage(
              `[ Fishing Upgrade ] You have successfully repaired your fishing rod for ${dataUser.fishingrod.moneyFix}$`,
              threadID,
              messageID
            )
          } catch (error) {
            console.log(error)
            return api.sendMessage(
              '[ Fishing Upgrade ] An unexpected error occurred while you were trading!',
              threadID,
              messageID
            )
          }
        }
      }
    }
    case 'upgradestorage': {
      try {
        if (isNaN(body)) {
          return api.sendMessage(
            '[ Fishing Upgrade ] Your choice is not a number!',
            threadID,
            messageID
          )
        }
        if (body < 0) {
          return api.sendMessage(
            '[ Fishing Upgrade ] Your choice is not a negative number!',
            threadID,
            messageID
          )
        }
        var dataUser = JSON.parse(readFileSync(dirUser, 'utf-8'))
        let userMoney = (await Currencies.getData(senderID)).money
        const moneyOfUpgrade = parseInt(body) * 2000
        if (userMoney < moneyOfUpgrade) {
          return api.sendMessage(
            `[ Fishing Upgrade ] You don't have enough money to buy more storage space, you are missing about ${
              moneyOfUpgrade - userMoney
            }$`,
            threadID,
            messageID
          )
        }
        for (var i = 0; i < parseInt(body) - 1; i++) {
          dataUser.inventory.push({
            name: 'Empty',
            size: 0,
            price: 0,
          })
        }
        await decreaseMoney(senderID, moneyOfUpgrade)
        writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), 'utf-8')
        return api.sendMessage(
          `[ Fishing Upgrade ] You have successfully purchased ${body} location for ${moneyOfUpgrade}$!`,
          threadID,
          messageID
        )
      } catch (error) {
        console.log(error)
        return api.sendMessage(
          '[ Fishing Upgrade ] An unexpected error occurred while you were trading!',
          threadID,
          messageID
        )
      }
    }
  }
}
module.exports.run = async function ({ event, api, args }) {
  const { readFileSync, writeFileSync, existsSync } =
    global.nodemodule['fs-extra']
  const { join } = global.nodemodule.path
  const moment = global.nodemodule['moment-timezone']
  const { threadID, messageID, senderID } = event
  const dirUser = join(
    global.configModule[this.config.name].dirData,
    `${senderID}.json`
  )
  switch ((args[0] || '').toLowerCase()) {
    case 'register':
    case '-r': {
      try {
        if (existsSync(dirUser)) {
          return api.sendMessage(
            '[ Fishing ] You have registered to fish in this area!',
            threadID,
            messageID
          )
        }
        var newData = {
          fishingrod: {
            rodType: 0,
            enchantRod: {},
          },
          inventory: this.makeEmptySlot(),
          totalCatch:
            (newData.totalMoney = newData.point = newData.lastTimeFishing = 0),
        }
        writeFileSync(dirUser, JSON.stringify(newData, null, 4), 'utf-8')
        return api.sendMessage(
          '[ Fishing Register ] You have successfully registered for fishing!',
          threadID,
          messageID
        )
      } catch {
        return api.sendMessage(
          '[ Fishing Register ] An unexpected error has occurred!',
          threadID,
          messageID
        )
      }
    }
    case 'shop': {
      if (!existsSync(dirUser)) {
        return api.sendMessage(
          '[ Fishing Shop ] You have not registered to fish to be able to use the purchase function!',
          threadID,
          messageID
        )
      }
      return api.sendMessage(
        '\u200F\u200F\u200E\u300C Fishing Shop \u300D\nPlease reply to this message the number you choose\n\n\u276F 1/ Buy - Buy items.\n\u276F 2/ Sell - Sell items catch.\n\u276F 3/ Upgrade - Upgrade items.\n\u276F 4/ Enchant - Enchant items.',
        threadID,
        (error, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: 'menushop',
            dirUser,
          })
        },
        messageID
      )
    }
    case 'inventory':
    case 'inv': {
      if (!existsSync(dirUser)) {
        return api.sendMessage(
          '[ Fishing ] You have not registered fishing to be able to use the purchase function!',
          threadID,
          messageID
        )
      }
      return api.sendMessage(
        '\u300C Fishing Shop \u300D\nPlease reply to this message the number you choose\n\n\u276F 1/ View fishing rod parameters\n\u276F 2/ View inventory',
        threadID,
        (error, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: 'inventorymenu',
            dirUser,
          })
        },
        messageID
      )
    }
    default: {
      try {
        if (!existsSync(dirUser)) {
          return api.sendMessage(
            `[ Fishing ] You have not registered to fish in this area! Please register by clicking "/fishing register" to register for fishing`,
            threadID,
            messageID
          )
        }
        var dataUser = JSON.parse(readFileSync(dirUser, 'utf-8'))
        const dateNow = moment().tz('Asia/Ho_Chi_minh')
        const format = new Intl.NumberFormat()
        if (dataUser.fishingrod.rodType == 0) {
          return api.sendMessage(
            '[ Fishing ] You dont have a fishing rod at the moment, buy a new fishing rod and try again!',
            threadID,
            messageID
          )
        }
        if (dataUser.fishingrod.durability <= 0) {
          return api.sendMessage(
            '[ Fishing ] Your fishing rod has been broken before, please repair or buy a new one to continue fishing',
            threadID,
            messageID
          )
        }
        if (
          Math.floor(
            dataUser.fishingrod.cooldownTime -
              (dateNow.unix() - dataUser.lastTimeFishing)
          ) > 0
        ) {
          return api.sendMessage(
            '[ Fishing ] You are currently waiting, please wait a bit and then try again',
            threadID,
            messageID
          )
        }
        const fishRarity = this.getRarity()
        const currentHour = dateNow.hours()
        const fishData = await this.getFish(fishRarity, currentHour)
        if (!fishData) {
          return api.sendMessage(
            '[ Fishing ] Currently in the lake there are no fish to fish',
            threadID,
            messageID
          )
        }
        var caught =
          fishData[
            Math.floor(Math.random() * (fishData.length - 1 - 0 + 1)) + 0
          ]
        caught.size =
          typeof caught.size != 'array'
            ? caught.size
            : (
                Math.random() * (caught.size[1] - caught.size[0]) +
                caught.size[0]
              ).toFixed(1)
        dataUser.fishingrod.durability =
          dataUser.fishingrod.durability -
          Math.floor(
            Math.random() *
              (dataUser.fishingrod.rateBroken[1] -
                dataUser.fishingrod.rateBroken[0] +
                1) +
              dataUser.fishingrod.rateBroken[0]
          )
        dataUser.lastTimeFishing = dateNow.unix()
        dataUser.totalCatch += 1
        dataUser.point += caught.price
        const [error, inventory] = this.addToInventory(dataUser, caught)
        if (error) {
          return api.sendMessage(error, threadID, messageID)
        }
        dataUser.inventory = inventory
        writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), 'utf-8')
        return api.sendMessage(
          `=== You caught one: ${caught.name} ===\n\n❯ Size: ${
            caught.size
          } cm\n❯ Rarity: ${
            caught.rarity
          }\n❯ Earned Amount: ${format.format(caught.price)}$`,
          threadID,
          messageID
        )
      } catch (error) {
        console.log(error)
        return api.sendMessage(
          "[ Fishing ] An unexpected error occurred\n'To forgot to clean the tank so all the fish died now' - CatalizCS",
          threadID,
          messageID
        )
      }
    }
  }
}
