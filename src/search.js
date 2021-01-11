const algorithmia = require("algorithmia")

async function bot(text) {
    try {
        let search = ''
        await researchingApi(text)

        async function researchingApi(text) {
            let data = {
                "articleName": `${text}`,
                "lang": "en"
            }
            const authentication = algorithmia('PUT YOUR KEY HERE')
            const algorithm = authentication.algo('web/WikipediaParser/0.1.2')
            const searchready = await algorithm.pipe(data)
            const getsearch = searchready.get()
            search = getsearch.content
        }

        function cleartext(search) {
            const clearsearch = clearParentheses(clearMarsks(search))

            function clearMarsks(text) {
                const lines = text.split('\n')
                const cleansearch = lines.filter((line) => {
                        if (line.trim().length === 0 || line.trim().startsWith('=')) {
                        return false
                    }
                    return true
                })
                return cleansearch.join(' ')
            }

            function clearParentheses(text) {
                let textend = text
                return textend.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
            }
            return  clearsearch
        }
        let end = cleartext(search)
        return end
    } catch (e) {
        return 'error'
    }
}

async function search(client, message, text) {
    let search = await bot(text)
    if (search === 'error') {
        client.sendText(message.from, `I didn't find anything about ${text}`)
        return
    }
    let final = search.substr(0, 4500).toString()
    client.sendText(message.from, `research about ${text}:\n\n${final}.`)
    return
}

module.exports = search
