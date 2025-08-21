require('dotenv').config();
const EventEmitter = require('events');
const mqtt = require('mqtt');

class Mqtt extends EventEmitter {
    constructor() {
        super();
        this.host = process.env.MQTT_BROKER_URL;
        this.port = process.env.MQTT_PORT;
        this.protocol = process.env.MQTT_PROTOCOL;
        this.username = process.env.MQTT_USERNAME;
        this.password = process.env.MQTT_PASSWORD;
        this.client = null;
    }

    config(){
        const options = {
            host: this.host,
            port: this.port,
            protocol: this.protocol,
            username: this.username,
            password: this.password
        };

        this.client = mqtt.connect(options);
        console.log("conectado ao broker MQTT");
    }

    publish(topic, data){
        this.client.publish(topic, JSON.stringify(data), (error) => {
            if (error) {
                console.error('Error publishing MQTT message:', error);
            }
        });
    }
}

module.exports = Mqtt;
