/* 
A-Frame Play on Click component
written by Tyson Moll, 2022-02
*/


/* User interaction confirmation for autoplay media */
AFRAME.registerComponent('play-on-click', {
  schema: {
    ignoreAutoplay: {type: 'boolean', default: false}
  },
  
  init: function () {
    this.onClick = this.onClick.bind(this);
    this.played = false;
    
    this.clickBanner = document.getElementById('click-anywhere-banner');
    document.querySelector('a-scene').addEventListener('loaded', this.showClickBanner)
  },
  play: function () {
    window.addEventListener('click', this.onClick);
  },
  pause: function () {
    window.removeEventListener('click', this.onClick);
  },
  
  onClick: function (evt) {
    if (!this.played) {
      
      // Sound
      var sounds = document.querySelectorAll('[sound]');
      sounds.forEach(this.playSound); // Ensuring autoplay sounds play asap
      
      // Video
      var videos = document.getElementsByTagName('video');
      for (var i = 0; i < videos.length; i++) {
        this.playVideoMtl(videos[i])
      }
      
      // Hide click prompt banner (if it exists)
      if (this.clickBanner) {this.clickBanner.style.display = "none";}

      // Don't call again
      this.played = true;
    }
  },

  
  playSound: function(item) {
    if (item.components.sound.attrValue.autoplay == "true" || this.data.ignoreAutoplay) {
      item.components.sound.stopSound()
      item.components.sound.playSound()
    }
  },

  playVideoMtl: function(item) {
    if (item.hasAttribute('autoplay') || this.data.ignoreAutoplay) {
      item.pause();
      item.play();      
    }
  },
  
  showClickBanner: function() {
      // Show click prompt banner (if it exists)
      var clickBanner = document.getElementById('click-anywhere-banner');
      if (clickBanner) {clickBanner.style.display = "block";}
  },

});
