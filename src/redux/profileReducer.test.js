import profileReducer, { actions } from "./profileReducer";

let state = {
  postData: [
    { id: 1, message: "It is my post number 1", likesCount: 10 },
    { id: 2, message: "It is my post number 2", likesCount: 5 },
    { id: 3, message: "It is my post number 3", likesCount: 100 },
    { id: 4, message: "It is my post number 4", likesCount: 7 },
    { id: 5, message: "It is my post number 5", likesCount: 9 },
    { id: 6, message: "It is my post number 6", likesCount: 14 },
  ],
};

it("length of post should be incremented", () => {
  // 1. test data
  let action = actions.addPostActionCreator("Bla-bla");

  // 2. action

  let newState = profileReducer(state, action);

  // 3.expectation
  expect(newState.postData.length).toBe(7);
});

it("messge of new post should be correct", () => {
  // 1. test data
  let action = actions.addPostActionCreator("Bla-bla");
  // 2. action

  let newState = profileReducer(state, action);

  // 3.expectation
  expect(newState.postData[6].message).toBe("Bla-bla");
});

it("after deleting message should be decrement", () => {
  // 1. test data
  let action = actions.deletePost(1);
  // 2. action

  let newState = profileReducer(state, action);

  // 3.expectation
  expect(newState.postData.length).toBe(5);
});
