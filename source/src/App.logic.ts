
import type { ExposedCtx, ReminderData } from "../electron/shared/exposedCtx.cjs";

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
	ctx.addReminder({name, dates: filteredDates});
	console.log({name, dates: filteredDates});
	return ctx.getReminders();
}