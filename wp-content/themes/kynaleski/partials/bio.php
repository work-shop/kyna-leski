
      <section id="bio" class="block toggle off">
        <div class="container">
          <div class="row mb2">
            <div class="col-sm-12 col-md-10 col-md-offset-1">         
              <h1 class=" no-hover centered mb1 mt0">
                <?php the_field('bio_heading_1','option'); ?>
              </h1>
            </div>
            <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <div class="wisywig bio-content" id="bio-body">
                <?php the_field('bio_body','option'); ?>
              </div>
            </div>
            <div class="col-sm-12 col-md-10 col-md-offset-1">         
              <h1 class=" no-hover centered mb1 mt0">
                <?php the_field('bio_footer','option'); ?>
              </h1>
            </div>            
          </div>
        </div>  
        <div id="iframes"></div>    
      </section>
