import Dexie from "dexie";

export const db = new Dexie("collaborative-task-management");

db.version(1).stores({
  users: "++id, username, password, bio, image",
  tasks: "++id, title, description,createdAt, priority, color, due_date, status, user, team_members",
  auth: "++id, username, password, bio, image",
});

db.open();
