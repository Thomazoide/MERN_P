const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Usuario = require("./models/usuario");
const {merge} = require("lodash");
const {ApolloServer, gql} = require("apollo-server-express");
mongoose.connect("mongodb+srv://Thomazoide:Thom1232!@mastercluster.hasjpif.mongodb.net/DataPpal", {useNewUrlParser: true, useUnifiedTopology: true});

const typeDefs = gql`
type Usuario {
    id: ID!
    email: String!
    pass: String!
}

type Alert {
    message: String
}

input UsuarioInput {
    email: String!
    pass: String!
}

type Query {
    getUsuarios: [Usuario]
    getUsuario(id: ID!): Usuario
}

type Mutation {
    assUsuario(input: UsuarioInput): Usuario
    updateUsuario(id: ID!, input: UsuarioInput): Usuario
    deleteUsuario(id: ID!): Alert
}
`;

const resolvers = {
    Query: {
        async getUsuarios(obj){
            const usuarios = await Usuario.find();
            return usuarios;
        },
        async getUsuario(obj, {id}){
            const usuario = await Usuario.findById(id);
            return usuario;
        }
    }//SEGUIR CON EL VIDEO "GRAPHQL2" EN EL MINUTO 23:44
}