
      <section id="book" class="block toggle off">
        <div class="container">      
          <div class="row mb2">
            <div class="col-sm-12 col-md-10 col-md-offset-1">         
              <h1 class="no-hover centered mb1 mt0">
                <?php the_field('books_heading_1','option'); ?>
              </h1>
            </div>          
          </div>
          <div class="row">
            <div class="col-sm-4 col-sm-offset-1 mb1">
              
              <?php
              $image = get_field('books_main_image','option');

              if( !empty($image) ): 

                $title = $image['title'];
                $alt = $image['alt'];
                $caption = $image['caption'];
                $size = 'book';
                $url = $image['sizes'][ $size ];?>

                  <img src="<?php echo $url; ?>" alt="<?php echo $alt; ?>"/>

              <?php endif; ?>

              </div>
              <div class="col-sm-offset-1 col-sm-6 col-md-5 mb2">
                  <?php the_field('books_opening_paragraph','option'); ?>              
              </div>
              <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                <?php the_field('books_body','option'); ?>  
              </div>
            </div>
          </div>          
      </section>