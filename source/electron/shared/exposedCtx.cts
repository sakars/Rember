
export type ReminderData = {
    name: string;
    dates: Date[];
}

export interface ExposedCtx {
    addReminder: (reminder: ReminderData) => void;
    removeReminder: (reminderName: string) => void;
    getReminders: () => ReminderData[];
    dismissReminder: (reminderName: string) => void;
	onUpdate: (callback: () => void) => void;
}

