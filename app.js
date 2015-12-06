
var NP_TOKEN						= 'kl7ZgitLA94xvPOub5Z7P8ME';
var BOT_TOKEN						= 'xoxb-15587865602-ze1cuLjNyWxcEJcvZF1hjWWb';
var ADMIN_TOKEN                     = 'xoxp-4351127952-4351127954-16016732114-18a0255dcf';
var express = require('express');
var bodyParser = require('body-parser');
var Slack = require('slack-client');

var autoMark, autoReconnect, slack;

autoReconnect = true;

autoMark = true;

slack = new Slack(BOT_TOKEN, autoReconnect, autoMark);
admin = new Slack(ADMIN_TOKEN, autoReconnect, autoMark);

slack.on('open', function() {
  var channel, channels, group, groups, id, messages, unreads;
  channels = [];
  groups = [];
  unreads = slack.getUnreadCount();
  channels = (function() {
    var _ref, _results;
    _ref = slack.channels;
    _results = [];
    for (id in _ref) {
      channel = _ref[id];
      if (channel.is_member) {
        _results.push("#" + channel.name);
      }
    }
    return _results;
  })();
  groups = (function() {
    var _ref, _results;
    _ref = slack.groups;
    _results = [];
    for (id in _ref) {
      group = _ref[id];
      if (group.is_open && !group.is_archived) {
        _results.push(group.name);
      }
    }
    return _results;
  })();
  console.log("Welcome to Slack. You are @" + slack.self.name + " of " + slack.team.name);
  console.log('You are in ' + channels.length + ' channels.');
  console.log('You are in ' + channels.join(', '));
  console.log('As well as ' + groups.join(', '));
  messages = unreads === 1 ? 'message' : 'messages';
  return console.log("You have " + unreads + " unread " + messages);
});

slack.on('message', function (message) {
    var channel, channelError, channelName, errors, response, text, textError, ts, type, typeError, user, userName;
    channel = slack.getChannelGroupOrDMByID(message.channel);
    user = slack.getUserByID(message.user);
    response = '';
    type = message.type, ts = message.ts, text = message.text;
    channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
    channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
    userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";
    console.log("Received: " + type + " " + channelName + " " + userName + " " + ts + " \"" + text + "\"");
    if (type === 'message' && (text != null) && (channel != null)) {
        if (text == 'time to go bot.') {
    		response = message.channel;
            response += ' But ' + user.name + ' why???';
    		slack.createGroup('test-group');
    		//	testGroup
    		channel.send(response);
    		//channel.leave();
    		//return console.log('@' + slack.self.name + ' left channel: ' + channel.name);
    	}
        else {
            response = text.split('').reverse().join('');
            response += '-what';
            channel.send(response);
        }
		return console.log("@" + slack.self.name + " responded with \"" + response + "\"");
    }
    else {
        typeError = type !== 'message' ? "unexpected type " + type + "." : null;
        textError = text == null ? 'text was undefined.' : null;
        channelError = channel == null ? 'channel was undefined.' : null;
        errors = [typeError, textError, channelError].filter(function(element) {return element !== null;}).join(' ');
        return console.log("@" + slack.self.name + " could not respond. " + errors);
    }
} );

slack.on('error', function(error) {
  return console.error("Error: " + error);
});

slack.login();



admin.on('open', function() {
  var channel, channels, group, groups, id, messages, unreads;
  channels = [];
  groups = [];
  unreads = admin.getUnreadCount();
  channels = (function() {
    var _ref, _results;
    _ref = admin.channels;
    _results = [];
    for (id in _ref) {
      channel = _ref[id];
      if (channel.is_member) {
        _results.push("#" + channel.name);
      }
    }
    return _results;
  })();
  groups = (function() {
    var _ref, _results;
    _ref = admin.groups;
    _results = [];
    for (id in _ref) {
      group = _ref[id];
      if (group.is_open && !group.is_archived) {
        _results.push(group.name);
      }
    }
    return _results;
  })();
  console.log("Welcome to Slack. You are @" + slack.self.name + " of " + admin.team.name);
  console.log('You are in ' + channels.length + ' channels.');
  console.log('You are in ' + channels.join(', '));
  console.log('As well as ' + groups.join(', '));
  messages = unreads === 1 ? 'message' : 'messages';
  return console.log("You have " + unreads + " unread " + messages);
});

admin.on('message', function (message) {
    var channel, channelError, channelName, errors, response, text, textError, ts, type, typeError, user, userName;
    channel = slack.getChannelGroupOrDMByID(message.channel);
    user = slack.getUserByID(message.user);
    response = '';
    type = message.type, ts = message.ts, text = message.text;
    channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
    channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
    userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";
    console.log("Received: " + type + " " + channelName + " " + userName + " " + ts + " \"" + text + "\"");
    if (type === 'message' && (text != null) && (channel != null)) {
        if (text == 'time to go bot.') {
    		response = message.channel;
            response += ' But ' + user.name + ' why???';
    		admin.createGroup('test-group');
    		//	testGroup
    		channel.send(response);
    		//channel.leave();
    		//return console.log('@' + slack.self.name + ' left channel: ' + channel.name);
    	}
        else {
            response = text.split('').reverse().join('');
            response += '-what';
            channel.send(response);
        }
		return console.log("@" + admin.self.name + " responded with \"" + response + "\"");
    }
    else {
        typeError = type !== 'message' ? "unexpected type " + type + "." : null;
        textError = text == null ? 'text was undefined.' : null;
        channelError = channel == null ? 'channel was undefined.' : null;
        errors = [typeError, textError, channelError].filter(function(element) {return element !== null;}).join(' ');
        return console.log("@" + slack.self.name + " could not respond. " + errors);
    }
} );

admin.on('error', function(error) {
  return console.error("Error: " + error);
});

admin.login();
var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response) {response.status(200).send('Hello World!'); });

app.listen(port, function() {
	console.log('Listening on port ' + port);
});

app.post('/goodbye', function(request, response, next) {
	var username = request.body.user_name;
	var channel = request.body.channel_name;
	var token = request.body.token;

	if (token == NP_TOKEN) {
		var botPayload = {
			text: 'Hello ' + username + ', welcome! You\'re in channel: ' + channel + '!',
			channel: '@andrewcrumrine'
		};
	}
	else {
		var botPayload = {
			text: 'Imposter!'
		};
	}

	if (username !== 'slackbot') {
		return response.status(200).json(botPayload);
	} else {
		return response.status(299);
	}
});
