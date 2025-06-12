<?php $today = date( 'Y-m-d' ); ?>
<form class="mews-booking-form">
	<div class="mews-content-wrapper">
		<div class="mews-form-fields">
			<div class="form-field-box">
				<div class="input-wrapper">
					<label class="text-size-xsmall" for="guests"><?php _e( 'City', 'dc' ); ?></label>
					<select id="select-city" class="select-city" name="select-city">
						<?php
						$ids = get_field('configuration_ids', 'options');
						foreach ($ids as $id) :
							printf(
								'<option value="%s">%s</option>',
								$id['id'],
								$id['location'],
							);
						endforeach;
						?>
					</select>
				</div>
			</div>

			<div class="form-field-box">
				<div class="input-wrapper">
					<label class="text-size-xsmall" for="guests"><?php _e( 'Guests', 'dc' ); ?></label>
					<input class="text-size-small" placeholder="<?php _e( 'Add guests', 'dc' ); ?>" type="number" id="guests" name="guests" required />
				</div>
			</div>
			<div class="form-field-box">
				<div class="input-wrapper">
					<label class="text-size-xsmall" for="start"><?php _e( 'Check in', 'dc' ); ?></label>
					<input class="text-size-small" min="<?php echo $today; ?>" value="<?php echo $today; ?>" type="date" id="start" name="start" required />
				</div>
			</div>
			<div class="form-field-box">
				<div class="input-wrapper">
					<label class="text-size-xsmall" for="end"><?php _e( 'Check out', 'dc' ); ?></label>
					<input class="text-size-small" min="<?php echo $today; ?>" value="<?php echo $today; ?>" type="date" id="end" name="end" required />
				</div>
			</div>
		</div>

		<input class="dc-button outlined dark" type="submit" value="<?php _e( 'Book a home', 'dc' ); ?>" disabled />
	</div>
	<button class="mews-popup-toggler dc-button"><?php _e( 'Book now', 'dc' ); ?></button>
</form>
