import { comment } from "postcss";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

let commentsData = [
  {
    name: "Rahul",
    text: "This is the first comment",
    replies: [],
  },

  {
    name: "Anjali",
    text: "This is a parent comment",
    replies: [
      {
        name: "Kiran",
        text: "First reply to parent comment",
        replies: [
          {
            name: "Sneha",
            text: "Reply to Kiran's comment",
            replies: [
              {
                name: "Vamsi",
                text: "Deep nested reply level 4",
                replies: [],
              },
            ],
          },
        ],
      },

      {
        name: "Teja",
        text: "Second reply to parent comment",
        replies: [
          {
            name: "Divya",
            text: "Reply to Teja's comment",
            replies: [
              {
                name: "Arun",
                text: "Another 4th level nested reply",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    name: "Pooja",
    text: "Another top-level comment",
    replies: [],
  },

  {
    name: "Sai",
    text: "Top-level comment with nested replies",
    replies: [
      {
        name: "Nikhil",
        text: "Reply level 1",
        replies: [
          {
            name: "Harsha",
            text: "Reply level 2",
            replies: [
              {
                name: "Keerthi",
                text: "Reply level 3",
                replies: [
                  {
                    name: "Manoj",
                    text: "Reply level 4",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
const Comment = ({ data }) => {
  const { name, text, replies } = data;

  return (
    <div className="flex shadow-sm bg-gray-200 rounded-lg p-2 items-center m-1">
      <div>
        <FaUserCircle className="w-12 h-10" />
      </div>
      <div className="p-1">
        <p className="font-bold">{name}</p>
        <p className="">{text}</p>
      </div>
    </div>
  );
};
const CommentList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="pl-5 border border-l-black ml-5 border-r-white border-t-white border-b-white">
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ));
};
const CommentsContainer = () => {
  return (
    <div className="ml-6">
      <h1 className="text-2xl font-bold"> Comments</h1>
      <CommentList comments={commentsData} />
    </div>
  );
};
export default CommentsContainer;
