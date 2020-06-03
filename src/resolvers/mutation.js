const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');
const _ = require('lodash');

const students = require('../storage/students.json');
const grades = require('../storage/grades.json');
const courses = require('../storage/courses.json');

let coursesLength = courses.length;
let studentsLength = students.length;
let gradesLength = grades.length;
const { CourseType, GradeType, StudentType } = require('../types/index');

// const StudentType = require('../types/student').StudentType;
// const GradeType = require('../types/grade').GradeType;
// const CourseType = require('../types/course').CourseType;



const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addCourse: {
            type: CourseType,
            description: 'Add a Course',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const course = {
                    id: coursesLength + 1,
                    name: args.name,
                    description: args.description
                };
                coursesLength += 1;
                courses.push(course);
                return course;
            }
        },
        addStudent: {
            type: StudentType,
            description: 'Add a student',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                courseId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const curso = courses.find(course => course.id === args.courseId);
                if (curso != null) {
                    const student = {
                        id: studentsLength + 1,
                        name: args.name,
                        lastName: args.lastName,
                        courseId: args.courseId
                    };
                    students.push(student);
                    return student;
                } else {
                    throw new Error(`do not exist a course whit that id ${args.courseId}`);
                }

            }
        },
        addGrade: {
            type: GradeType,
            description: 'Add a grade',
            args: {
                courseId: { type: GraphQLNonNull(GraphQLInt) },
                studentId: { type: GraphQLNonNull(GraphQLInt) },
                grade: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const course = courses.find(course => course.id === args.courseId);
                const student = students.find(student => student.id === args.studentId);
                if (course && student) {
                    if (0 <= args.grade && args.grade <= 10) {
                        const grade = {
                            id: gradesLength + 1,
                            courseId: args.courseId,
                            studentId: args.studentId,
                            grade: args.grade
                        };
                        gradesLength += 1;
                        grades.push(grade);
                        return grade;
                    } else {
                        throw new Error(`the grade must be number between 0 and 10`);
                    }
                } else {
                    if (student == course) {
                        throw new Error(`there is neither course id: ${args.courseId} nor student id: ${args.studentId} `);
                    } else if (student) {
                        throw new Error(`do not exist a course whit that id ${args.courseId}`);
                    } else {
                        throw new Error(`do not exist a student whit that id ${args.gradeId}`);
                    }
                }

            }
        },
        editCourse: {
            type: CourseType,
            description: 'edit a Course',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const course = courses.find(course => course.id === args.id);

                if (course) {
                    course.name = args.name;
                    course.description = args.description;
                    return course;
                } else {
                    throw new Error(`do not exist a course whit that id ${args.id}`);
                }

            }
        },
        editStudent: {
            type: StudentType,
            description: 'Edit a student',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                courseId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {

                const student = students.find(student => student.id === args.id);
                const curso = courses.find(course => course.id === args.courseId);
                if (curso && student) {
                    student.name = args.name;
                    student.lastName = args.lastName;
                    student.courseId = args.courseId;
                    return student;
                } else {
                    if (student) {
                        throw new Error(`do not exist a course whit that id ${args.courseId}`);
                    } else {
                        throw new Error(`do not exist a student whit that id ${args.id}`);
                    }

                }

            }
        },
        editGrade: {
            type: GradeType,
            description: 'edit a grade',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                courseId: { type: GraphQLNonNull(GraphQLInt) },
                studentId: { type: GraphQLNonNull(GraphQLInt) },
                grade: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const grade = grades.find(grade => grade.id === args.id);
                const course = courses.find(course => course.id === args.courseId);
                const student = students.find(student => student.id === args.studentId);
                if (grade) {
                    if (0 <= args.grade && args.grade <= 10) {
                        if (course && student) {
                            grade.courseId = args.courseId;
                            grade.studentId = args.studentId;
                            grade.grade = args.grade;
                            return grade;
                        } else {
                            if (student == course) {
                                throw new Error(`there is neither a valid course id: ${args.courseId} nor student id: ${args.studentId} `);
                            } else if (student) {
                                throw new Error(`do not exist a course whit that id ${args.courseId}`);
                            } else {
                                throw new Error(`do not exist a student whit that id ${args.gradeId}`);
                            }
                        }
                    } else {
                        throw new Error(`the grade must be number between 0 and 10`);
                    }
                } else {
                    throw new Error(`do not exist a grade whit that id ${args.id}`);
                }

            }
        },
        deleteCourse: {
            type: GraphQLList(CourseType),
            description: 'delete a Course',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const student = students.find(student => student.courseId === args.id);
                const grade = grades.find(grade => grade.courseId === args.id);
                let courseDeleted = false;

                if (!student && !grade) {
                    courses.map(course => {
                        if (args.id === course.id) {
                            courseDeleted = true;
                        }
                    });
                    if (courseDeleted == true) {
                        _.remove(courses, course => course.id === args.id);
                    } else {
                        throw new Error(`do not exist a course whit that id ${args.id}`);
                    }
                    return courses;
                } else {
                    throw new Error(`do not delet a course whit that id ${args.id}, becouse this course have a student or grade`);
                }
            }
        },
        deleteStudent: {
            type: GraphQLList(StudentType),
            description: 'delete a Student',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const grade = grades.find(grade => grade.studentId === args.id);
                let studentDeleted = false;

                if (!grade) {
                    students.map(student => {
                        if (args.id === student.id) {
                            studentDeleted = true;
                        }
                    });
                    if (studentDeleted == true) {
                        _.remove(students, student => student.id === args.id);
                    } else {
                        throw new Error(`do not exist a student whit that id ${args.id}`);
                    }
                    return students;
                } else {
                    throw new Error(`do not delet a student whit that id ${args.id}, becouse this student have a grade`);
                }
            }
        },
        deleteGrade: {
            type: GraphQLList(GradeType),
            description: 'delete a Grade',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                let gradeDeleted = false;

                students.map(grade => {
                    if (args.id === grade.id) {
                        gradeDeleted = true;
                    }
                });
                console.log(gradeDeleted);

                if (gradeDeleted == true) {
                    _.remove(grades, grade => grade.id === args.id);
                } else {
                    throw new Error(`do not exist a grade whit that id ${args.id}`);
                }
                return grades;
            }
        }
    })
});


module.exports = RootMutationType;