# Steps

1. run `npm init --y`

2. run `npm i express express-graphql graphql`

3. run `npm i --save-dev nodemon`

4. add script on package json to auto re-run the project when change is made 

 "dev": "nodemon index.js"

5. create index.js and add

    const express = require('express');
    const app = express();

    app.listen(3000, ()=>{
        console.log('Server running');
        
    })

6. Add to index.js

    const expressGraphQL = require('express-graphql');

    app.use('/graphql', expressGraphQL({
        graphiql: true
    }))

7. open url http://localhost:3000/graphql and we get the error 

    {
    "errors": [
        {
        "message": "GraphQL middleware options must contain a schema."
        }
    ]
    }

8. add to index.js 

    const {
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString
    } = require('graphql');

    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'HelloWorld',
            fields: () => ({
                message: {
                    type: GraphQLString,
                    resolve: () => 'Hello World'
                }
            })
        })
    });

    app.use('/graphql', expressGraphQL({
        schema: schema,
        graphiql: true
    }))

9. add file books.json whit the following data

    [
        { 
            "id": 1, 
            "name": "Harry Potter and the Chamber of Secrets", 
            "authorId": 1 
        },
        { 
            "id": 2, 
            "name": "Harry Potter and the Prisoner of Azkaban",
            "authorId": 1 
        },
        { 
            "id": 3, 
            "name": "Harry Potter and the Goblet of Fire", 
            "authorId": 1 
        },
        { 
            "id": 4, 
            "name": "The Fellowship of the Ring",
            "authorId": 2 
        },
        { 
            "id": 5, 
            "name": "The Two Towers", 
            "authorId": 2 
        },
        { 
            "id": 6, 
            "name": "The Return of the King", 
            "authorId": 2 
        },
        { 
            "id": 7, 
            "name": "The Way of Shadows", 
            "authorId": 3 
        },
        { 
            "id": 8, 
            "name": "Beyond the Shadows", 
            "authorId": 3 
        }
    ]

10. add file authors.json whit the following data

    [
        { 
            "id": 1, 
            "name": "J. K. Rowling" 
        },
        { 
            "id": 2, 
            "name": "J. R. R. Tolkien" 
        },
        { 
            "id": 3, 
            "name": "Brent Weeks" 
        }
    ]

11. add to index.js 

    const authors = require('./authors.json');
    const books = require('./books.json');

    const BookType = new GraphQLObjectType({
        name: 'Book',
        description: 'Represent books',
        fields: () => ({
            id: { type: GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLNonNull(GraphQLString) },
            authorId: { type: GraphQLNonNull(GraphQLInt) },
        })
    });

    const RootQueryType = new GraphQLObjectType({
        name: 'Query',
        description: 'Root Query',
        fields: () => ({
            books: {
                type: new GraphQLList(BookType),
                description: 'List of All Books',
                resolve: () => books
            },
        }),
    });

    const schema = new GraphQLSchema({
        query: RootQueryType
    });

12. query books objects, open http://localhost:3000/graphql

    {
    books{
        id
        name
        authorId
    }
    }

13. add to Booktype object

    author: {
                type: AuthorType,
                resolve: (book) => {
                    return authors.find(author => authors.id === book.authorId)
                }
    }

14. add AuthorType

    const AuthorType = new GraphQLObjectType({
        name: 'Author',
        description: 'Represent authors',
        fields: () => ({
            id: { type: GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLNonNull(GraphQLString) },
        })
    });

15. query books objects and authors , open http://localhost:3000/graphql

    {
    books{
        id
        name
        author{
        name
        }
    }
    }


    {
    authors{
        name
    }
    }

16. add in authortype relation with books


    const AuthorType = new GraphQLObjectType({
        name: 'Author',
        description: 'Represent authors',
        fields: () => ({
            id: { type: GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLNonNull(GraphQLString) },
            books: {
                type: new GraphQLList(BookType),
                resolve: (author) => {
                    return books.filter(book => book.authorId === author.id)
                }
            }
        })
    });

17. query authors objects and authors , open http://localhost:3000/graphql

    {
    authors{
        id
        name
        books{
        id
        name
        }
    }
    }

18. add author and book query by id inside RootQueryType
  
    book: {
                type: BookType,
                description: 'Particular Book',
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (parent, args) => books.find(book => book.id === args.id)
            },
            author: {
                type: AuthorType,
                description: 'Particular Author',
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (parent, args) => authors.find(author => author.id === args.id)
            },

19. query book and authors by id, open http://localhost:3000/graphql

    {
    book(id: 1){
        name
    }
    }

    {
    author(id: 1){
        name
    }
    }

20. add book and author mutation

    const RootMutationType = new GraphQLObjectType({
        name: 'Mutation',
        description: 'Root Mutation',
        fields: () => ({
            addBook: {
                type: BookType,
                description: 'Add a book',
                args: {
                    name: { type: GraphQLNonNull(GraphQLString) },
                    authorId: { type: GraphQLNonNull(GraphQLInt) },
                },
                resolve: (parent, args) => {
                    const book = {
                        id: books.length + 1,
                        name: args.name,
                        authorId: args.authorId
                    }
                    books.push(book)
                    return book
                }
            },
            addAuthor: {
                type: AuthorType,
                description: 'Add a author',
                args: {
                    name: { type: GraphQLNonNull(GraphQLString) },
                },
                resolve: (parent, args) => {
                    const author = {
                        id: authors.length + 1,
                        name: args.name,
                    }
                    authors.push(author)
                    return author
                }
            }
        })
    })

    const schema = new GraphQLSchema({
        query: RootQueryType,
        mutation: RootMutationType
    });













