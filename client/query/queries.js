import { gql } from "@apollo/client";

export const POST_REGISTER = gql`
  mutation Register($inputRegister: RegisterInput!) {
    register(inputRegister: $inputRegister) {
      _id
      name
      username
      email
      password
    }
  }
`;

export const POST_LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      _id
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      authorId
      content
      imgUrl
      likes {
        username
      }
      author {
        _id
        name
        username
        email
        password
      }
      comments {
        content
      }
    }
  }
`;

export const GET_POST_DETAIL = gql`
  query GetPostById($postId: ID!) {
    getPostById(postId: $postId) {
      authorId
      _id
      content
      createdAt
      imgUrl
      tags
      updatedAt
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      author {
        _id
        name
        username
        email
        password
      }
    }
  }
`;

export const POST_NEW_POST = gql`
  mutation AddPost($input: PostInput!) {
    addPost(input: $input) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      _id
      name
      username
      email
      password
      follower {
        _id
        name
        username
        email
        password
      }
      following {
        _id
        name
        username
        email
        password
      }
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query GetUserByName($username: String) {
    getUserByName(username: $username) {
      _id
      name
      username
      email
      password
    }
  }
`;

export const POST_ADD_LIKE = gql`
  mutation AddLike($postId: ID!) {
    addLike(postId: $postId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const POST_ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $input: CommentInput!) {
    addComment(postId: $postId, input: $input) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const POST_ADD_FOLLOW = gql`
  mutation AddFollow($followingId: ID!) {
    addFollow(followingId: $followingId) {
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;
