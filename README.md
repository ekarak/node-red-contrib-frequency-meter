node-red-contrib-frequency-meter
================================

A simple NR node that counts the frequency of messages flowing through a 
graph. Just attach its INPUT to a flow and you'll be getting frequency 
of messages in Hz on its OUTPUT connector, formatted as:

msg: {topic: "frequency", payload: "3.2221111"}

You'll also get a nice status indication with the measured frequency 
(in Hz, rounded to 3 decimals) directly in the NodeRed interface, but 
*you'll have to enable the display of node statuses first.*

Just beware that these frequency messages are generated at *preset 
intervals* and their generation is **not necessarily triggered by arriving messages**.

Therefore:

**You must not wire this node inline with your flows,** as its not
going to convey the incoming message to the output connector. Keep it 
as a peripheral - terminal node instead.

The measured frequency is also kept in NodeRed's global context eg 
for use with function blocks. You can access its current value with:
`context.global.frequencies[<node name>]` so you need to name your nodes!
or, if you're going to use it from within another node, use:
`RED.settings.functionGlobalContext.frequencies[<node name>]`

**Disclaimer:** Do not use this software to control nuclear reactors! (and ice-cream makers too!)

Here's a demo flow:
`[{"id":"88c4bf00.773b4","type":"debug","name":"","active":true,"console":false,"complete":false,"x":637,"y":244,"z":"4574009.fba8c","wires":[]}]`

This node is based on https://github.com/pgte/frequency-meter - Huge respect to Pedro Teixeira.
