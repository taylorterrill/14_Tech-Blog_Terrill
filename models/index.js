const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Model Relationships

// Users are able to create many posts, but each post is only allowed one author.
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Likewise with comments, a user is able to make many, but a comment is only allowed one author.
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  hooks: true,
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  hooks: true,
});

// Posts can have many comments, but a comment can only appear on one post.
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
  hooks: true,
});

Comment.belongsTo(Post,{
  foreignKey: 'post_id',
  onDelete: 'cascade',
  hooks: true,
});

module.exports = { User, Post, Comment };