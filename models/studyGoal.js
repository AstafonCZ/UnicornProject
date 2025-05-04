class StudyGoal {
    constructor({ id, subject, hoursPerWeek, userId }) {
      this.id = id;
      this.subject = subject;
      this.hoursPerWeek = hoursPerWeek;
      this.userId = userId;
    }
  }
  
  const studyGoalDB = [];
  
  module.exports = {
    StudyGoal,
    studyGoalDB,
  };
  