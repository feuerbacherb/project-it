const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Project, Task } = require('../models');
const { signToken } = require('../utils/auth');
//const { findOneAndUpdate } = require('../models/User');

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {

    Query: {
        projects: async () => {
            return await Project.find();
        },
        users: async () => {
            return await User.find();
        },
        project: async (parent, {_id}) => {
            return await Project.findById(_id);
        },
        //user: async (parent, {_id}) =>{
        user: async (parent, {_id}) =>{

        //    return await User.findById(_id);

            return await User.findById(_id);
        },
        tasks: async (parent,{_id}) =>{
            return await Task.find({ownerProject:_id});
        },
        comments: async (parent,{ownerTask}) =>{
            return await Comment.find({ownerTask:ownerTask});
            
        },
        projectByUser: async (parent, {owner} ) =>{
            return await Project.find({owner:owner});
            
        }

    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            console.log (user);
            const token = signToken(user);
            console.log(user);
            console.log(token);
            return { token, user };
            //console.log(user);
            //return ( user );
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
      
            return { token, user };
        },
        addProject: async (parent, args) =>{
            console.log (args);
            return await Project.create(args)

        },
        updateProject: async (parent, args) =>{
            console.log(args);
            if (args.projname){
                const updateProjName = await Project.findOneAndUpdate(
                    {_id: args._id},
                    {name:args.name}
                )
                
            }; 
            if (args.description){
                const updateProjDesc = await Project.findOneAndUpdate(
                    {_id: args._id},
                    {description:args.description}
                )
                
            };
            if (args.startDate){
                const updateProjSDate = await Project.findOneAndUpdate(
                    {_id: args._id},
                    {startDate:args.startDate}
                )
                
            };
            if (args.endDate){
                const updateProjEDate = await Project.findOneAndUpdate(
                    {_id: args._id},
                    {endDate:args.endDate}
                )
               
            };
            if (args.status){
                const updateProjStatus = await Project.findOneAndUpdate(
                    {_id: args._id},
                    {status:args.status}
                )
                
            };
            if (args.owner){
                const updateProjOwner = await Project.findOneAndUpdate(
                    {_id: args._id},
                    {owner:args.owner}
                )
                
            };
            const updatedProject =await Project.findById(args._id);
            return updatedProject;
        },
        addTask: async (parent, args) =>{
            
            return await Task.create(args)
            //console.log(newTask);
            
            return newTask;
        },
        updateTask: async (parent, args) =>{
            console.log(args);
            if (args.name){
                await Task.findOneAndUpdate(
                    {_id: args._id},
                    {name:args.name}
                )
                
            }; 
            if (args.description){
                 await Task.findOneAndUpdate(
                    {_id: args._id},
                    {description:args.description}
                )
                
            };
            if (args.startDate){
                 await Task.findOneAndUpdate(
                    {_id: args._id},
                    {startDate:args.startDate}
                )
                
            };
            if (args.endDate){
                 await Task.findOneAndUpdate(
                    {_id: args._id},
                    {endDate:args.endDate}
                )
                
            };
            if (args.status){
                await Task.findOneAndUpdate(
                    {_id: args._id},
                    {status:args.status}
                )
                
            };
            if (args.owner){
                await Task.findOneAndUpdate(
                    {_id: args._id},
                    {owner:args.owner}
                )
                
            }
            const updatedTask =await Task.findById(args._id);
            return updatedTask;
        },
        addComment: async (parent, args) =>{
            return await Comment.create(args)
        }
    }
}
module.exports = resolvers;
