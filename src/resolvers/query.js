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


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        courses: {
            type: new GraphQLList(CourseType),
            description: 'List of All Courses',
            resolve: () => courses
        },
        students: {
            type: new GraphQLList(StudentType),
            description: 'List of All Student',
            resolve: () => students
        },
        grades: {
            type: new GraphQLList(GradeType),
            description: 'List of All Grade',
            resolve: () => grades
        },
        course: {
            type: CourseType,
            description: 'Particular Course',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => courses.find(course => course.id === args.id)
        },
        student: {
            type: StudentType,
            description: 'Particular Student',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => students.find(student => student.id === args.id)
        },
        grade: {
            type: GradeType,
            description: 'Particular Grade',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => grades.find(grade => grade.id === args.id)
        }

    }),
});

module.exports = RootQueryType;