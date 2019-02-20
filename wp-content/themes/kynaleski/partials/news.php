
<section id="news" class="block toggle off">
  <div class="container" id="llContainer">

    <?php

    $llNewsOn = true;

    if($llNewsOn){

    }else{

      $news = get_posts(array(
        'numberposts' => 20,
        'post_type'   => 'news'     
      ));
      if( $news ): 
        $count = 1;
        foreach( $news as $post ): 
          setup_postdata( $post );

          $news_slug = $post->post_name; 
          $news_name = get_the_title();
          $news_date = get_the_date();
          $news_image = get_the_post_thumbnail();
          $news_content = get_the_content(); ?>

          <div class="row mb4 news-item" id="news-<?php echo $count; ?>">
            <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 col-xs-10 col-xs-offset-1">
              <?php if(get_field('optional_link')):?>
                <a href="<?php the_field('optional_link');?>" class="news-item-link" target="_blank">
                <?php endif; ?>
                <div class="news-item-inner">
                  <h6 class="m0">
                   <?php echo $news_date; ?>
                 </h6>
                 <h1 class="news-item-title outlined no-hover m0">
                  <span>
                    <?php echo $news_name; ?> 
                  </span>
                </h1>
                <?php if(get_field('optional_link')):?>
                  <h4 class="news-item-read-more mt0 mb1">
                    <span class="read-more-container">Read More
                      <span class="icon ml1" data-icon="·"></span>
                    </span>
                  </h4>
                <?php endif; ?>
                <?php 
                if ( has_post_thumbnail() ) : ?>
                <div class="news-item-image">
                  <?php the_post_thumbnail('news'); ?>
                </div>
              <?php endif; ?>
              <div class="news-item-content">
                <?php the_content(); ?>
              </div>
              <hr class="mt2" />
            </div>
            <?php if(get_field('optional_link')):?>
            </a>
          <?php endif; ?>                      
        </div>
      </div>
      <?php $count++; endforeach; ?>
      <?php wp_reset_postdata(); ?>
    <?php endif; ?>   
  </div>
</div>

<?php } ?> 

</div>      
</section>