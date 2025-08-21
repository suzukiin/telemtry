const Mqtt = require('../classes/Mqtt');

const mqtt = new Mqtt();

exports.config = () => {
    mqtt.config();
}

exports.publish = (topic, data) => {
    mqtt.publish(topic, data);
}

