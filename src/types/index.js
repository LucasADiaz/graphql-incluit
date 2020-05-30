const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const students = require('../storage/students.json');
const grades = require('../storage/grades.json');
const courses = require('../storage/courses.json');

let coursesLength = courses.length;
let studentsLength = students.length;
let gradesLength = grades.length;

const CourseType = new GraphQLObjectType({
    name: 'Course',
    description: 'Represent Course',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) }
    })
});

const StudentType = new GraphQLObjectType({
    name: 'Student',
    description: 'Represent Student',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        courseId: { type: GraphQLNonNull(GraphQLInt) },
        course: {
            type: CourseType,
            resolve: (student) => {
                return courses.find(course => course.id === student.courseId);
            }
        }
    })
});

const GradeType = new GraphQLObjectType({
    name: 'Grade',
    description: 'Represent Grade',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        courseId: { type: GraphQLNonNull(GraphQLInt) },
        studentId: { type: GraphQLNonNull(GraphQLInt) },
        grade: { type: GraphQLNonNull(GraphQLInt) },
        course: {
            type: CourseType,
            resolve: (grade) => {
                return courses.find(course => course.id === grade.courseId);
            }
        },
        student: {
            type: StudentType,
            resolve: (grade) => {
                return students.find(student => student.id === grade.studentId);
            }
        }
    })
});

module.exports = {
    CourseType,
    StudentType,
    GradeType
}