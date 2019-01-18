const PubSub = {
  publish: function (channel, payload) {
    const event = new CustomEvent(channel, {
      detail: payload
    });
    document.dispatchEvent(event);

    console.log(
      `Successfully published on channel: ${channel} with payload: ${payload}`
    );
  },

  subscribe: function (channel, callback) {
    document.addEventListener(channel, callback);

    console.log(
      `Successfully subscribed on channel: ${channel}`
    );
  }
};

module.exports = PubSub;
