const ProxerMe = require('../src')
const testData = require('./test')

const client = ProxerMe.testMode()
const constants = ProxerMe.getConstants()

client.getForumThreadById(33).then((thread) => {
    const posts = thread.posts
    
    for(let post of posts) {
        post.text
    }    

    console.log(thread.postCount)
    console.log(thread.views)
    console.log(thread.creationTimestamp)
    console.log(thread.latestTimestamp)
    console.log(thread.subject)

    const post = posts[3]
    console.log(post.userId)
    console.log(post.timestamp)
})

// 40307
// 107794
// 161212