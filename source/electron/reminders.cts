import { ReminderData } from "./shared/exposedCtx.cjs";
/// <reference types="electron-store" />

import Store = require('electron-store');
import Helpers = require('./helpers.cjs');
const { truncateToDay } = Helpers;
const store = new Store();

export class ReminderStorage {
	private reminders: ReminderData[];
	private store: Store;
	constructor(store: Store) {
		this.store = store;
		this.getReminders();
	}

	private saveReminders() {
		console.log('saving reminders', this.reminders);
		const serialized = this.reminders.map((reminder) => {
			return {
				name: reminder.name,
				dates: reminder.dates.map((date) => date.toISOString())
			};
		});
		store.set('reminders', serialized);
	}

	getReminders() {
		const serialized = store.get('reminders');
		if(!Array.isArray(serialized)) throw new Error('reminders is not an array');
		if (serialized) {
			this.reminders = serialized.map((reminder) => {
				return {
					name: reminder.name,
					dates: reminder.dates.map((date) => new Date(date))
				};
			});
		} else {
			this.reminders = [];
		}
		return this.reminders;
	}

	addReminder(reminder: ReminderData) {
		console.log('adding reminder', reminder);
		this.reminders.push(reminder);
		this.saveReminders();
	}
	
	removeReminder(reminderName: string) {
		this.reminders = this.reminders.filter((reminder) => reminder.name !== reminderName);
		this.saveReminders();
	}

	dismissReminder(reminderName: string) {
		this.getReminders();
		
		const reminder = this.reminders.find((reminder) => reminder.name === reminderName);
		if (reminder) {
			// filter all dates that are in the past (or today)
			const today = truncateToDay(new Date());

			reminder.dates = reminder.dates.filter(
				(date) => truncateToDay(date) > today
			);
			if(reminder.dates.length === 0) {
				this.removeReminder(reminderName);
			}
			this.saveReminders();
		} else {
			console.log('reminder not found');
		}
	}
}

export const reminderStorage = new ReminderStorage(store);