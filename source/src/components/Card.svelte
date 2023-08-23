<script lang="ts">
	import type { ExposedCtx, ReminderData } from "../../electron/shared/exposedCtx.cjs";
	export let data: ReminderData & { nextReminderDate: Date };
	export let dismissable: boolean | undefined;
	if (dismissable === undefined) {
		dismissable = false;
	}
	const currentDate = new Date();
	let nextReminderDate: Date;
	$: nextReminderDate = data.dates[0];
	if (nextReminderDate === undefined) {
		nextReminderDate = new Date();
	}
	console.log(data, data.dates[0], nextReminderDate);
	function dismissReminder() {
		console.log('DISMISSIUM REMINDIUM');
		window.electron.dismissReminder(data.name);
	}

	let delBtn;
	let delCheck;
	function updateDelBtn() {
		delBtn.disabled = !delCheck.checked;
	}
	function deleteReminder() {
		console.log('DELETIUM REMINDIUM');
		window.electron.removeReminder(data.name);
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