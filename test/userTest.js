const ProxerMe = require('../src')

const testData = require('./test')

const client = ProxerMe.connect(testData.apiKey)
const constants = ProxerMe.getConstants()


client.login(testData.username, testData.password).then((userClient) => {
    console.log(userClient.id)
    console.log(userClient.avatar)

    setTimeout(() => { 
        userClient.logout().then(() => { 
            console.log("success")
        }).catch((err) => {
            console.log("fail")
            console.log(err)
        }) 
    }, 5432)
})
