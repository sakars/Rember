import { v4 as uuidv4 } from 'uuid';

export type ReminderData = {
    name: string;
    id: uuidv4;
    dates: Date[];
}

export interface ExposedCtx {
    addReminder: (reminder: ReminderData) => void;
    removeReminder: (reminderId: uuidv4) => void;
    getReminders: () => ReminderData[];
    dismissReminder: (reminderId: uuidv4) => void;
	onUpdate: (callback: () => void) => void;
}

