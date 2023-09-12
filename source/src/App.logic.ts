
import type { ExposedCtx, ReminderData } from "../electron/shared/exposedCtx.cjs";
import Swal from '../node_modules/sweetalert2/dist/sweetalert2.js';

export function makeNewReminder(ctx: ExposedCtx): ReminderData[] {
	const name = (document.getElementById('reminderName') as HTMLInputElement).value;
	const now = new Date();
	const endDate = new Date((document.getElementById('reminderDate') as HTMLInputElement).value);
	const dates: Date[] = [];
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
	const fourthDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3);
	const seventhDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6);
	dates.push(today);
	dates.push(tomorrow);
	dates.push(fourthDay);
	dates.push(seventhDay);
	while (dates[dates.length - 1] < new Date(endDate)) {
		const lastDate = dates[dates.length - 1];
		const nextDate = new Date(lastDate);
		nextDate.setDate(nextDate.getDate() + 30);
		dates.push(nextDate);
	}
	const filteredDates: Date[] = dates.filter(date => date < endDate);
	if (filteredDates.length !== 0) {
		const reminderId = uuidv4();
		ctx.addReminder({name, id: reminderId, dates: filteredDates});
		console.log({name, reminderId, dates: filteredDates});
	} else {
		Swal.fire({
			title: "Warning",
			text: "Date is invalid",
			confirmButtonClass: "btn btn-warning",
			icon: "error"
		});
	}
	return ctx.getReminders();
}