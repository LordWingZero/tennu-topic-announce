const response = 'There is no announcement set for the topic yet!';
var TennuTopicAnnounce = {
    init: function(client) {

        var topicConfig = client.config("topic-announce");

        if (!topicConfig) {
            client._logger.warn("tennu-topic-announce: is missing some or all of its configuration.");
        }

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