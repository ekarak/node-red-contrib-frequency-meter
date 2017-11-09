node-red-contrib-frequency-meter
================================

A simple NR node that measures the frequency of messages flowing through 
a graph. Just attach its INPUT to a flow and you'll be getting frequency 
of messages in Hz on its OUTPUT connector, formatted as:

msg: {topic: "frequency", payload: "3.4"}

You'll also get a nice status indication with the measured frequency 
(in Hz, rounded to 3 decimals) directly in the NodeRed interface, but 
*you'll have to enable the display of node statuses first.*

![frequency meter](https://github.com/ekarak/node-red-contrib-frequency-meter/raw/master/freq-measure.png "The simplest way to measure a flow")

Just beware that these frequency messages are generated at *preset 
intervals* and their generation is **not necessarily triggered by arriving messages**.

Also you can set the `msg.reset` property to clear measured frequency.

Therefore:

**You must not wire this node inline with your flows,** as its not
going to convey the incoming message to the output connector. Keep it 
as a peripheral - terminal node instead.

The measured frequency is also kept in NodeRed's global context eg 
for use with function blocks. You can access its current value with:
`context.global.frequencies[<node name>]` so don't forget to give your
nodes some unique names!
If you're going to use it from within another node, use:
`RED.settings.functionGlobalContext.frequencies[<node name>]`

**Disclaimer:** Do not use this software to control nuclear reactors! (and ice-cream makers too!)

Here's a demo flow:
`[{"id":"abe0d1c5.541f3","type":"frequency","name":"freq1","interval":"10000","ntfyinterval":"500","x":403,"y":258,"z":"4574009.fba8c","wires":[[]]},{"id":"1b71fdec.e48e02","type":"inject","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":170,"y":200,"z":"4574009.fba8c","wires":[["abe0d1c5.541f3"]]}]`

This node is based on https://github.com/pgte/frequency-meter - Huge respect to Pedro Teixeira.
