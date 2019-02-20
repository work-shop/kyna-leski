
<section class="block page-content padded" id="page-content">
	<div class="container">
		<?php 
		if(have_posts()): 
			while(have_posts()):
				the_post();
				the_content();
			endwhile;
		endif;
		?>
	</div>	
</section>
