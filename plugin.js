const response = 'There is no announcement set for the topic yet!';
var TennuTopicAnnounce = {
    configDefaults: {
        "topic-announce": {
            "message": "huehuehue"
        }
    },
    init: function(client) {

        var topicConfig = client.config("topic-announce");

        return {
            handlers: {
                "topic": function(message) {
                    return topicConfig || response;
                }
            }
        }
    }
};

module.exports = TennuTopicAnnounce;