// models/assignment.js

class Assignment {
    constructor({ id, title, subject, dueDate, reminderTime, userId }) {
      this.id = id;
      this.title = title;
      this.subject = subject;
      this.dueDate = dueDate;
      this.reminderTime = reminderTime;
      this.userId = userId;
    }
  }
  
  // Fake in-memory database
  const fakeDatabase = [];
  
  module.exports = {
    Assignment,
    fakeDatabase,
  };  