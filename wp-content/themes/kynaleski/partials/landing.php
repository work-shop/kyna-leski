
      <section id="landing" class="block toggle on">
        <div class="container">
          <div class="row mb2">
            <div class="col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">    
              <div class="video-container">     
                <video id="landing-clip" autoplay loop poster="<?php the_field('landing_video_poster_image','option');?>">
                  <source src="<?php the_field('landing_video','option'); ?>" type="video/mp4">
                </video>
                <div class="play-button visible-android" id="play-button">
                  <span class="icon" data-icon="Ò"></span>
                </div>
                <p class="righted small">
                   <?php the_field('landing_video_caption','option'); ?>
                </p>
              </div>
            </div>
          </div>
        </div>      
      </section>