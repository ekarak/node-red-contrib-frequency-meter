/*

  A frequency meter for IBM's Node-Red
  https://github.com/ekarak/node-red-contrib-frequency-meter
  (c) 2015, Elias Karakoulakis <elias.karakoulakis@gmail.com>

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  
*/

module.exports = function(RED) {
	
	var FM = require('frequency-meter');
	/**
	* ====== FREQUENCY-METER ================
	* Measures frequency of messages received 
	* in its input connector
	* =======================================
	*/
	function FrequencyMeter(config) {

		RED.nodes.createNode(this, config);
		// prepare the global context to store frequencies
		if (!RED.settings.functionGlobalContext.hasOwnProperty('frequencies')) {
			RED.settings.functionGlobalContext.frequencies = {};
		}
		this.name = config.name;
		RED.settings.functionGlobalContext.frequencies[this.name] = 0;
		this.fm = FM(config.interval);
		var node = this;
		
		// what to do when a frequency measurement is available
		this.fm.on('frequency', function(freq) {
			// send it downstream
			node.send({	topic: 'frequency', payload: freq});
			// store it in the global array
			RED.settings.functionGlobalContext.frequencies[node.name] = freq;
			// update node status
			node.status({fill:"green",shape:"ring",text: freq.toFixed(3)+" Hz"});
		});
		// Yes its true: an incoming message just happened()
		this.on("input", function(msg) {
			this.fm.happened();
		});
		this.on("close", function() {
			this.fm.end();
		});
	}
	//
	RED.nodes.registerType("frequency", FrequencyMeter);
};
