<script>
	export let editor;
	export let label = 'Font Family';
	export let name = 'fontFamily';
	export let inputs = 'text';

	inputs = inputs.split(',');
	console.log(inputs);
</script>

<div class="option">
	<label for={name}>{label}</label>
	<div>
		<form
			class="inputForm"
			on:submit={(e) => {
				e.preventDefault();
				let formValue = e.target.elements.namedItem(`${name}`).value;
				editor
					.chain()
					.focus()
					.setMark('textStyle', { [`${name}`]: formValue })
					.run();
			}}
		>
			<input type="text" name={`${name}`} />
			<button>Apply</button>
			<button
				on:click={() => {
					editor
						.chain()
						.setMark('textStyle', { [`${name}`]: null })
						.removeEmptyTextStyle()
						.run();
				}}>none</button
			>
		</form>
	</div>
</div>

<style>
	.option {
		display: flex;
		gap: 8px;
		justify-content: space-between;
		align-items: center;
	}
	.inputForm {
		display: flex;
		margin-right: 13px;
		gap: 8px;
	}
	.option button {
		margin: 0px;
	}
	.option label {
		min-width: 100px;
	}
	.option div {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	.option input {
		margin: 0px;
	}
</style>
