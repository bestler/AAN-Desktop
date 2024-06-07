const mqtt = require('mqtt');

class MqttClient {
    constructor() {
        
        if (!MqttClient.instance) {
            this.options = {
                clientId: 'aan_1',
                username: 'test1', 
                password: 'Test1234'   
            };
            this.client = mqtt.connect('mqtts://7955f2f063314e55a5172f3cac701e53.s1.eu.hivemq.cloud:8883', this.options); 

            MqttClient.instance = this;
        }

        return MqttClient.instance;
    }

    connect() {
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            //TODO: Fix hard coded topic
            this.publish('70419_1', '10')
        });

        this.client.on('message', (topic, message) => {
            console.log(`Received message on topic: ${topic}, message: ${message.toString()}`);
        });
    }

    publish(topic, message) {
        this.client.publish(topic, message, { qos: 1 });
        console.log(`Published message on topic: ${topic}, message: ${message}`);
    }

    subscribe(topic) {
        this.client.subscribe(topic);
    }

    unsubscribe(topic) {
        this.client.unsubscribe(topic);
    }

    disconnect() {
        this.client.end();
        console.log('Disconnected from MQTT broker');
    }
}

module.exports = MqttClient;