// const {
//     GraphQLSchema,
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLList,
//     GraphQLNonNull,
//     GraphQLInt
// } = require('graphql');

// const students = require('../storage/students.json');
// const grades = require('../storage/grades.json');
// const courses = require('../storage/courses.json');
// let coursesLength = courses.length;
// let studentsLength = students.length;
// let gradesLength = grades.length;

// const CourseType = new GraphQLObjectType({
//     name: 'Course',
//     description: 'Represent Course',
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLNonNull(GraphQLString) },
//         description: { type: GraphQLNonNull(GraphQLString) }
//     })
// });

// exports.CourseType = CourseType;