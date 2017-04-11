class Course {
    constructor(courseID="", courseTags="", sections=[]) {
        this.courseID = courseID;
        this.courseTags = courseTags;
        this.sections = sections;
    }

    addSection(section) {
      this.sections.push(section);
    }

    removeSection(idx) {
      this.sections.splice(idx, 1);
    }
}
