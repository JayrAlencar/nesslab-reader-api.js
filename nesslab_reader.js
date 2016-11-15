var events = require('events');
var net = require('net');

nesslab_reader = function(){
	var self = this;
	this.socket.on('connect', function(res){
		self.emit('connect',"The reader is connected");
	});
	this.socket.on('data', function(data){
		var dataStr = data.toString();
		var type = dataStr.substring(0,2);
		console.log(dataStr);

		switch(type){
			case '>p':
				self.emit('power',parseInt(dataStr.substring(2)));
				break;
			case '>e':
				self.emit('antennaState', parseInt(dataStr.substring(2)));
				break;
		}
	})
}

nesslab_reader.prototype = new events.EventEmitter;

nesslab_reader.prototype.socket = net.Socket();

// Node version
nesslab_reader.prototype.nodeVersion = process.versions.node;

// socket client
// nesslab_reader.prototype.socket = new net.Socket();

// default IP Adderess
nesslab_reader.prototype.ip = '192.168.0.100';

// default tcp port
nesslab_reader.prototype.port = 5578;

//Methods
nesslab_reader.prototype.connect = function(ip, port, callback){
	if(typeof ip == 'function'){
		callback = ip;
		ip = this.ip;
	}
	if(typeof port == 'function'){
		callback = port;
		port = this.port;
	}

	ip = ip || this.ip;
	port = port || this.port;
	this.socket.connect(port, ip);
}

nesslab_reader.prototype.init = function(){
	this.socket.write(new Buffer([62,102,13,10]));
}

nesslab_reader.prototype.stop = function(){
	this.socket.write(new Buffer([62,51,13,10]));
}

nesslab_reader.prototype.enableAntenna = function(antennaport){
	
}

nesslab_reader.prototype.disableAntenna = function(antennaport){
	
}

nesslab_reader.prototype.setPowerAntenna = function(antennaport, power){
	
}

nesslab_reader.prototype.getAntennaState = function(callback){
	this.socket.write(new Buffer([62,121,32,101,13,10]));
	this.on('antennaState', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getPower = function(callback){
	this.socket.write(new Buffer([62,121,32,112,13,10]));
	this.on('power', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.reconnect = function(){
	
}

nesslab_reader.prototype.disconnect = function(){
	
}

nesslab_reader.prototype.close = function(){
	
}



// util.inherits(nesslab_reader, EventEmitter);
module.exports = new nesslab_reader();
