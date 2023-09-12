<script lang="ts">
	import type { ExposedCtx, ReminderData } from "../../electron/shared/exposedCtx.cjs";
	import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js';
	export let data: ReminderData & { nextReminderDate: Date | undefined } | undefined;
	export let dismissable: boolean | undefined;
	if (dismissable === undefined) {
		dismissable = false;
	}
	const currentDate = new Date();
	let nextReminderDate: Date;
	$: nextReminderDate = data?.nextReminderDate;
	if (nextReminderDate === undefined) {
		nextReminderDate = new Date();
	}
	console.log(data, nextReminderDate);
	function dismissReminder() {
		console.log('DISMISSIUM REMINDIUM');
		window.electron.dismissReminder(data.id);
	}

	let delBtn: HTMLButtonElement;
	let delCheck: HTMLInputElement;
	function updateDelBtn() {
		delBtn.disabled = !delCheck.checked;
	}
	function deleteReminder() {
		Swal.fire({
			text: 'Are you sure you want to delete',
			icon: 'question',
			confirmButtonText: 'DELETE',
			denyButtonText: 'Cancel',
			showDenyButton: 'true'
		}).then((result) => {
			if(result.isConfirmed) {
				console.log('DELETIUM REMINDIUM');
				window.electron.removeReminder(data.id);
			} else {
				console.log('Deletion canceled');
			}
		})
	}
</script>

<div class="card">
	<h2>{data.name}</h2>
	<p>Next reminder: {nextReminderDate.toLocaleDateString()}</p>
	{#if dismissable }
		<div>
			<button on:click={dismissReminder} type="button">Dismiss</button>
		</div>
	{/if}
	<button bind:this={delBtn} on:click={deleteReminder} value="1" disabled type="button" id="delBtn">Delete</button>
	<input bind:this={delCheck} on:click={updateDelBtn} type="checkbox" id="delCheck">
</div>

<style>
	div.card {
		border: 1px solid black;
		border-radius: 5px;
		padding: 5px;
		margin: 5px;
		box-shadow: 3px 3px 3px 3px #888888;
		transition: 0.5s;
	}
	div.card:hover {
		box-shadow: 5px 5px 3px 3px #888888;
		transform: translate(-2px, -2px);
	}
</style>