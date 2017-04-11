class CourseSection {
    constructor(sectionID="", instructor="", startTime="", endTime="", days = {}, numberOfStudents = 0, undergradTAsNeeded = 0, gradTAsNeeded = 0, undergradLAsNeeded = 0) {
      this.sectionID = sectionID;
      this.instructor = instructor;
      this.startTime = startTime;
      this.endTime = endTime;
      this.days = days;
      this.numberOfStudents = numberOfStudents;
      this.undergradTAsNeeded = undergradTAsNeeded;
      this.gradTAsNeeded = gradTAsNeeded;
      this.undergradLAsNeeded = undergradLAsNeeded;
    }
}
