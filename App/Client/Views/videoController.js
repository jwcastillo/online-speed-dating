
import template from './videoTemplate.vue';
import Vue from 'vue'; 
import { mapState } from 'vuex';

var video = {
  template: template.template,
  data: function () {
    return {
      videoOut: '',
      phone: {},
      session: {},
      yourNumber: 0,
      myNumber: 0
    };
  },
  computed: mapState(['videoOut', 'sessionOut', 'username', 'name', 'phone', 'sessionIn']),
  methods: {
    makePhone: function(myNumber) {
      console.log(this.phone);
      this.phone = window.phone = PHONE({
        number: myNumber, // listen on username line else Anonymous
        publish_key: 'pub-c-97dbae08-7b07-4052-b8e0-aa255720ea8a', // Your Pub Key
        subscribe_key: 'sub-c-794b9810-b865-11e6-a856-0619f8945a4f', // Your Sub Key
        ssl: true 
      });
      var sessionConnected = function(session) {
        console.log(session);
        console.log('connected with', session);
        console.log(this);
        console.log(this.video);
        this.videoOut = session.video.outerHTML;
      };
      this.phone.ready(function() {
        console.log('phone ready');
      });
      this.phone.receive(function(session) {
        console.log( 'i receieved');
        this.$store.state.videoIn = session;
        console.log(session);

        // session.message(message);
        // session.thumbnail(thumbnail);
        session.connected(sessionConnected);
        session.ended(function(idk) {
          console.log('sessionn ended', idk);
        });
      });
    },
    dial (number) {
      var session = this.$store.state.phone.dial(number);
      if (!session) { return; }
    },
    initStatePhone () {
      this.$store.commit('initPhone');
    }  
  }
};
// var phone = window.phone;

// // var video_out = PUBNUB.$('video-display');
// // var img_out = PUBNUB.$('video-thumbnail');
// // var img_self = PUBNUB.$('video-self');

// // var phone = window.phone = PHONE({
// //   number: 1, // listen on username line else Anonymous
// //   publish_key: 'pub-c-97dbae08-7b07-4052-b8e0-aa255720ea8a', // Your Pub Key
// //   subscribe_key: 'sub-c-794b9810-b865-11e6-a856-0619f8945a4f', // Your Sub Key
// //   ssl: true
// // });

// function connected(session) {
//   console.log('connected with', session);
//   video.methods.connected(session);
//   // console.log('connected');
//   // video_out.innerHTML = '';
//   // video_out.appendChild(session.video);
//   // console.log(session.number, 'should equal 1');
//   // PUBNUB.$('number').value = '' + 1;
//   // console.log('Hi!');
// }
// var event = new CustomEvent('ready');
// function dial(number) {
//   var session = phone.dial(number);
//   if (!session) { return; }
// }

// phone.ready(function() {
//   // var event = new CustomEvent('ready');
//   console.log('phone ready', event);
//   return event;
// });

// // function thumbnail(session) {
// //   img_out.innerHTML = '';
// //   img_out.appendChild(session.image);
// //   img_out.appendChild(phone.snap().image);
// // }

// function ended(session) {
//   img_out.innerHTML = '';
// }

// phone.receive(function(session) {
//   console.log( 'i receieved');
//   // session.message(message);
//   // session.thumbnail(thumbnail);
//   session.connected(connected);
//   session.ended(ended);
// });

// // function message( session, message ) {
// //   add_chat( session.number, message.text );
// // }

// phone.unable(function(details) {
//   console.log('Alert! - Reload Page.');
//   console.log(details);
// });

// phone.debug(function(details) {
//   // console.log(details);
// });


export default video;

