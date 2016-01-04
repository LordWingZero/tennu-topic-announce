var mocha = require('mocha');
var should = require('should');

var config = {}

var mockClient = {
    config: function(value) {
        return config[value];
    },
    _logger: {}
};

// This is a sample message emitted by tennu when topic is emitted.
var IRCTopicMessage = {
    command: 'topic',
    hostmask: {
        nickname: 'TestUser',
        username: 'sid000000',
        hostname: 'TestUser.Test.Test'
    },
    nickname: 'TestUser',
    channel: '#testchannel',
    topic: 'Some new topic.'
}

// Should warn when config missing
describe('topic-announce', function() {

    describe('configuration', function() {

        describe('bad configuration', function() {

            config = {};

            mockClient._logger.warn = function(warning) {
                warning.should.equal('tennu-topic-announce: is missing some or all of its configuration');
            };

            it('Should log a warning about the config using client.warning', function() {
                var plugin = require('../plugin').init(mockClient);
            });

        });

        describe('good configuration', function() {

            config = {
                "topic-announce": {
                    "message": "To see previous tells, visit our website at example.com"
                }
            };

            mockClient._logger.warn = function(warning) {
                should.fail();
            };
            
            it('Should load the configurations response when properly set', function() {
                
                var plugin = require('../plugin').init(mockClient);
                
                plugin.handlers.topic(IRCTopicMessage).should.deepEqual({
                    "message": "To see previous tells, visit our website at example.com"
                });

            });

        });

    });

});