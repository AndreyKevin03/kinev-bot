const venom = require('venom-bot')
const search = require('./search')

venom.create().then((client) => start(client))

function start(client) {
    client.onMessage((message) => {
        if (message.isMedia === false) {
            if (message.body[0] === '/') {
                function checkCommand(text) {
                    let checking = []
                    for (let i = 0; i < message.body.length; i++) {
                        if (message.body[i] === ' ') {
                            break
                        }
                        checking[i] = message.body[i]
                    }
                    return checking.join('')
                }
                function checkParameter(text) {
                    return message.body.replace(`${text} `, '')
                }
                let command = checkCommand(message.body).trim().replace(/\s{2,}/g, ' ')
                let parameter = checkParameter(command)
                if (command === '/search') {
                    if (message.body.length === 7 || message.body.length === 8) {
                        client.reply(message.from, "you need to add keywords as the command parameter for the robot to search.\nexample:\n/search television", message.id.toString())
                        return
                    }
                    client.reply(message.from, `researching about ${parameter}`, message.id.toString())
                    let research = search(client, message, parameter)
                    return
                }
                return
            }
        }
    })
}
