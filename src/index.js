const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const _ = require('lodash');
const {
    GraphQLSchema
} = require('graphql');

const RootQueryType = require('./resolvers/query');
const RootMutationType = require('./resolvers/mutation');

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});


app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Server running');

});

//Hello World Part

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'HelloWorld',
//         fields: () => ({
//             message: {
//                 type: GraphQLString,
//                 resolve: () => 'Hello World'
//             }
//         })
//     })
// });

// const BookType = new GraphQLObjectType({
//     name: 'Book',
//     description: 'Represent books',
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLNonNull(GraphQLString) },
//         authorId: { type: GraphQLNonNull(GraphQLInt) },
//         author: {
//             type: AuthorType,
//             resolve: (book) => {
//                 return authors.find(author => author.id === book.authorId);
//             }
//         }
//     })
// });

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     description: 'Represent authors',
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLNonNull(GraphQLString) },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve: (author) => {
//                 return books.filter(book => book.authorId === author.id);
//             }
//         }
//     })
// });
// const CourseType = new GraphQLObjectType({
//     name: 'Course',
//     description: 'Represent Course',
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLNonNull(GraphQLString) },
//         description: { type: GraphQLNonNull(GraphQLString) }
//     })
// });

// const StudentType = new GraphQLObjectType({
//     name: 'Student',
//     description: 'Represent Student',
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLNonNull(GraphQLString) },
//         lastName: { type: GraphQLNonNull(GraphQLString) },
//         courseId: { type: GraphQLNonNull(GraphQLInt) },
//         course: {
//             type: CourseType,
//             resolve: (student) => {
//                 return courses.find(course => course.id === student.courseId);
//             }
//         }
//     })
// });

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

// const RootQueryType = new GraphQLObjectType({
//     name: 'Query',
//     description: 'Root Query',
//     fields: () => ({
//         courses: {
//             type: new GraphQLList(CourseType),
//             description: 'List of All Courses',
//             resolve: () => courses
//         },
//         students: {
//             type: new GraphQLList(StudentType),
//             description: 'List of All Student',
//             resolve: () => students
//         },
//         grades: {
//             type: new GraphQLList(GradeType),
//             description: 'List of All Grade',
//             resolve: () => grades
//         },
//         course: {
//             type: CourseType,
//             description: 'Particular Course',
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve: (parent, args) => courses.find(course => course.id === args.id)
//         },
//         student: {
//             type: StudentType,
//             description: 'Particular Student',
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve: (parent, args) => students.find(student => student.id === args.id)
//         },
//         grade: {
//             type: GradeType,
//             description: 'Particular Grade',
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve: (parent, args) => grades.find(grade => grade.id === args.id)
//         }

//     }),
// });

// const RootMutationType = new GraphQLObjectType({
//     name: 'Mutation',
//     description: 'Root Mutation',
//     fields: () => ({
//         addCourse: {
//             type: CourseType,
//             description: 'Add a Course',
//             args: {
//                 name: { type: GraphQLNonNull(GraphQLString) },
//                 description: { type: GraphQLNonNull(GraphQLString) }
//             },
//             resolve: (parent, args) => {
//                 const course = {
//                     id: coursesLength + 1,
//                     name: args.name,
//                     description: args.description
//                 };
//                 coursesLength += 1;
//                 courses.push(course);
//                 return course;
//             }
//         },
//         addStudent: {
//             type: StudentType,
//             description: 'Add a student',
//             args: {
//                 name: { type: GraphQLNonNull(GraphQLString) },
//                 lastName: { type: GraphQLNonNull(GraphQLString) },
//                 courseId: { type: GraphQLNonNull(GraphQLInt) }
//             },
//             resolve: (parent, args) => {
//                 const curso = courses.find(course => course.id === args.courseId);
//                 if (curso != null) {
//                     const student = {
//                         id: studentsLength + 1,
//                         name: args.name,
//                         lastName: args.lastName,
//                         courseId: args.courseId
//                     };
//                     students.push(student);
//                     return student;
//                 } else {
//                     throw new Error(`do not exist a course whit that id ${args.courseId}`);
//                 }

//             }
//         },
//         addGrade: {
//             type: GradeType,
//             description: 'Add a grade',
//             args: {
//                 courseId: { type: GraphQLNonNull(GraphQLInt) },
//                 studentId: { type: GraphQLNonNull(GraphQLInt) },
//                 grade: { type: GraphQLNonNull(GraphQLInt) }
//             },
//             resolve: (parent, args) => {
//                 const course = courses.find(course => course.id === args.courseId);
//                 const student = students.find(student => student.id === args.studentId);
//                 if (course && student) {
//                     if (0 <= args.grade && args.grade <= 10) {
//                         const grade = {
//                             id: gradesLength + 1,
//                             courseId: args.courseId,
//                             studentId: args.studentId,
//                             grade: args.grade
//                         };
//                         gradesLength += 1;
//                         grades.push(grade);
//                         return grade;
//                     } else {
//                         throw new Error(`the grade must be number between 0 and 10`);
//                     }
//                 } else {
//                     if (student == course) {
//                         throw new Error(`there is neither course id: ${args.courseId} nor student id: ${args.studentId} `);
//                     } else if (student) {
//                         throw new Error(`do not exist a course whit that id ${args.courseId}`);
//                     } else {
//                         throw new Error(`do not exist a student whit that id ${args.gradeId}`);
//                     }
//                 }

