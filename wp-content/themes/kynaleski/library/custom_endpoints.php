<?php


add_action( 'rest_api_init', 'register_lazy_route' );


function register_lazy_route(){
	 register_rest_route( 'custom', '/lazyloadnews', array(
    'methods' => 'GET',
    'callback' => 'get_lazy_load_news'
    )
   );
}


function get_lazy_load_news( $request ) {

	$page = $request->get_param( 'page' );
	$posts_per_page = 10;

	$args = array(
		'paged' => $page,
		'posts_per_page' => 10,
		'post_type'   => 'news'     
	);

	$news_query = new WP_Query( $args );

	ob_start(); ?>




	<div id="pagination-group-<?php echo $page; ?>" data-pages="<?php echo $news_query->max_num_pages; ?>">

	<?php
	if( $news_query->have_posts() ): 
		
		if($page === '1'){
			$count = 1;
		}else{
			$count = ( ($page - 1) * $posts_per_page + 1);
		}
		
		while( $news_query->have_posts() ):
		
			$news_query->the_post();

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

		<?php $count++; endwhile; ?>
		<?php wp_reset_postdata(); ?>
	<?php endif; ?> 

	</div>	

	<?php
	$llnews = ob_get_contents();
	ob_end_clean();

	if ( empty( $llnews ) ) {
		return null;
	}

	$response = new WP_REST_Response( $llnews, 200 );

	$response->header( 'Content-Type', 'text/html; charset=utf-8' );

	return $response;

}


?>