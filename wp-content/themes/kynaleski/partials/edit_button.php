<?php if(is_user_logged_in() && is_singular()): ?>
	<a href="<?php echo get_edit_post_link(); ?>" target="_blank" id="edit-button" class="hidden-xs"><span class="icon white" data-icon="r"></span></a>
<?php endif; ?>