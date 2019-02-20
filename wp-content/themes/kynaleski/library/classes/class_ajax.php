<?php
class ajax_get_modals{
	
	public function __construct(){
		add_action('wp_ajax_get_modals', array( $this, 'get_modals') );
		add_action('wp_ajax_nopriv_get_modals', array( $this, 'get_modals') );
	}

	public function get_modals(){

		ob_start();

		get_template_part('partials/speaker_modals');		

		get_template_part('partials/event_modals'); 

		get_template_part('partials/category_modals'); 

		$html = ob_get_contents();

		ob_end_clean();

		die(json_encode(array(
			'success' => true,
			'html' => $html
			)));
	}

} 

new ajax_get_modals();

?>