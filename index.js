const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'jogar.bawmc.net', 
  username: 'BigodeZB',
  version: '1.21.1'
})

bot.on('spawn', () => {
  console.log('--- Bot conectado ao Lobby! ---')
  setTimeout(() => {
    bot.chat('/logar bigode@#3516')
    console.log('Comando de login enviado.')
    
    setTimeout(() => {
      console.log('Usando a bússola para abrir o menu...')
      bot.activateItem() 
    }, 3000)
  }, 3500)
})

bot.on('windowOpen', (window) => {
  console.log('Menu aberto. Procurando a TNT...')
  const itemParaClicar = window.items().find(item => item.name === 'tnt')
  
  if (itemParaClicar) {
    console.log(`Clicando na TNT no slot ${itemParaClicar.slot}`)
    setTimeout(() => {
      bot.clickWindow(itemParaClicar.slot, 0, 0) 
      console.log('Bot entrou no Semi-Anarquia!')
    }, 1500)
  }
})

// COMANDO DE DROP (Ajuste o nick abaixo)
bot.on('chat', (username, message) => {
  // SUBSTITUA abaixo pelo nick da sua conta principal
  if (username === 'SeuNickPrincipal' && message === '!dropar') {
    bot.chat('Dropando itens...')
    const itens = bot.inventory.items()
    if (itens.length === 0) return
    const dropNext = (index) => {
      if (index >= itens.length) return
      bot.tossStack(itens[index], () => {
        setTimeout(() => dropNext(index + 1), 250)
      })
    }
    dropNext(0)
  }
})

bot.on('end', () => {
  console.log('Bot caiu. O Render vai reiniciá-lo automaticamente em breve.')
  process.exit(1) 
})

bot.on('error', (err) => console.log('Erro:', err))