//             }
//         },
//         editCourse: {
//             type: CourseType,
//             description: 'edit a Course',
//             args: {
//                 id: { type: GraphQLNonNull(GraphQLInt) },
//                 name: { type: GraphQLNonNull(GraphQLString) },
//                 description: { type: GraphQLNonNull(GraphQLString) }
//             },
//             resolve: (parent, args) => {
//                 const course = courses.find(course => course.id === args.id);

//                 if (course) {
//                     course.name = args.name;
//                     course.description = args.description;
//                     return course;
//                 } else {
//                     throw new Error(`do not exist a course whit that id ${args.id}`);
//                 }

//             }
//         },
//         editStudent: {
//             type: StudentType,
//             description: 'Edit a student',
//             args: {
//                 id: { type: GraphQLNonNull(GraphQLInt) },
//                 name: { type: GraphQLNonNull(GraphQLString) },
//                 lastName: { type: GraphQLNonNull(GraphQLString) },
//                 courseId: { type: GraphQLNonNull(GraphQLInt) }
//             },
//             resolve: (parent, args) => {

//                 const student = students.find(student => student.id === args.id);
//                 const curso = courses.find(course => course.id === args.courseId);
//                 if (curso && student) {
//                     student.name = args.name;
//                     student.lastName = args.lastName;
//                     student.courseId = args.courseId;
//                     return student;
//                 } else {
//                     if (student) {
//                         throw new Error(`do not exist a course whit that id ${args.courseId}`);
//                     } else {
//                         throw new Error(`do not exist a student whit that id ${args.id}`);
//                     }

//                 }

//             }
//         },
//         editGrade: {
//             type: GradeType,
//             description: 'edit a grade',
//             args: {
//                 id: { type: GraphQLNonNull(GraphQLInt) },
//                 courseId: { type: GraphQLNonNull(GraphQLInt) },
//                 studentId: { type: GraphQLNonNull(GraphQLInt) },
//                 grade: { type: GraphQLNonNull(GraphQLInt) }
//             },
//             resolve: (parent, args) => {
//                 const grade = grades.find(grade => grade.id === args.id);
//                 const course = courses.find(course => course.id === args.courseId);
//                 const student = students.find(student => student.id === args.studentId);
//                 if (grade) {
//                     if (0 <= args.grade && args.grade <= 10) {
//                         if (course && student) {
//                             grade.courseId = args.courseId;
//                             grade.studentId = args.studentId;
//                             grade.grade = args.grade;
//                             return grade;
//                         } else {
//                             if (student == course) {
//                                 throw new Error(`there is neither a valid course id: ${args.courseId} nor student id: ${args.studentId} `);
//                             } else if (student) {
//                                 throw new Error(`do not exist a course whit that id ${args.courseId}`);
//                             } else {
//                                 throw new Error(`do not exist a student whit that id ${args.gradeId}`);
//                             }
//                         }
//                     } else {
//                         throw new Error(`the grade must be number between 0 and 10`);
//                     }
//                 } else {
//                     throw new Error(`do not exist a grade whit that id ${args.id}`);
//                 }

//             }
//         },
//         deleteCourse: {
//             type: GraphQLList(CourseType),
//             description: 'delete a Course',
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve: (parent, args) => {
//                 const student = students.find(student => student.courseId === args.id);
//                 const grade = grades.find(grade => grade.courseId === args.id);
//                 let courseDeleted = false;

//                 if (!student && !grade) {
//                     courses.map(course => {
//                         if (args.id === course.id) {
//                             courseDeleted = true;
//                         }
//                     });
//                     if (courseDeleted == true) {
//                         _.remove(courses, course => course.id === args.id);
//                     } else {
//                         throw new Error(`do not exist a course whit that id ${args.id}`);
//                     }
//                     return courses;
//                 } else {
//                     throw new Error(`do not delet a course whit that id ${args.id}, becouse this course have a student or grade`);
//                 }
//             }
//         },
//         deleteStudent: {
//             type: GraphQLList(StudentType),
//             description: 'delete a Student',
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve: (parent, args) => {
//                 const grade = grades.find(grade => grade.courseId === args.id);
//                 let courseDeleted = false;

//                 if (!grade) {
//                     students.map(student => {
//                         if (args.id === student.id) {
//                             courseDeleted = true;
//                         }
//                     });
//                     if (courseDeleted == true) {
//                         _.remove(students, student => student.id === args.id);
//                     } else {
//                         throw new Error(`do not exist a student whit that id ${args.id}`);
//                     }
//                     return students;
//                 } else {
//                     throw new Error(`do not delet a student whit that id ${args.id}, becouse this student have a grade`);
//                 }
//             }
//         },
//         deleteGrade: {
//             type: GraphQLList(GradeType),
//             description: 'delete a Grade',
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve: (parent, args) => {
//                 let courseDeleted = false;

//                 students.map(student => {
//                     if (args.id === student.id) {
//                         courseDeleted = true;
//                     }
//                 });
//                 if (courseDeleted == true) {
//                     _.remove(grades, grade => grade.id === args.id);
//                 } else {
//                     throw new Error(`do not exist a student whit that id ${args.id}`);
//                 }
//                 return grades;

//             }
//         }
//     })
// });