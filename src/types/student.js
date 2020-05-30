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

const CourseType = require('./course');


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

exports.StudentType = StudentType;