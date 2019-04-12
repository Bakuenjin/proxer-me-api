'use strict'

class Conference {
    constructor(data) {
        if (data) this.data = data
    }

    get id() { return parseInt(this.data.id) }

    get topic() { return this.data.topic }

    get customTopic() { return this.data.topic_custom }

    get memberAmount() { return this.data.count }

    get isGroup() { return this.data.group }

    get readStatus() { return this.data.read }

    get newMessagesAmount() { return this.data.read_count }

    get lastMessageId() { return this.data.read_mid }

    // get image() { return `` }
    getInfos() {}
}