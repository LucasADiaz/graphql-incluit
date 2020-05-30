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

// const { CourseType } = require('./course');
// const { StudentType } = require('./student');

// const GradeType = new GraphQLObjectType({
//     name: 'Grade',
//     description: 'Represent Grade',
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         courseId: { type: GraphQLNonNull(GraphQLInt) },
//         studentId: { type: GraphQLNonNull(GraphQLInt) },
//         grade: { type: GraphQLNonNull(GraphQLInt) },
//         course: {
//             type: CourseType,
//             resolve: (grade) => {
//                 return courses.find(course => course.id === grade.courseId);
//             }
//         },
//         student: {
//             type: StudentType,
//             resolve: (grade) => {
//                 return students.find(student => student.id === grade.studentId);
//             }
//         }
//     })
// });

// exports.GradeType = GradeType;